"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Flame,
  Plus,
  Target,
  Zap,
  Coins,
  X,
} from "lucide-react";

type Quest = {
  id: number;
  title: string;
  description: string;
  category: string;
  xp: number;
  credits: number;
  completed: boolean;
};

const initialQuests: Quest[] = [
  {
    id: 1,
    title: "Study for 60 minutes",
    description: "Complete one focused study session.",
    category: "INTELLECT",
    xp: 50,
    credits: 20,
    completed: false,
  },
  {
    id: 2,
    title: "30 minute workout",
    description: "Complete a full workout session.",
    category: "STRENGTH",
    xp: 40,
    credits: 15,
    completed: false,
  },
  {
    id: 3,
    title: "Meditate for 10 minutes",
    description: "Take 10 minutes to reset your mind.",
    category: "DISCIPLINE",
    xp: 30,
    credits: 10,
    completed: false,
  },
];

export default function QuestsPage() {
  const [quests, setQuests] = useState(initialQuests);
  const [showForm, setShowForm] = useState(false);
  const [rewardQuest, setRewardQuest] = useState<Quest | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("INTELLECT");
  const [xp, setXp] = useState("50");

  function completeQuest(id: number) {
  const quest = quests.find((q) => q.id === id);

  if (!quest || quest.completed) return;

  setQuests((current) =>
    current.map((q) =>
      q.id === id
        ? { ...q, completed: true }
        : q
    )
  );

  setRewardQuest(quest);
}

  function createQuest(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    const newQuest: Quest = {
      id: Date.now(),
      title,
      description: description || "Custom real-life quest.",
      category,
      xp: Number(xp) || 10,
      credits: Math.floor((Number(xp) || 10) / 2),
      completed: false,
    };

    setQuests((current) => [...current, newQuest]);

    setTitle("");
    setDescription("");
    setCategory("INTELLECT");
    setXp("50");
    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-[#0A0C12] text-[#F3F4F6]">

      {/* HEADER */}
      <header className="border-b border-white/[0.06] bg-[#0A0C12]/95 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            href="/dashboard"
            className="display-font text-xl font-bold"
          >
            LIFE<span className="text-[#00E5FF]">//</span>RPG
          </Link>

          <div className="flex items-center gap-4">

            <div className="mono hidden text-[10px] text-[#6B7280] sm:block">
              QUEST_SYSTEM :: ONLINE
            </div>

            <div className="flex items-center gap-2 border border-white/[0.08] bg-[#11151C] px-3 py-2">
              <Coins size={14} className="text-[#F5C451]" />
              <span className="mono text-xs">250</span>
            </div>

          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* TOP */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <Link
              href="/dashboard"
              className="mono mb-4 flex items-center gap-2 text-[10px] text-[#6B7280] hover:text-[#00E5FF]"
            >
              <ArrowLeft size={13} />
              DASHBOARD
            </Link>

            <p className="mono text-[10px] tracking-widest text-[#00E5FF]">
              [ MISSION_CONTROL ]
            </p>

            <h1 className="display-font mt-2 text-3xl font-bold sm:text-4xl">
              YOUR <span className="gradient-text">QUESTS.</span>
            </h1>

            <p className="mt-2 text-sm text-[#6B7280]">
              Turn real-world actions into progression.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="clip-small gradient-primary flex items-center justify-center gap-2 px-5 py-3 font-semibold text-[#0A0C12] transition hover:brightness-110"
          >
            <Plus size={18} />
            CREATE QUEST
          </button>

        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <Stat
            label="ACTIVE"
            value={String(quests.filter((q) => !q.completed).length)}
          />

          <Stat
            label="COMPLETED"
            value={String(quests.filter((q) => q.completed).length)}
          />

          <Stat
            label="AVAILABLE XP"
            value={String(
              quests
                .filter((q) => !q.completed)
                .reduce((sum, q) => sum + q.xp, 0)
            )}
          />

          <Stat
            label="STREAK"
            value="07"
          />

        </div>

        {/* QUEST LIST */}
        <section className="hud-panel hud-brackets clip-corner p-6 sm:p-8">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <p className="mono text-[10px] tracking-widest text-[#6B7280]">
                ACTIVE_MISSIONS
              </p>

              <h2 className="display-font mt-1 text-xl font-bold">
                TODAY'S QUESTS
              </h2>
            </div>

            <div className="mono text-[10px] text-[#6B7280]">
              {quests.length} MISSIONS
            </div>

          </div>

          <div className="space-y-3">

            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onComplete={() => completeQuest(quest.id)}
              />
            ))}

          </div>

          {quests.length === 0 && (
            <div className="py-16 text-center">

              <Target
                size={30}
                className="mx-auto mb-4 text-[#6B7280]"
              />

              <p className="text-sm text-[#9CA3AF]">
                No quests available.
              </p>

            </div>
          )}

        </section>

      </div>

      {/* CREATE QUEST MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">

          <div className="hud-panel hud-brackets clip-corner w-full max-w-lg p-6 sm:p-8">

            <div className="mb-7 flex items-start justify-between">

              <div>
                <p className="mono text-[10px] tracking-widest text-[#00E5FF]">
                  NEW_MISSION
                </p>

                <h2 className="display-font mt-2 text-2xl font-bold">
                  CREATE QUEST
                </h2>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-[#6B7280] transition hover:text-[#F3F4F6]"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={createQuest} className="space-y-5">

              <div>
                <label className="mono mb-2 block text-[10px] text-[#6B7280]">
                  QUEST_TITLE
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Read 20 pages"
                  className="cyber-input"
                  required
                />
              </div>

              <div>
                <label className="mono mb-2 block text-[10px] text-[#6B7280]">
                  DESCRIPTION
                </label>

                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the real-life task"
                  className="cyber-input"
                />
              </div>

              <div>
                <label className="mono mb-2 block text-[10px] text-[#6B7280]">
                  ATTRIBUTE
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="cyber-input"
                >
                  <option value="INTELLECT">INTELLECT</option>
                  <option value="STRENGTH">STRENGTH</option>
                  <option value="DISCIPLINE">DISCIPLINE</option>
                  <option value="STAMINA">STAMINA</option>
                </select>
              </div>

              <div>
                <label className="mono mb-2 block text-[10px] text-[#6B7280]">
                  XP_REWARD
                </label>

                <input
                  type="number"
                  min="10"
                  max="500"
                  value={xp}
                  onChange={(e) => setXp(e.target.value)}
                  className="cyber-input"
                />
              </div>

              <button
                type="submit"
                className="clip-small gradient-primary flex w-full items-center justify-center gap-2 px-5 py-3.5 font-semibold text-[#0A0C12] transition hover:brightness-110"
              >
                INITIALIZE QUEST
                <ArrowRight size={17} />
              </button>

            </form>

          </div>

        </div>
      )}
      <AnimatePresence>
  {rewardQuest && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-6"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="hud-panel hud-brackets clip-corner w-full max-w-md p-8 text-center"
      >

        {/* SUCCESS */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#4ADE80]/40 bg-[#4ADE80]/10"
        >
          <Check
            size={38}
            className="text-[#4ADE80]"
          />
        </motion.div>

        <p className="mono mt-6 text-[10px] tracking-[0.3em] text-[#4ADE80]">
          QUEST_COMPLETE
        </p>

        <h2 className="display-font mt-2 text-3xl font-bold">
          MISSION <span className="gradient-text">CLEARED.</span>
        </h2>

        <p className="mt-3 text-sm text-[#9CA3AF]">
          {rewardQuest.title}
        </p>

        {/* REWARDS */}
        <div className="mt-7 grid grid-cols-2 gap-3">

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="border border-[#F5C451]/20 bg-[#F5C451]/[0.04] p-5"
          >
            <p className="mono text-[9px] text-[#6B7280]">
              EXPERIENCE
            </p>

            <p className="mono mt-2 text-2xl font-bold text-[#F5C451]">
              +{rewardQuest.xp} XP
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="border border-[#00E5FF]/20 bg-[#00E5FF]/[0.04] p-5"
          >
            <p className="mono text-[9px] text-[#6B7280]">
              CREDITS
            </p>

            <p className="mono mt-2 text-2xl font-bold text-[#00E5FF]">
              +{rewardQuest.credits}
            </p>
          </motion.div>

        </div>

        {/* ATTRIBUTE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-3 border border-[#8B7CFF]/20 bg-[#8B7CFF]/[0.04] p-4"
        >
          <p className="mono text-[9px] text-[#6B7280]">
            ATTRIBUTE PROGRESS
          </p>

          <p className="mono mt-2 text-sm text-[#8B7CFF]">
            {rewardQuest.category} ↑
          </p>
        </motion.div>

        {/* CONTINUE */}
        <button
          onClick={() => setRewardQuest(null)}
          className="clip-small gradient-primary mt-7 flex w-full items-center justify-center gap-2 px-5 py-3.5 font-semibold text-[#0A0C12] transition hover:brightness-110"
        >
          CONTINUE
          <ArrowRight size={17} />
        </button>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </main>
  );
}


