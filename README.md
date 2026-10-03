# 🌍 TasteBridge AI

### Cultural Intelligence for Better Group Decisions

**TasteBridge AI** helps two people with different tastes discover a shared cultural experience they may both enjoy.

Instead of asking:

> "What does one person like?"

TasteBridge asks:

> **"What could we both enjoy together?"**

Built for the **Qloo Hackathon**, TasteBridge uses live Qloo cultural intelligence to translate different interests into shared taste signals and generate a recommendation.

---

## 🚀 Live Demo

**Production App:**  
https://tastebridge-ai.vercel.app

**GitHub Repository:**  
https://github.com/meenakshikandwal194-del/tastebridge-ai

---

## 💡 The Problem

Group decisions can be surprisingly difficult.

One person might enjoy:

- Italian food
- Jazz
- Museums

while another prefers:

- Japanese food
- Indie films
- Modern art

Traditional recommendation experiences often start from one person's preferences or focus on a single category.

TasteBridge takes a different approach: it looks for a **cultural bridge between different tastes** and uses those combined signals to suggest something the group can explore together.

---

## ✨ The Solution

Users provide:

1. Person 1's interests
2. Person 2's interests
3. An optional location as planning context
4. What they are planning

For example:

```text
Person 1:
Jazz

Person 2:
Indie Film Screenings

Location:
Manchester

Plan:
Travel
```

TasteBridge resolves the interests into Qloo cultural tags, combines those taste signals, and queries Qloo for a shared recommendation.

A live test can, for example, return a destination such as **Shanghai** with a Qloo taste-affinity signal.

The location field currently provides **planning context**. Recommendations are not yet geographically restricted to the entered location.

---

## 🧠 How TasteBridge Works

### 1. Collect Interests

Each person enters interests in natural language.

Examples:

```text
Jazz, Italian Food, Museums
```

and:

```text
Indie Film Screenings, Modern Art, Japanese Food
```

### 2. Resolve Interests with Qloo

The server searches Qloo's tag system for each entered interest.

TasteBridge uses Qloo's tag endpoint to translate human-readable interests into Qloo cultural tag identifiers.

Conceptually:

```text
"Jazz"
   ↓
Qloo tag lookup
   ↓
Qloo cultural tag ID
```

### 3. Combine Taste Signals

Tags resolved for both people are combined into a shared set of cultural signals.

```text
Person 1 interests ──┐
                     ├──> Combined taste signals
Person 2 interests ──┘
```

### 4. Query Qloo Insights

TasteBridge sends the combined tag signals to Qloo's Insights API.

The requested Qloo entity type changes according to the selected planning context. This allows TasteBridge to explore different kinds of cultural recommendations.

### 5. Build the TasteBridge

The returned Qloo entities are processed and the strongest available recommendation is presented to the users along with its affinity signal when available.

The interface also explains how the two people's preferences contributed to the result.

---

## 🔌 Live Qloo Integration

TasteBridge uses the **Qloo Hackathon API environment**.

The current integration uses:

```text
GET /v2/tags
```

to resolve user-entered interests into Qloo cultural tags, followed by:

```text
GET /v2/insights
```

to discover recommendations from the combined taste signals.

Simplified flow:

```text
User Interests
      │
      ▼
TasteBridge Next.js UI
      │
      ▼
POST /api/recommend
      │
      ▼
Qloo /v2/tags
      │
      ▼
Resolved Cultural Tags
      │
      ▼
Combined Taste Signals
      │
      ▼
Qloo /v2/insights
      │
      ▼
Affinity-Based Cultural Result
      │
      ▼
TasteBridge Recommendation
```

This is a **live Qloo integration**, not a static or hard-coded recommendation demo.

---

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│            Users             │
│                              │
│ Person 1 tastes              │
│ Person 2 tastes              │
│ Location context             │
│ Planning type                │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Next.js / React UI      │
└──────────────┬───────────────┘
               │
               │ POST /api/recommend
               ▼
