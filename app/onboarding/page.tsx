"use client";

import { ArrowRight, Brain, Flame, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-12">

      {/* SYSTEM STATUS */}
      <div className="mono absolute left-6 top-6 flex items-center gap-2 text-xs text-[#00E5FF]">
        <span className="h-1.5 w-1.5 animate-pulse bg-[#00E5FF]" />
        [ SYSTEM :: CHARACTER_INIT ]
      </div>

      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <p className="mono mb-3 text-xs text-[#6B7280]">
            PLAYER INITIALIZATION // 01
          </p>

          <h1 className="display-font text-4xl font-bold sm:text-5xl">
            BUILD YOUR
            <br />
            <span className="gradient-text">CHARACTER.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#9CA3AF]">
            Your character grows from your real-world actions.
            Complete quests, build habits, and let your behavior shape your stats.
          </p>

        </div>

        {/* CHARACTER PANEL */}
        <div className="hud-panel hud-brackets clip-corner p-6 sm:p-8">

          {/* CORE */}
          <div className="mb-8 flex flex-col items-center">

            <div className="relative flex h-32 w-32 items-center justify-center">

              <div className="absolute inset-0 rounded-full border border-[#00E5FF]/30 animate-spin" />

              <div className="absolute inset-3 rounded-full border border-[#8B7CFF]/30" />

              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#00E5FF]/40 bg-[#11151C] shadow-[0_0_35px_rgba(0,229,255,0.12)]">
                <Zap size={30} className="text-[#00E5FF]" />
              </div>

            </div>

            <p className="mono mt-4 text-xs text-[#6B7280]">
              CORE_STATUS :: ONLINE
            </p>

          </div>

          {/* STARTING STATS */}
          <div className="mb-8">

            <div className="mono mb-4 text-[10px] tracking-widest text-[#6B7280]">
              INITIAL ATTRIBUTES
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              <StatCard
                icon={<Brain size={18} />}
                name="INTELLECT"
                value="01"
              />

              <StatCard
                icon={<Flame size={18} />}
                name="STAMINA"
                value="01"
              />

              <StatCard
                icon={<Target size={18} />}
                name="DISCIPLINE"
                value="01"
              />

              <StatCard
                icon={<Zap size={18} />}
                name="STRENGTH"
                value="01"
              />

            </div>

          </div>

          {/* TRAIT SYSTEM */}
          <div className="border-t border-white/[0.06] pt-6">

            <div className="mono mb-3 text-[10px] tracking-widest text-[#6B7280]">
              BEHAVIOR_ENGINE
            </div>

            <div className="border border-white/[0.06] bg-[#0A0C12] p-4">

              <p className="text-sm font-medium text-[#F3F4F6]">
                Your traits are earned, not selected.
              </p>

              <p className="mt-2 text-xs leading-5 text-[#6B7280]">
                Study more → build Intellect.
                <br />
                Train consistently → build Strength.
                <br />
                Maintain habits → build Discipline.
              </p>

            </div>

          </div>

          {/* CONTINUE */}
          <Link
            href="/dashboard"
            className="clip-small gradient-primary mt-8 flex w-full items-center justify-center gap-3 px-6 py-3.5 font-semibold text-[#0A0C12] transition hover:brightness-110"
          >
            INITIALIZE CHARACTER
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* FOOTER */}
        <div className="mono mt-6 flex justify-between text-[9px] text-[#4B5563]">
          <span>LEVEL :: 01</span>
          <span>XP :: 000</span>
          <span>LIFE//RPG</span>
        </div>

      </div>
    </main>
  );
}

function StatCard({
  icon,
  name,
  value,
}: {
  icon: React.ReactNode;
  name: string;
  value: string;
}) {
  return (
    <div className="border border-white/[0.06] bg-[#11151C] p-4 transition hover:border-[#00E5FF]/30">

      <div className="mb-3 text-[#00E5FF]">
        {icon}
      </div>

      <div className="mono text-[9px] text-[#6B7280]">
        {name}
      </div>

      <div className="mono mt-1 text-lg font-bold text-[#F3F4F6]">
        {value}
      </div>

    </div>
  );
}