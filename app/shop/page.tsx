"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const shopItems = [
  {
    id: 1,
    name: "FOCUS BOOST",
    description: "A temporary boost for your next productive session.",
    price: 100,
    rarity: "RARE",
    icon: Zap,
  },
  {
    id: 2,
    name: "DISCIPLINE CORE",
    description: "A rare item representing consistency and routine.",
    price: 150,
    rarity: "EPIC",
    icon: Shield,
  },
  {
    id: 3,
    name: "WARRIOR EMBLEM",
    description: "A badge earned by players who push their limits.",
    price: 200,
    rarity: "EPIC",
    icon: Crown,
  },
  {
    id: 4,
    name: "LEGENDARY CORE",
    description: "A prestigious reward for advanced players.",
    price: 500,
    rarity: "LEGENDARY",
    icon: Sparkles,
  },
];

export default function ShopPage() {
  const [credits, setCredits] = useState(250);
  const [purchased, setPurchased] = useState<number[]>([]);

  function buyItem(id: number, price: number) {
    if (credits < price || purchased.includes(id)) return;

    setCredits((current) => current - price);
    setPurchased((current) => [...current, id]);
  }

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

          <div className="flex items-center gap-5">

            <div className="mono text-[10px] text-[#6B7280]">
              SHOP_SYSTEM :: ONLINE
            </div>

            <div className="border border-[#F5C451]/20 bg-[#F5C451]/[0.04] px-4 py-2">
              <span className="mono text-sm text-[#F5C451]">
                ◉ {credits}
              </span>
            </div>

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
            [ REWARD_STORE ]
          </p>

          <div className="mt-2 flex items-center justify-between">

            <div>
              <h1 className="display-font text-3xl font-bold sm:text-4xl">
                ITEM <span className="gradient-text">SHOP.</span>
              </h1>

              <p className="mt-2 text-sm text-[#6B7280]">
                Spend your hard-earned credits on rewards.
              </p>
            </div>

            <ShoppingBag
              size={30}
              className="hidden text-[#8B7CFF] sm:block"
            />

          </div>

        </div>

        {/* SHOP GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {shopItems.map((item) => {
            const Icon = item.icon;
            const owned = purchased.includes(item.id);
            const canAfford = credits >= item.price;

            return (
              <div
                key={item.id}
                className={`hud-panel clip-corner flex flex-col p-6 transition ${
                  owned
                    ? "border-[#4ADE80]/30"
                    : "hover:border-[#8B7CFF]/40"
                }`}
              >

                {/* ICON */}
                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center border border-[#8B7CFF]/20 bg-[#8B7CFF]/[0.05]">
                    <Icon
                      size={23}
                      className="text-[#8B7CFF]"
                    />
                  </div>

                  <span
                    className={`mono text-[8px] ${
                      item.rarity === "LEGENDARY"
                        ? "text-[#F5C451]"
                        : item.rarity === "EPIC"
                        ? "text-[#8B7CFF]"
                        : "text-[#00E5FF]"
                    }`}
                  >
                    {item.rarity}
                  </span>

                </div>

                {/* INFO */}
                <div className="mt-6">

                  <h2 className="display-font text-lg font-bold">
                    {item.name}
                  </h2>

                  <p className="mt-2 min-h-[60px] text-xs leading-5 text-[#6B7280]">
                    {item.description}
                  </p>

                </div>

                {/* PRICE */}
                <div className="mt-6 border-t border-white/[0.06] pt-5">

                  <div className="flex items-center justify-between">

                    <span className="mono text-[9px] text-[#6B7280]">
                      COST
                    </span>

                    <span className="mono font-bold text-[#F5C451]">
                      ◉ {item.price}
                    </span>

                  </div>

                  <button
                    onClick={() => buyItem(item.id, item.price)}
                    disabled={owned || !canAfford}
                    className={`clip-small mt-4 w-full px-4 py-3 text-xs font-semibold transition ${
                      owned
                        ? "border border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]"
                        : canAfford
                        ? "gradient-primary text-[#0A0C12] hover:brightness-110"
                        : "cursor-not-allowed border border-white/[0.06] bg-[#181D26] text-[#4B5563]"
                    }`}
                  >
                    {owned
                      ? "PURCHASED ✓"
                      : canAfford
                      ? "BUY ITEM"
                      : "INSUFFICIENT CREDITS"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* INVENTORY LINK */}
        <div className="hud-panel clip-corner mt-8 flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">

          <div>
            <p className="mono text-[10px] text-[#6B7280]">
              YOUR COLLECTION
            </p>

            <h2 className="display-font mt-1 text-lg font-bold">
              VIEW YOUR INVENTORY
            </h2>
          </div>

          <Link
            href="/inventory"
            className="clip-small border border-[#00E5FF]/30 px-6 py-3 text-xs text-[#00E5FF] transition hover:bg-[#00E5FF]/10"
          >
            OPEN INVENTORY →
          </Link>

        </div>

      </div>

    </main>
  );
}