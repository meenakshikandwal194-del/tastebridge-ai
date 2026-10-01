"use client";

import { useState } from "react";

type Recommendation = {
  title: string;
  summary: string;
  person1Match: string;
  person2Match: string;
  bridge: string;
};

export default function Home() {
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [location, setLocation] = useState("");
  const [plan, setPlan] = useState("Weekend Outing");

  const [recommendation, setRecommendation] =
    useState<Recommendation | null>(null);

  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findTasteBridge = async () => {
    if (!person1.trim() || !person2.trim()) {
      setError("Please enter tastes for both people.");
      setRecommendation(null);
      return;
    }

    setLoading(true);
    setError("");
    setRecommendation(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person1,
          person2,
          location,
          plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create a recommendation.");
      }

      if (!data.recommendation) {
        throw new Error(
          data.message || "Recommendation is not available right now."
        );
      }

      setMode(data.mode || "");
      setRecommendation(data.recommendation);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <header className="mb-20 flex items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl font-bold">
              TasteBridge <span className="text-purple-400">AI</span>
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Cultural intelligence for better group decisions
            </p>
          </div>

          <div className="shrink-0 rounded-full border border-purple-500/40 px-4 py-2 text-sm text-purple-300">
            Powered by Qloo
          </div>
        </header>

        {/* Hero */}
        <section className="text-center">
          <div className="mb-7 inline-block rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            ✨ Find the cultural bridge between different tastes
          </div>

          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Different tastes.
            <br />
            <span className="text-blue-400">One shared experience.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            Tell TasteBridge what each person enjoys. We&apos;ll find the
            cultural connection that can bring everyone together.
          </p>
        </section>

        {/* Form */}
        <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold">
              Build your group&apos;s TasteBridge
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Add each person&apos;s interests separately so TasteBridge can
              understand both sides of the group.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Person 1 */}
            <div>
              <label className="mb-3 block font-semibold">
                👤 Person 1 likes
              </label>

              <textarea
                value={person1}
                onChange={(e) => setPerson1(e.target.value)}
                placeholder="Example: Italian food, jazz, museums, historic places..."
                className="h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-purple-500"
              />
            </div>

            {/* Person 2 */}
            <div>
              <label className="mb-3 block font-semibold">
                👤 Person 2 likes
              </label>

              <textarea
                value={person2}
                onChange={(e) => setPerson2(e.target.value)}
                placeholder="Example: Japanese food, indie films, modern art..."
                className="h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mt-7">
            <label className="mb-3 block font-semibold">
              📍 Where are you looking?
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: London, Manchester, Birmingham..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-purple-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional for now. Location-aware recommendations will be enhanced
              when live cultural intelligence is connected.
            </p>
          </div>

          {/* Plan */}
          <div className="mt-7">
            <label className="mb-3 block font-semibold">
              🎯 What are you planning?
            </label>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-purple-500"
            >
              <option>Weekend Outing</option>
              <option>Restaurant</option>
              <option>Date Night</option>
              <option>Travel</option>
              <option>Entertainment</option>
              <option>Family Day</option>
              <option>Team Outing</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="button"
            onClick={findTasteBridge}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-purple-600 py-4 text-lg font-bold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Finding the cultural connection..."
              : "✨ Find Our TasteBridge"}
          </button>
        </section>

        {/* Result */}
        {recommendation && (
          <section className="mt-8 rounded-3xl border border-purple-500/30 bg-slate-900 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-purple-300">
                  TasteBridge Recommendation
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {recommendation.title} ✨
                </h3>
              </div>

              {mode === "demo" && (
                <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300">
                  Demo Mode
                </div>
              )}
            </div>

            {/* Main recommendation */}
            <div className="mt-7 rounded-2xl border border-slate-700 bg-slate-950 p-6">
              <p className="text-sm font-semibold text-blue-300">
                ⭐ Suggested direction
              </p>

              <p className="mt-3 text-lg leading-8 text-slate-200">
                {recommendation.summary}
              </p>
            </div>

            {/* Individual matches */}
            <div className="mt-6">
              <h4 className="text-lg font-bold">
                🧠 Why this could work for your group
              </h4>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm font-semibold text-purple-300">
                    👤 Person 1
                  </p>

                  <p className="mt-3 leading-7 text-slate-300">
                    {recommendation.person1Match}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm font-semibold text-blue-300">
                    👤 Person 2
                  </p>

                  <p className="mt-3 leading-7 text-slate-300">
                    {recommendation.person2Match}
                  </p>
                </div>
              </div>
            </div>

            {/* Bridge */}
            <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
              <p className="font-semibold text-purple-200">
                🔗 The Cultural Bridge
              </p>

              <p className="mt-2 leading-7 text-slate-300">
                {recommendation.bridge}
              </p>
            </div>

            {mode === "demo" && (
              <p className="mt-6 text-xs leading-5 text-slate-500">
                Demo mode • The recommendation currently comes from the
                TasteBridge server-side demo layer. Live Qloo cultural
                intelligence will replace this layer when API access is
                connected.
              </p>
            )}
          </section>
        )}

        {/* How it works */}
        <section className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
              From disagreement to discovery
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              How TasteBridge works
            </h3>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">👥</div>

              <h4 className="font-bold">1. Understand everyone</h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Capture each person&apos;s tastes separately instead of
                blending everyone into one generic profile.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">🧠</div>

              <h4 className="font-bold">2. Discover connections</h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Qloo cultural intelligence can reveal relationships across
                food, music, film, travel and other interests.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">✨</div>

              <h4 className="font-bold">3. Bridge the tastes</h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Turn those connections into an experience designed to make
                sense for the whole group.
              </p>
            </div>
          </div>
        </section>

        {/* Backend status */}
        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">
          <p className="text-sm text-slate-400">
            🔐 Recommendations are processed through a server-side API route.
            Qloo credentials will remain protected from the browser.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-800 py-10 text-center">
          <p className="font-semibold">
            TasteBridge <span className="text-purple-400">AI</span>
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Cultural intelligence for better group decisions
          </p>
        </footer>
      </div>
    </main>
  );
}