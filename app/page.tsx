"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Shield,
  Sparkles,
  Target,
  Zap,
  Flame,
  Heart,
  Star,
  Mountain,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageFrame />

      {/* NAVBAR */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="mono text-lg font-bold tracking-wider">
            LIFE<span className="text-[#00E5FF]">//</span>RPG
          </div>
          <div className="hidden h-px w-32 bg-gradient-to-r from-[#00E5FF]/40 to-transparent sm:block lg:w-64" />
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="mono text-sm text-[#9CA3AF] transition hover:text-[#F3F4F6]"
          >
            SIGN IN
          </a>

          <a
            href="/signup"
            className="clip-small border border-[#00E5FF]/40 px-5 py-2.5 text-sm font-semibold text-[#00E5FF] transition hover:border-[#00E5FF] hover:bg-[#00E5FF]/5"
          >
            CREATE PLAYER
          </a>
        </div>
      </nav>

      {/* HERO */}
      <main className="mx-auto max-w-7xl px-6 lg:px-10">
        <section className="grid min-h-[calc(100vh-90px)] items-center gap-10 py-12 lg:grid-cols-[1fr_1fr]">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mono mb-6 flex items-center gap-3 text-sm text-[#00E5FF]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00E5FF]" />
              [ SYSTEM :: ONLINE ]
            </div>

            <h1 className="display-font max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              TURN YOUR LIFE
              <br />
              INTO A <span className="gradient-text">GAME.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#9CA3AF]">
              Complete real-life quests. Build your attributes. Unlock
              behavioral traits. Level up into the person you're becoming.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/signup"
                className="clip-small gradient-primary group flex items-center gap-3 px-7 py-3.5 font-semibold text-[#0A0C12]"
              >
                INITIALIZE PLAYER
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#how-it-works"
                className="clip-small border border-white/10 px-7 py-3.5 font-semibold text-[#F3F4F6] transition hover:border-white/20 hover:bg-white/[0.03]"
              >
                HOW IT WORKS
              </a>
            </div>

            <div className="mono mt-12 flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
              <span>QUEST</span>
              <span className="text-[#00E5FF]">→</span>
              <span>XP</span>
              <span className="text-[#00E5FF]">→</span>
              <span>ATTRIBUTES</span>
              <span className="text-[#00E5FF]">→</span>
              <span>TRAITS</span>
              <span className="text-[#00E5FF]">→</span>
              <span>LEVEL UP</span>
            </div>
          </motion.div>

          {/* PLAYER CORE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <PlayerCore />
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24">
          <div className="mb-12">
            <p className="mono text-xs text-[#00E5FF]">
              [ SYSTEM :: HOW_IT_WORKS ]
            </p>

            <h2 className="display-font mt-3 text-3xl font-bold sm:text-4xl">
              Your actions shape your character.
            </h2>

            <p className="mt-4 max-w-2xl text-[#9CA3AF]">
              LIFE//RPG turns everyday progress into a living character
              progression system.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Target size={22} />}
              number="01"
              title="COMPLETE QUESTS"
              description="Turn studying, workouts, routines and real-life goals into quests."
            />

            <FeatureCard
              icon={<Brain size={22} />}
              number="02"
              title="BUILD ATTRIBUTES"
              description="Your actions increase Intellect, Strength, Discipline and Stamina."
            />

            <FeatureCard
              icon={<Sparkles size={22} />}
              number="03"
              title="UNLOCK TRAITS"
              description="Your behavior determines the traits your character develops."
            />
          </div>
        </section>

        {/* TRAIT PHILOSOPHY */}
        <section className="pb-28">
          <div className="hud-panel hud-brackets clip-corner grid gap-10 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <p className="mono text-xs text-[#8B7CFF]">
                [ CHARACTER :: IDENTITY ]
              </p>

              <h2 className="display-font mt-4 text-3xl font-bold">
                You don't choose
                <br />
                who you become.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-[#9CA3AF]">
                Your real-life habits create your attributes. Your attributes
                reveal your behavior. Your behavior unlocks your traits.
              </p>
            </div>

            <div className="grid gap-3">
              <TraitPreview
                icon={<Brain size={19} />}
                name="CURIOUS"
                condition="Consistent learning"
                rarity="RARE"
              />

              <TraitPreview
                icon={<Target size={19} />}
                name="CONSISTENT"
                condition="Long-term streaks"
                rarity="EPIC"
              />

              <TraitPreview
                icon={<Shield size={19} />}
                name="RESILIENT"
                condition="Regular training"
                rarity="LEGENDARY"
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.06] py-8">
          <div className="mono flex flex-col justify-between gap-3 text-xs text-[#6B7280] sm:flex-row">
            <span>LIFE//RPG :: PERSONAL PROGRESSION SYSTEM</span>
            <span>BUILD YOURSELF.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* PAGE FRAME — outer HUD corner brackets + status ticker, matches reference */

function PageFrame() {
  return (
    <div className="pointer-events-none fixed inset-3 z-40 sm:inset-5">
      {/* top-left cut bracket */}
      <svg
        className="absolute left-0 top-0 h-10 w-10 text-[#00E5FF]/50"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M40 0 H10 L0 10 V40"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      {/* top-right cut bracket */}
      <svg
        className="absolute right-0 top-0 h-10 w-10 text-[#8B7CFF]/50"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M0 0 H30 L40 10 V40" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* bottom-left tick */}
      <div className="absolute bottom-0 left-0 flex items-center gap-2">
        <div className="h-px w-10 bg-[#00E5FF]/40" />
        <span className="mono text-xs text-[#4B5563]">//</span>
      </div>

      {/* bottom-right status ticker */}
      <div className="mono absolute bottom-0 right-0 text-right text-[10px] leading-4 text-[#4B5563]">
        <div>LIFE//RPG {"}"}</div>
        <div>VER 1.0.0</div>
      </div>
    </div>
  );
}

/* PLAYER CORE — central gauge + six hexagonal attribute nodes */

const ATTRIBUTES = [
  { key: "intellect", label: "INTELLECT", value: 82, color: "#00E5FF", icon: Brain, angle: -90 },
  { key: "discipline", label: "DISCIPLINE", value: 91, color: "#8B7CFF", icon: Shield, angle: -30 },
  { key: "social", label: "SOCIAL", value: 63, color: "#F472B6", icon: Star, angle: 30 },
  { key: "strength", label: "STRENGTH", value: 68, color: "#818CF8", icon: Mountain, angle: 90 },
  { key: "health", label: "HEALTH", value: 76, color: "#4ADE80", icon: Heart, angle: 150 },
  { key: "streak", label: "STREAK", value: 7, color: "#FBBF24", icon: Flame, angle: 210 },
];

function PlayerCore() {
  const size = 500;
  const radius = 225;
  const center = size / 2;

  return (
    <div className="relative" style={{ height: size, width: size, maxWidth: "100%" }}>
      {/* ambient core glow */}
      <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF]/[0.06] blur-3xl" />

      {/* outer dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#00E5FF]/15"
      />

      {/* mid ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8B7CFF]/15"
      />

      {/* CENTER CORE */}
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ height: 230, width: 230 }}
      >
        {/* segmented tick ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "repeating-conic-gradient(#00E5FF 0deg 5deg, transparent 5deg 13deg)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 10px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 10px))",
            opacity: 0.55,
          }}
        />

        <div className="absolute inset-[18px] rounded-full border border-[#8B7CFF]/30" />

        <div className="relative flex h-[145px] w-[145px] items-center justify-center rounded-full border border-[#00E5FF]/60 bg-[#0A0C12] shadow-[0_0_55px_rgba(0,229,255,0.25)]">
          <div className="absolute inset-[14px] rounded-full border border-[#00E5FF]/20" />

          <motion.div
            animate={{ opacity: [0.75, 1, 0.75], scale: [0.94, 1, 0.94] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap
              size={44}
              className="text-[#00E5FF]"
              style={{ filter: "drop-shadow(0 0 12px rgba(0,229,255,0.65))" }}
              strokeWidth={1.75}
              fill="rgba(0,229,255,0.35)"
            />
          </motion.div>
        </div>

        {/* PLAYER_CORE label */}
        <div className="absolute -top-9 whitespace-nowrap">
          <span className="mono text-[11px] tracking-widest text-[#00E5FF]/80">
            [ PLAYER_CORE ]
          </span>
        </div>

        {/* status label */}
        <div className="absolute -bottom-9 whitespace-nowrap">
          <span className="mono text-[10px] tracking-wider text-[#00E5FF]/70">
            CORE_STATUS :: ACTIVE
          </span>
        </div>
      </div>

      {/* HEX ATTRIBUTE NODES */}
      {ATTRIBUTES.map((attr, i) => {
        const rad = (attr.angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        return (
          <motion.div
            key={attr.key}
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            <HexNode
              icon={<attr.icon size={20} />}
              label={attr.label}
              value={attr.value}
              color={attr.color}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* HEX NODE */

function HexNode({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  const barPct = value > 20 ? Math.min(100, value) : Math.min(100, value * 4);

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-1.5 px-5 py-5"
      style={{
        height: 132,
        width: 132,
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        background: `linear-gradient(160deg, ${color}26, #0D1017 65%)`,
        border: `1px solid ${color}55`,
        boxShadow: `0 0 22px -8px ${color}88`,
      }}
    >
      <div style={{ color }}>{icon}</div>
      <div className="mono text-[10px] tracking-wider text-[#F3F4F6]/90">
        {label}
      </div>
      <div className="mono text-xl font-bold text-[#F3F4F6]">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-0.5 h-1 w-12 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${barPct}%`, background: color }}
        />
      </div>
    </div>
  );
}

/* FEATURE CARD */

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} className="hud-panel clip-corner p-7">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center clip-small border border-[#00E5FF]/20 text-[#00E5FF]">
          {icon}
        </div>

        <span className="mono text-xs text-[#6B7280]">{number}</span>
      </div>

      <h3 className="display-font mt-7 text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#9CA3AF]">{description}</p>
    </motion.div>
  );
}

/* TRAIT PREVIEW */

function TraitPreview({
  icon,
  name,
  condition,
  rarity,
}: {
  icon: React.ReactNode;
  name: string;
  condition: string;
  rarity: "RARE" | "EPIC" | "LEGENDARY";
}) {
  const rarityColor = {
    RARE: "text-[#00E5FF]",
    EPIC: "text-[#8B7CFF]",
    LEGENDARY: "text-[#F5C451]",
  }[rarity];

  return (
    <div className="clip-small flex items-center gap-4 border border-white/[0.07] bg-[#0A0C12] p-4">
      <div className={rarityColor}>{icon}</div>

      <div className="flex-1">
        <div className="display-font text-sm font-semibold">{name}</div>

        <div className="mt-1 text-xs text-[#6B7280]">{condition}</div>
      </div>

      <span className={`mono text-[10px] ${rarityColor}`}>{rarity}</span>
    </div>
  );
}