/* QUEST CARD */

function QuestCard({
  quest,
  onComplete,
}: {
  quest: Quest;
  onComplete: () => void;
}) {
  const icon =
    quest.category === "INTELLECT" ? (
      <Brain size={20} />
    ) : quest.category === "STRENGTH" ? (
      <Zap size={20} />
    ) : quest.category === "DISCIPLINE" ? (
      <Target size={20} />
    ) : (
      <Flame size={20} />
    );

  return (
    <div
      className={`border p-5 transition ${
        quest.completed
          ? "border-[#4ADE80]/20 bg-[#4ADE80]/[0.03] opacity-60"
          : "border-white/[0.06] bg-[#11151C] hover:border-[#00E5FF]/30"
      }`}
    >

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* ICON */}
        <div
          className={
            quest.completed
              ? "text-[#4ADE80]"
              : "text-[#00E5FF]"
          }
        >
          {quest.completed ? <Check size={20} /> : icon}
        </div>

        {/* DETAILS */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h3
              className={`font-medium ${
                quest.completed ? "line-through" : ""
              }`}
            >
              {quest.title}
            </h3>

            <span className="mono border border-white/[0.08] px-2 py-1 text-[8px] text-[#6B7280]">
              {quest.category}
            </span>

          </div>

          <p className="mt-1 text-xs text-[#6B7280]">
            {quest.description}
          </p>

        </div>

        {/* REWARD */}
        <div className="flex items-center gap-5 sm:ml-auto">

          <div className="text-right">
            <p className="mono text-[10px] text-[#F5C451]">
              +{quest.xp} XP
            </p>

            <p className="mono mt-1 text-[9px] text-[#6B7280]">
              +{quest.credits} CREDITS
            </p>
          </div>

          {/* COMPLETE */}
          <button
            onClick={onComplete}
            disabled={quest.completed}
            className={`flex h-9 w-9 items-center justify-center border transition ${
              quest.completed
                ? "border-[#4ADE80]/30 text-[#4ADE80]"
                : "border-white/[0.16] text-[#6B7280] hover:border-[#00E5FF] hover:text-[#00E5FF]"
            }`}
          >
            <Check size={17} />
          </button>

        </div>

      </div>

    </div>
  );
}


/* STAT */

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-white/[0.06] bg-[#11151C] p-4">

      <p className="mono text-[9px] text-[#6B7280]">
        {label}
      </p>

      <p className="mono mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}