┌──────────────────────────────┐
│   TasteBridge Server Route   │
│                              │
│ • Parse interests            │
│ • Resolve tags               │
│ • Combine signals            │
│ • Select target entity type  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          Qloo API            │
│                              │
│ /v2/tags                     │
│       ↓                      │
│ /v2/insights                 │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Shared Cultural Match        │
│ + Taste Affinity             │
│ + Cultural Bridge            │
└──────────────────────────────┘
```

---

## 🎯 Planning Modes

The interface supports several types of group decisions, including:

- 💕 Date Night
- 👨‍👩‍👧 Family activities
- 🧑‍🤝‍🧑 Group outings
- ✈️ Travel
- 🍽️ Food-related experiences
- 🎵 Entertainment
- 🎨 Cultural experiences
- 🏢 Team activities

Different planning modes can guide TasteBridge toward different Qloo entity types.

---

## 🖥️ Current Features

TasteBridge currently includes:

- ✅ Live Qloo API integration
- ✅ Two-person preference input
- ✅ Natural-language interest entry
- ✅ Qloo cultural tag resolution
- ✅ Combined group taste signals
- ✅ Qloo Insights recommendations
- ✅ Affinity-based result selection
- ✅ Multiple planning contexts
- ✅ Optional location planning context
- ✅ Explanation of each person's matched interests
- ✅ Cultural Bridge explanation
- ✅ Server-side API credential handling
- ✅ Responsive dark interface
- ✅ Production deployment on Vercel
- ✅ GitHub-based deployment workflow

---

## 🛠️ Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handler
- TypeScript
- Server-side Qloo API requests

### Cultural Intelligence

- Qloo API
- Qloo Tags
- Qloo Insights API
- Qloo affinity signals

### Development & Deployment

- Node.js
- npm
- Git
- GitHub
- Visual Studio Code
- Vercel

---

## 🔐 Security

The Qloo API key is never exposed in the browser.

Qloo requests are made from the server-side Next.js API route:

```text
/api/recommend
```

Credentials are supplied through environment variables.

The API key must **never be committed to GitHub**.

The local `.env.local` file is excluded from source control.

---

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/meenakshikandwal194-del/tastebridge-ai.git
```

### 2. Enter the Next.js application

```bash
cd tastebridge-ai/app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

inside the `app` directory.

Add:

```text
QLOO_API_KEY=your_qloo_api_key
QLOO_BASE_URL=https://hackathon.api.qloo.com
```

Do not commit the real API key.

### 5. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## ☁️ Production Deployment

TasteBridge is deployed on **Vercel**.

Production:

```text
https://tastebridge-ai.vercel.app
```

The production deployment uses server-side Vercel environment variables for:

```text
QLOO_API_KEY
QLOO_BASE_URL
```

The GitHub `main` branch is connected to the Vercel project, allowing new commits to trigger production deployments.

---

## 📍 Location Behaviour

Location is currently treated as **planning context** rather than a strict geographic filter.

For example, if a user enters:

```text
Manchester
```

TasteBridge may still return a culturally relevant destination or experience outside Manchester.

The interface explicitly communicates this behaviour so that the recommendation is not presented as a local-search result.

---

## 🧪 Example

Input:

```text
Person 1:
Jazz

Person 2:
Indie Film Screenings

Location:
Manchester

Planning:
Travel
```

TasteBridge:

```text
Jazz
        ┐
        ├──> Qloo cultural tags
Indie   ┘
Film
        ↓
Combined taste signals
        ↓
Qloo Insights
        ↓
Shared cultural recommendation
```

The production application displays the resulting cultural match together with the Qloo affinity signal when available.

Because Qloo data is queried live, results may vary.

---

## 🗺️ Future Improvements

Potential next steps include:

- Location-aware Qloo discovery
- Interest autocomplete and suggestions
- Location autocomplete
- Support for larger groups
- Richer recommendation explanations
- Multiple recommendation options
- Saved group taste profiles
- More cross-category exploration
- Improved error and empty-result handling
- Recommendation images and richer result cards

---

## 🌟 Vision

Most recommendation systems ask:

> **"What do you like?"**

TasteBridge asks:

> **"What could we all like together?"**

TasteBridge explores how cultural intelligence can make group decision-making easier by discovering connections between people whose tastes initially appear different.

---

## 👩‍💻 Creator

**Meenakshi**

Built for the **Qloo Hackathon** as an exploration of group recommendations powered by cultural intelligence.

---

## 📄 License

This project is licensed under the terms included in the repository's `LICENSE` file.