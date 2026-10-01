# TasteBridge AI 🌉

### Find what everyone will actually enjoy.

TasteBridge AI is an agentic group recommendation platform powered by Qloo's cultural intelligence.

Instead of giving generic recommendations, TasteBridge AI helps groups discover experiences that match their shared tastes across food, music, film, culture, travel, and lifestyle.

Built for the **Qloo Agentic Hackathon 2026**.

---

## 🎯 The Problem

Planning an activity with a group is surprisingly difficult.

One person may love live music and Italian food, another may prefer anime and Korean cuisine, while someone else may enjoy museums, Bollywood, or vegetarian dining.

Traditional recommendation systems usually optimise for one person or provide generic "popular" suggestions.

Groups need something different:

**A way to find the cultural common ground between everyone.**

---

## 💡 The Solution

TasteBridge AI acts as a culturally intelligent planning agent.

Each participant provides a few interests such as:

- Favourite music or artists
- Movies and TV
- Food and cuisines
- Cultural interests
- Travel preferences
- Lifestyle interests

TasteBridge AI uses Qloo's cultural intelligence to discover relationships between these interests and identify recommendations that have strong affinity across the group.

The agent then creates a personalised group experience and explains why each recommendation fits the group's combined tastes.

---

## ✨ Example

Imagine four friends planning a Saturday in London.

### Person A
Coldplay • Italian food • Museums

### Person B
Taylor Swift • Korean food • Anime

### Person C
Marvel • Burgers • Live music

### Person D
Bollywood • Vegetarian food • Historical places

TasteBridge AI analyses their cultural signals and searches for meaningful common ground.

Instead of simply recommending the most popular places, it can generate a group plan containing:

🍽️ Dining  
🎵 Music & entertainment  
🎭 Cultural experiences  
☕ Cafés and social stops  
📍 Places to explore

Each recommendation includes a **"Why this matches your group"** explanation.

---

## 🧠 Why Qloo?

Generic LLMs can generate recommendations, but they do not inherently have access to structured cultural affinity data.

TasteBridge AI uses the **Qloo Taste Graph** to ground recommendations in cultural relationships across domains such as:

- Music
- Film & TV
- Dining
- Fashion
- Travel
- Brands
- Places
- Cultural interests

Qloo is not an optional add-on to TasteBridge AI.

It is the cultural intelligence layer that allows the agent to move from:

> "Here are some popular things to do."

to:

> "Here are experiences that connect the different tastes within your group."

---

## 🤖 Agent Workflow

TasteBridge AI follows a multi-step agentic workflow.

### 1. Understand
Interpret the group's request, destination, preferences, and constraints.

### 2. Resolve
Map user-provided interests to relevant Qloo entities and tags.

### 3. Compare
Analyse cultural affinities across the group's interests.

### 4. Discover
Use Qloo-powered discovery to find relevant experiences and categories.

### 5. Rank
Evaluate candidate recommendations based on their relevance to the group's combined taste signals.

### 6. Plan
Create a coherent group itinerary rather than returning disconnected recommendations.

### 7. Explain
Show why each recommendation fits the group's shared cultural profile.

---

## 🚀 Planned Features

- Multi-person taste input
- Cross-domain cultural discovery
- Group taste matching
- Qloo-powered recommendations
- Recommendation ranking
- "Why this matches your group" explanations
- Location-aware experience planning
- Dietary and practical constraints
- Personalised day itineraries
- Responsive web interface

---

## 🏗️ Architecture

```text
Users
  │
  ▼
TasteBridge Web Interface
  │
  ▼
TasteBridge Agent
  │
  ├── Understand group request
  ├── Resolve interests
  ├── Compare taste signals
  ├── Discover candidates
  ├── Rank recommendations
  └── Build itinerary
  │
  ▼
Secure Server-Side Qloo Integration
  │
  ▼
Qloo API / Taste Graph
  │
  ▼
Culturally Grounded Recommendations
