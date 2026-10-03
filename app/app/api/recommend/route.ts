import { NextResponse } from "next/server";

const QLOO_BASE_URL =
  process.env.QLOO_BASE_URL || "https://hackathon.api.qloo.com";

type QlooTag = {
  id?: string;
  name?: string;
  type?: string;
};

type QlooEntity = {
  entity_id?: string;
  name?: string;
  query?: {
    affinity?: number;
  };
  properties?: Record<string, unknown>;
};

function splitInterests(value: string): string[] {
  return value
    .split(/[,;&]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function collectTags(value: unknown, output: QlooTag[] = []): QlooTag[] {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectTags(item, output);
    }

    return output;
  }

  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;

    if (
      typeof object.id === "string" &&
      object.id.startsWith("urn:tag:") &&
      typeof object.name === "string"
    ) {
      output.push({
        id: object.id,
        name: object.name,
        type: typeof object.type === "string" ? object.type : undefined,
      });
    }

    for (const child of Object.values(object)) {
      collectTags(child, output);
    }
  }

  return output;
}

function collectEntities(
  value: unknown,
  output: QlooEntity[] = []
): QlooEntity[] {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectEntities(item, output);
    }

    return output;
  }

  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;

    if (
      typeof object.entity_id === "string" &&
      typeof object.name === "string"
    ) {
      output.push(object as QlooEntity);
    }

    for (const child of Object.values(object)) {
      collectEntities(child, output);
    }
  }

  return output;
}

