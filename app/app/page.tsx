"use client";

import { useState } from "react";

export default function Home() {
  const [preferences, setPreferences] = useState("");
  const [plan, setPlan] = useState("Weekend Outing");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const findTasteBridge = () => {
    if (!preferences.trim()) {
      setResult("Please tell us what your group likes first.");
      return;
    }

    setLoading(true);
    setResult("");

    // Demo recommendation while Qloo API access is not connected.
    setTimeout(() => {
      setResult(
        `For your ${plan}, TasteBridge found a shared direction based on: "${preferences}". Your group may enjoy an experience that combines food, entertainment, and shared cultural interests.`
      );

      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* Header */}
        <header className="mb-24 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              TasteBridge{" "}
              <span className="text-purple-400">AI</span>
            </h1>

            <p className="text-sm text-slate-400">
              Cultural intelligence for better group decisions
            </p>
          </div>

          <div className="rounded-full border border-purple-500/40 px-5 py-2 text-purple-300">
            Powered by Qloo
          </div>
        </header>

        {/* Hero */}
        <section className="text-center">
          <div className="mb-8 inline-block rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            ✨ An agent that understands everyone&apos;s taste
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Stop arguing about
            <br />

            <span className="text-blue-400">
              where to go next.
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-400">
            TasteBridge combines different tastes into culturally intelligent
            recommendations for restaurants, entertainment, travel and more.
          </p>
        </section>

        {/* Recommendation Form */}
        <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <label className="mb-3 block font-semibold">
            What does your group like?
          </label>

          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Example: One person loves jazz and Italian food, another loves indie films, Japanese food and art..."
            className="h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-purple-500"
          />

          <label className="mb-3 mt-7 block font-semibold">
            What are you planning?
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
          </select>

          <button
            type="button"
            onClick={findTasteBridge}
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-purple-600 py-4 text-lg font-bold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Finding your TasteBridge..."
              : "✨ Find Our TasteBridge"}
          </button>

          {/* Recommendation Result */}
          {result && (
            <div className="mt-6 rounded-xl border border-purple-500/30 bg-purple-500/10 p-5">

              <p className="mb-2 text-xs uppercase tracking-widest text-purple-300">
                TasteBridge Recommendation
              </p>

              <p className="leading-7 text-slate-200">
                {result}
              </p>

              <p className="mt-4 text-xs text-slate-500">
                Demo mode • Live Qloo cultural intelligence will be connected
                when API access is available.
              </p>

            </div>
          )}
        </section>

        {/* How it works */}
        <section className="mt-16">
          <h3 className="text-center text-2xl font-bold">
            How TasteBridge works
          </h3>

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">
                👥
              </div>

              <h4 className="font-bold">
                1. Share your tastes
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Tell TasteBridge what different people in your group enjoy.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">
                🧠
              </div>

              <h4 className="font-bold">
                2. Find connections
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                TasteBridge looks for cultural connections between different
                interests.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">
                ✨
              </div>

              <h4 className="font-bold">
                3. Get a shared idea
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Receive a recommendation designed around the whole group.
              </p>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-800 py-8 text-center">

          <p className="text-sm text-slate-400">
            TasteBridge AI
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Powered by Qloo cultural intelligence
          </p>

        </footer>

      </div>
    </main>
  );
}