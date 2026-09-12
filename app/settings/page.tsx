"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Lock, User, Shield, LogOut } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);

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
            SYSTEM_SETTINGS :: ONLINE
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">

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
            [ SYSTEM_CONFIGURATION ]
          </p>

          <h1 className="display-font mt-2 text-3xl font-bold sm:text-4xl">
            SETTINGS<span className="text-[#00E5FF]">.</span>
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            Configure your LIFE//RPG player system.
          </p>

        </div>

        {/* PROFILE */}
        <section className="hud-panel hud-brackets clip-corner p-6 sm:p-8">

          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-5">

            <User size={20} className="text-[#00E5FF]" />

            <div>
              <p className="mono text-[9px] text-[#6B7280]">
                PLAYER_PROFILE
              </p>

              <h2 className="display-font text-lg font-bold">
                PROFILE
              </h2>
            </div>

          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mono mb-2 block text-[9px] text-[#6B7280]">
                PLAYER_NAME
              </label>

              <input
                type="text"
                defaultValue="MOHIT"
                className="cyber-input"
              />
            </div>

            <div>
              <label className="mono mb-2 block text-[9px] text-[#6B7280]">
                EMAIL_ADDRESS
              </label>

              <input
                type="email"
                defaultValue="player@example.com"
                className="cyber-input"
              />
            </div>

          </div>

          <button className="clip-small gradient-primary mt-6 px-6 py-3 text-xs font-semibold text-[#0A0C12] hover:brightness-110">
            SAVE PROFILE
          </button>

        </section>

        {/* PREFERENCES */}
        <section className="hud-panel clip-corner mt-6 p-6 sm:p-8">

          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-5">

            <Bell size={20} className="text-[#F5C451]" />

            <div>
              <p className="mono text-[9px] text-[#6B7280]">
                PLAYER_PREFERENCES
              </p>

              <h2 className="display-font text-lg font-bold">
                PREFERENCES
              </h2>
            </div>

          </div>

          <div className="mt-5 flex items-center justify-between border border-white/[0.06] bg-[#11151C] p-5">

            <div>
              <p className="text-sm font-semibold">
                Quest Notifications
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                Receive reminders about your active quests.
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 transition ${
                notifications
                  ? "bg-[#00E5FF]"
                  : "bg-[#181D26]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 bg-[#0A0C12] transition ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </section>

        {/* SECURITY */}
        <section className="hud-panel clip-corner mt-6 p-6 sm:p-8">

          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-5">

            <Shield size={20} className="text-[#8B7CFF]" />

            <div>
              <p className="mono text-[9px] text-[#6B7280]">
                AUTH_CONFIGURATION
              </p>

              <h2 className="display-font text-lg font-bold">
                SECURITY
              </h2>
            </div>

          </div>

          <div className="mt-5 space-y-3">

            <button className="flex w-full items-center gap-4 border border-white/[0.06] bg-[#11151C] p-5 text-left transition hover:border-[#8B7CFF]/30">

              <Lock size={18} className="text-[#8B7CFF]" />

              <div>
                <p className="text-sm font-semibold">
                  Change Password
                </p>

                <p className="mt-1 text-xs text-[#6B7280]">
                  Update your account authentication.
                </p>
              </div>

            </button>

          </div>

        </section>

        {/* ACCOUNT */}
        <section className="mt-6 border border-[#F87171]/10 bg-[#F87171]/[0.02] p-6">

          <p className="mono text-[9px] text-[#F87171]">
            DANGER_ZONE
          </p>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-semibold">
                Sign Out
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                End your current player session.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 border border-[#F87171]/30 px-5 py-3 text-xs text-[#F87171] transition hover:bg-[#F87171]/10">
              <LogOut size={15} />
              SIGN OUT
            </button>

          </div>

        </section>

        {/* FOOTER */}
        <div className="mono mt-8 flex justify-between text-[9px] text-[#4B5563]">
          <span>LIFE//RPG :: SETTINGS</span>
          <span>V1.0.0</span>
        </div>

      </div>

    </main>
  );
}