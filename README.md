# 🌍 TasteBridge AI

### Cultural Intelligence for Better Group Decisions

TasteBridge AI is an AI-powered group recommendation experience designed to help people with different tastes find experiences they can enjoy together.

Instead of asking:

> "Where should we go?"

TasteBridge asks:

> "What would work for all of us?"

The project is being developed for the **Qloo Hackathon** and is designed around Qloo's cultural intelligence capabilities.

---

## 💡 The Problem

Choosing something as a group is surprisingly difficult.

One person may love:

- Italian food
- Jazz
- Museums

while another prefers:

- Japanese food
- Indie films
- Modern art

Traditional recommendation systems usually optimise for one person's preferences or a single category.

TasteBridge AI approaches the problem differently.

It looks for the **cultural bridge between different preferences** and turns them into a shared recommendation.

---

## ✨ The Solution

Users describe the interests of the people in their group and select what they are planning.

TasteBridge then uses those preferences to create a culturally relevant shared direction.

Example:

**Person 1**

Italian food, jazz and museums.

**Person 2**

Japanese food, indie films and modern art.

**Planning**

Weekend Outing

TasteBridge can identify overlapping cultural signals and recommend experiences that have a better chance of appealing to the whole group.

---

## 🚀 Use Cases

TasteBridge can support decisions for:

- 💕 Date nights
- 👨‍👩‍👧 Family outings
- 🧑‍🤝‍🧑 Friend groups
- ✈️ Travel planning
- 🍽️ Restaurant discovery
- 🎵 Music and entertainment
- 🎨 Arts and cultural experiences
- 🏢 Team outings

---

## 🧠 How TasteBridge Works

### 1. Understand the Group

Users describe each person's interests in natural language.

Example:

```text
Person 1 loves Italian food, jazz and museums.
Person 2 loves Japanese food, indie films and modern art.
```

### 2. Understand the Occasion

The user selects what they are planning, such as:

```text
Weekend Outing
Date Night
Family Day
Travel
Food & Drinks
Entertainment
```

### 3. Discover Cultural Connections

TasteBridge is designed to use **Qloo cultural intelligence** to explore relationships between interests across categories.

### 4. Build a Shared Recommendation

The application converts those signals into a recommendation designed around the group's combined tastes rather than one person's preferences.

---

## 🏗️ Architecture

```text
Users
  │
  ▼
TasteBridge AI Interface
  │
  ▼
Next.js Application
  │
  ▼
Preference + Occasion Processing
  │
  ▼
Qloo Cultural Intelligence
  │
  ▼
Cross-Domain Taste Signals
  │
  ▼
Shared Group Recommendation
```

---

## 🛠️ Technology Stack

**Frontend**

- Next.js
- React
- TypeScript
- Tailwind CSS

**Cultural Intelligence**

- Qloo API / Qloo Hackathon environment

**Development**

- Node.js
- npm
- Git
- GitHub
- Visual Studio Code

---

## 🔌 Qloo Integration

TasteBridge is designed around Qloo's cultural intelligence layer.

Qloo can help identify relationships between cultural preferences across areas such as food, music, entertainment, travel and other lifestyle interests.

The application is currently able to run in a demo/learning mode while Qloo API credentials are unavailable.

Once API access is available, the live Qloo integration can replace the demo recommendation layer without changing the core user experience.

> **Security:** API credentials must never be committed to this repository. Local credentials should be stored using environment variables such as `.env.local`.

---

## 🖥️ Current Prototype

The current prototype includes:

- Group preference input
- Occasion selection
- TasteBridge recommendation interface
- Responsive dark UI
- Demo recommendation flow
- Qloo-focused architecture
- Support for future live API integration

---

## ⚙️ Run Locally

Clone the repository:

```bash
git clone https://github.com/meenakshikandwal194-del/tastebridge-ai.git
```

Enter the project:

```bash
cd tastebridge-ai/app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

When Qloo API access is available, create:

```text
app/.env.local
```

Environment variables should be stored locally and must not be committed to GitHub.

Example structure:

```text
QLOO_API_KEY=your_api_key_here
QLOO_BASE_URL=your_qloo_api_base_url
```

---

## 🗺️ Roadmap

Planned improvements include:

- Live Qloo API integration
- More detailed group preference modelling
- Cross-category recommendations
- Location-aware discovery
- Restaurant and entertainment recommendations
- Travel recommendations
- Recommendation explanations
- Group preference comparison
- Improved result cards
- Production deployment

---

## 🌟 Vision

Most recommendation systems ask:

**"What do you like?"**

TasteBridge asks:

**"What could we all like together?"**

The goal is to make group decision-making easier by using cultural intelligence to discover connections between people whose tastes may initially appear very different.

---

## 👩‍💻 Creator

**Meenakshi**

Built as a hackathon project exploring how cultural intelligence can improve group recommendations.

---

## 📄 License

This project is licensed under the terms included in the repository's `LICENSE` file.