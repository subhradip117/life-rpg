"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Flame,
  Shield,
  Target,
  Zap,
  Sparkles,
} from "lucide-react";

const attributes = [
  {
    name: "INTELLECT",
    value: 82,
    icon: Brain,
    description: "Learning & problem solving",
  },
  {
    name: "STRENGTH",
    value: 68,
    icon: Zap,
    description: "Physical effort & training",
  },
  {
    name: "DISCIPLINE",
    value: 91,
    icon: Target,
    description: "Consistency & routines",
  },
  {
    name: "STAMINA",
    value: 76,
    icon: Flame,
    description: "Endurance & persistence",
  },
];

const traits = [
  {
    icon: "🧠",
    name: "CURIOUS",
    description: "You frequently learn and explore new ideas.",
    source: "INTELLECT",
  },
  {
    icon: "🎯",
    name: "CONSISTENT",
    description: "You maintain your habits over time.",
    source: "DISCIPLINE",
  },
  {
    icon: "🔥",
    name: "FOCUSED",
    description: "You regularly complete your active quests.",
    source: "QUEST COMPLETION",
  },
];

export default function CharacterPage() {
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

          <div className="mono text-[10px] text-[#6B7280]">
            CHARACTER_SYSTEM :: ONLINE
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* TOP */}
        <div className="mb-8">

          <Link
            href="/dashboard"
            className="mono mb-4 flex items-center gap-2 text-[10px] text-[#6B7280] hover:text-[#00E5FF]"
          >
            <ArrowLeft size={13} />
            DASHBOARD
          </Link>

          <p className="mono text-[10px] tracking-widest text-[#00E5FF]">
            [ CHARACTER_PROFILE ]
          </p>

          <h1 className="display-font mt-2 text-3xl font-bold sm:text-4xl">
            YOUR <span className="gradient-text">CHARACTER.</span>
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            Your actions are shaping who you become.
          </p>

        </div>

        {/* CHARACTER OVERVIEW */}
        <section className="grid gap-5 lg:grid-cols-3">

          {/* CORE */}
          <div className="hud-panel hud-brackets clip-corner flex flex-col items-center justify-center p-8 lg:col-span-1">

            <div className="relative flex h-44 w-44 items-center justify-center">

              <div className="absolute inset-0 rounded-full border border-[#00E5FF]/30" />

              <div className="absolute inset-4 rounded-full border border-[#8B7CFF]/25" />

              <div className="absolute inset-9 rounded-full border border-[#00E5FF]/20" />

              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#00E5FF]/50 bg-[#11151C] shadow-[0_0_45px_rgba(0,229,255,0.12)]">
                <Zap
                  size={38}
                  className="text-[#00E5FF]"
                />
              </div>

            </div>

            <p className="mono mt-5 text-[10px] tracking-widest text-[#00E5FF]">
              PLAYER_CORE
            </p>

            <p className="mono mt-2 text-3xl font-bold">
              LVL 01
            </p>

            <p className="mt-1 text-xs text-[#6B7280]">
              ROOKIE
            </p>

          </div>

          {/* CHARACTER SUMMARY */}
          <div className="hud-panel clip-corner p-7 lg:col-span-2">

            <div className="flex items-center gap-3">
              <Shield
                size={20}
                className="text-[#8B7CFF]"
              />

              <div>
                <p className="mono text-[10px] text-[#6B7280]">
                  BEHAVIOR_ANALYSIS
                </p>

                <h2 className="display-font text-xl font-bold">
                  WHO YOU ARE BECOMING
                </h2>
              </div>
            </div>

            <div className="mt-7 border border-[#00E5FF]/10 bg-[#00E5FF]/[0.03] p-6">

              <p className="text-lg leading-7 text-[#F3F4F6]">
                You&apos;ve spent most of your time{" "}
                <span className="text-[#00E5FF]">
                  learning
                </span>{" "}
                and building a{" "}
                <span className="text-[#8B7CFF]">
                  consistent routine.
                </span>
              </p>

              <p className="mt-4 text-xs leading-6 text-[#6B7280]">
                Your character profile is generated from the actions
                you complete in real life. Keep completing quests to
                evolve your attributes and unlock new traits.
              </p>

            </div>

            {/* XP */}
            <div className="mt-6">

              <div className="mb-2 flex justify-between">
                <span className="mono text-[9px] text-[#6B7280]">
                  NEXT LEVEL
                </span>

                <span className="mono text-[9px] text-[#9CA3AF]">
                  120 / 500 XP
                </span>
              </div>

              <div className="h-2 bg-[#181D26]">
                <div className="h-full w-[24%] bg-gradient-to-r from-[#00E5FF] to-[#8B7CFF]" />
              </div>

            </div>

          </div>

        </section>

        {/* ATTRIBUTES */}
        <section className="mt-8">

          <div className="mb-5">
            <p className="mono text-[10px] tracking-widest text-[#6B7280]">
              ATTRIBUTE_MATRIX
            </p>

            <h2 className="display-font mt-1 text-xl font-bold">
              YOUR ATTRIBUTES
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {attributes.map((attribute) => {
              const Icon = attribute.icon;

              return (
                <div
                  key={attribute.name}
                  className="border border-white/[0.06] bg-[#11151C] p-6 transition hover:border-[#00E5FF]/30"
                >

                  <Icon
                    size={22}
                    className="text-[#00E5FF]"
                  />

                  <p className="mono mt-5 text-[9px] text-[#6B7280]">
                    {attribute.name}
                  </p>

                  <div className="mt-1 flex items-end justify-between">
                    <span className="mono text-3xl font-bold">
                      {attribute.value}
                    </span>

                    <span className="mono text-[9px] text-[#6B7280]">
                      / 100
                    </span>
                  </div>

                  <div className="mt-4 h-1 bg-[#181D26]">
                    <div
                      className="h-full bg-[#00E5FF]"
                      style={{
                        width: `${attribute.value}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-[10px] text-[#6B7280]">
                    {attribute.description}
                  </p>

                </div>
              );
            })}

          </div>

        </section>

        {/* TRAITS */}
        <section className="mt-8">

          <div className="mb-5 flex items-end justify-between">

            <div>
              <p className="mono text-[10px] tracking-widest text-[#6B7280]">
                BEHAVIOR_ENGINE
              </p>

              <h2 className="display-font mt-1 text-xl font-bold">
                UNLOCKED TRAITS
              </h2>
            </div>

            <Sparkles
              size={20}
              className="text-[#F5C451]"
            />

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {traits.map((trait) => (
              <div
                key={trait.name}
                className="border border-white/[0.06] bg-[#11151C] p-6 transition hover:border-[#8B7CFF]/40"
              >

                <div className="text-3xl">
                  {trait.icon}
                </div>

                <p className="display-font mt-5 text-lg font-bold">
                  {trait.name}
                </p>

                <p className="mt-2 text-xs leading-5 text-[#6B7280]">
                  {trait.description}
                </p>

                <div className="mono mt-5 border-t border-white/[0.06] pt-4 text-[9px] text-[#8B7CFF]">
                  UNLOCKED_BY :: {trait.source}
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* HOW TRAITS WORK */}
        <section className="hud-panel clip-corner mt-8 p-6 sm:p-8">

          <p className="mono text-[10px] tracking-widest text-[#00E5FF]">
            SYSTEM_LOGIC
          </p>

          <h2 className="display-font mt-2 text-xl font-bold">
            YOUR BEHAVIOR BUILDS YOUR CHARACTER
          </h2>

          <div className="mt-6 grid gap-3 md:grid-cols-3">

            <Rule
              action="STUDY"
              result="INTELLECT ↑"
            />

            <Rule
              action="TRAIN"
              result="STRENGTH ↑"
            />

            <Rule
              action="MAINTAIN HABITS"
              result="DISCIPLINE ↑"
            />

          </div>

        </section>

      </div>

    </main>
  );
}


/* RULE */

function Rule({
  action,
  result,
}: {
  action: string;
  result: string;
}) {
  return (
    <div className="flex items-center justify-between border border-white/[0.06] bg-[#11151C] p-4">

      <span className="mono text-[10px] text-[#9CA3AF]">
        {action}
      </span>

      <ArrowRight
        size={14}
        className="text-[#6B7280]"
      />

      <span className="mono text-[10px] text-[#00E5FF]">
        {result}
      </span>

    </div>
  );
}