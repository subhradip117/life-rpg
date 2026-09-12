"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react";

const inventoryItems = [
  {
    name: "FOCUS BOOST",
    rarity: "RARE",
    icon: Zap,
    acquired: "TODAY",
  },
  {
    name: "DISCIPLINE CORE",
    rarity: "EPIC",
    icon: Shield,
    acquired: "YESTERDAY",
  },
  {
    name: "WARRIOR EMBLEM",
    rarity: "EPIC",
    icon: Crown,
    acquired: "3 DAYS AGO",
  },
];

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-[#0A0C12] text-[#F3F4F6]">

      {/* HEADER */}
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            href="/dashboard"
            className="display-font text-xl font-bold"
          >
            LIFE<span className="text-[#00E5FF]">//</span>RPG
          </Link>

          <div className="mono text-[10px] text-[#6B7280]">
            INVENTORY_SYSTEM :: ONLINE
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* TITLE */}
        <div className="mb-8">

          <Link
            href="/dashboard"
            className="mono mb-4 flex items-center gap-2 text-[10px] text-[#6B7280] hover:text-[#00E5FF]"
          >
            <ArrowLeft size={13} />
            DASHBOARD
          </Link>

          <p className="mono text-[10px] tracking-widest text-[#00E5FF]">
            [ PLAYER_COLLECTION ]
          </p>

          <h1 className="display-font mt-2 text-3xl font-bold sm:text-4xl">
            YOUR <span className="gradient-text">INVENTORY.</span>
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            Everything you have earned along your journey.
          </p>

        </div>

        {/* INVENTORY */}
        <section className="hud-panel hud-brackets clip-corner p-6 sm:p-8">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <p className="mono text-[10px] text-[#6B7280]">
                OWNED_ITEMS
              </p>

              <h2 className="display-font mt-1 text-xl font-bold">
                COLLECTION
              </h2>
            </div>

            <span className="mono text-xs text-[#00E5FF]">
              {inventoryItems.length} ITEMS
            </span>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {inventoryItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="border border-white/[0.06] bg-[#11151C] p-6 transition hover:border-[#8B7CFF]/40"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center border border-[#8B7CFF]/20 bg-[#8B7CFF]/[0.05]">
                      <Icon
                        size={26}
                        className="text-[#8B7CFF]"
                      />
                    </div>

                    <span
                      className={`mono text-[8px] ${
                        item.rarity === "LEGENDARY"
                          ? "text-[#F5C451]"
                          : "text-[#8B7CFF]"
                      }`}
                    >
                      {item.rarity}
                    </span>

                  </div>

                  <h3 className="display-font mt-6 text-lg font-bold">
                    {item.name}
                  </h3>

                  <p className="mono mt-2 text-[9px] text-[#6B7280]">
                    ACQUIRED :: {item.acquired}
                  </p>

                </div>
              );
            })}

          </div>

        </section>

        {/* EMPTY / FUTURE ITEMS */}
        <div className="mt-6 border border-dashed border-white/[0.08] p-8 text-center">

          <Sparkles
            size={22}
            className="mx-auto text-[#6B7280]"
          />

          <p className="display-font mt-3 text-sm font-bold">
            MORE REWARDS AWAIT
          </p>

          <p className="mt-1 text-xs text-[#6B7280]">
            Complete more quests to earn credits and unlock new items.
          </p>

        </div>

      </div>

    </main>
  );
}