async function findTag(
  interest: string,
  apiKey: string
): Promise<QlooTag | null> {
  const url = new URL("/v2/tags", QLOO_BASE_URL);

  url.searchParams.set("filter.query", interest);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Qloo tag lookup failed for "${interest}":`,
      response.status,
      await response.text()
    );

    return null;
  }

  const data: unknown = await response.json();

  const tags = collectTags(data);

  if (tags.length === 0) {
    return null;
  }

  const normalizedInterest = interest.toLowerCase();

  const exactMatch = tags.find(
    (tag) => tag.name?.toLowerCase() === normalizedInterest
  );

  return exactMatch || tags[0];
}

async function findTagsForPerson(
  preferences: string,
  apiKey: string
): Promise<QlooTag[]> {
  const interests = splitInterests(preferences);

  const results = await Promise.all(
    interests.map((interest) => findTag(interest, apiKey))
  );

  const unique = new Map<string, QlooTag>();

  for (const tag of results) {
    if (tag?.id) {
      unique.set(tag.id, tag);
    }
  }

  return Array.from(unique.values());
}

function getTargetType(plan: string): string {
  switch (plan.toLowerCase()) {
    case "travel":
      return "urn:entity:destination";

    case "entertainment":
      return "urn:entity:artist";

    case "restaurant":
    case "date":
    case "family":
    case "team":
    case "weekend":
    default:
      return "urn:entity:place";
  }
}

async function getSharedInsights(
  tagIds: string[],
  targetType: string,
  apiKey: string
): Promise<QlooEntity[]> {
  const url = new URL("/v2/insights", QLOO_BASE_URL);

  url.searchParams.set("filter.type", targetType);

  // Qloo accepts valid tag URNs as interest signals.
  // Multiple shared taste signals are supplied together.
  url.searchParams.set("signal.interests.tags", tagIds.join(","));

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();

    console.error("Qloo Insights error:", response.status, message);

    throw new Error(`Qloo Insights returned ${response.status}.`);
  }

  const data: unknown = await response.json();

  return collectEntities(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const person1 =
      typeof body.person1 === "string" ? body.person1.trim() : "";

    const person2 =
      typeof body.person2 === "string" ? body.person2.trim() : "";

    const location =
      typeof body.location === "string" ? body.location.trim() : "";

    const plan =
      typeof body.plan === "string" && body.plan.trim()
        ? body.plan.trim()
        : "outing";

    if (!person1 || !person2) {
      return NextResponse.json(
        {
          error: "Please provide preferences for both people.",
        },
        { status: 400 }
      );
    }

    const qlooApiKey = process.env.QLOO_API_KEY;

    if (!qlooApiKey) {
      return NextResponse.json(
        {
          error: "Qloo API key is not configured on the server.",
        },
        { status: 500 }
      );
    }

    /*
      STEP 1:
      Convert each person's free-text interests into valid Qloo tags.
    */

    const [person1Tags, person2Tags] = await Promise.all([
      findTagsForPerson(person1, qlooApiKey),
      findTagsForPerson(person2, qlooApiKey),
    ]);

    if (person1Tags.length === 0 || person2Tags.length === 0) {
      return NextResponse.json(
        {
          error:
            "Qloo could not match enough of those interests. Try interests such as jazz, indie films, Italian food, museums or pop music.",
        },
        { status: 422 }
      );
    }

    /*
      STEP 2:
      Combine both people's taste signals.

      This is the TasteBridge:
      neither person's interests are discarded.
    */

    const combinedTagIds = Array.from(
      new Set([
        ...person1Tags
          .map((tag) => tag.id)
          .filter((id): id is string => Boolean(id)),
        ...person2Tags
          .map((tag) => tag.id)
          .filter((id): id is string => Boolean(id)),
      ])
    );

    const targetType = getTargetType(plan);

    /*
      STEP 3:
      Ask Qloo Insights for entities connected to the combined taste profile.
    */

    const entities = await getSharedInsights(
      combinedTagIds,
      targetType,
      qlooApiKey
    );

    if (entities.length === 0) {
      return NextResponse.json(
        {
          error:
            "Qloo found the interests but no shared recommendation for this plan. Try another plan or slightly broader interests.",
        },
        { status: 404 }
      );
    }

    /*
      Remove duplicate entities and use the highest-affinity result available.
    */

    const uniqueEntities = Array.from(
      new Map(
        entities
          .filter((entity) => entity.entity_id && entity.name)
          .map((entity) => [entity.entity_id as string, entity])
      ).values()
    );

    uniqueEntities.sort(
      (a, b) =>
        (b.query?.affinity ?? 0) -
        (a.query?.affinity ?? 0)
    );

    const best = uniqueEntities[0];

    if (!best?.name) {
      return NextResponse.json(
        {
          error:
            "Qloo returned data but no usable shared recommendation was found.",
        },
        { status: 404 }
      );
    }

    const person1MatchedNames = person1Tags
      .map((tag) => tag.name)
      .filter(Boolean)
      .join(", ");

    const person2MatchedNames = person2Tags
      .map((tag) => tag.name)
      .filter(Boolean)
      .join(", ");

    const affinity =
      typeof best.query?.affinity === "number"
        ? Math.round(best.query.affinity * 100)
        : null;

    const locationText = location
      ? `, with ${location} as your planning context`
      : "";

    return NextResponse.json({
      mode: "live",
      recommendation: {
        title: best.name,

        summary: `Qloo identified ${best.name} as a shared cultural match for your ${plan}${locationText}.${
          affinity !== null
            ? ` Taste affinity: ${affinity}%.`
            : ""
        }`,

        person1Match:
          person1MatchedNames || person1,

        person2Match:
          person2MatchedNames || person2,

        bridge:
          `TasteBridge resolved both people's interests into Qloo cultural tags and combined them as taste signals before requesting this recommendation from Qloo Insights.`,
      },

      qloo: {
        targetType,
        affinity,
        matchedPerson1Tags: person1Tags,
        matchedPerson2Tags: person2Tags,
      },
    });
  } catch (error) {
    console.error("TasteBridge recommendation error:", error);

    return NextResponse.json(
      {
        error:
          "Unable to create a Qloo recommendation right now. Please try again.",
      },
      { status: 500 }
    );
  }
}