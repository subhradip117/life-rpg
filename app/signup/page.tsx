"use client";

import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-12">

      {/* BACK TO LANDING */}
      <Link
        href="/"
        className="mono absolute left-6 top-6 flex items-center gap-2 text-xs text-[#6B7280] transition hover:text-[#00E5FF]"
      >
        <ArrowLeft size={14} />
        RETURN TO SYSTEM
      </Link>

      {/* SIGN UP PANEL */}
      <div className="hud-panel hud-brackets clip-corner w-full max-w-md p-8 sm:p-10">

        {/* HEADER */}
        <div className="mb-8">

          <div className="mono mb-4 flex items-center gap-2 text-xs text-[#00E5FF]">
            <span className="h-1.5 w-1.5 animate-pulse bg-[#00E5FF]" />
            [ SYSTEM :: NEW_PLAYER ]
          </div>

          <h1 className="display-font text-3xl font-bold">
            INITIALIZE
            <br />
            <span className="gradient-text">PLAYER.</span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#9CA3AF]">
            Create your player profile and begin your progression.
          </p>

        </div>

        {/* FORM */}
        <form className="space-y-5">

          {/* PLAYER NAME */}
          <div>
            <label className="mono mb-2 block text-[10px] tracking-wider text-[#6B7280]">
              PLAYER_NAME
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="cyber-input"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mono mb-2 block text-[10px] tracking-wider text-[#6B7280]">
              EMAIL_ADDRESS
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="cyber-input"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mono mb-2 block text-[10px] tracking-wider text-[#6B7280]">
              PASSWORD
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="cyber-input"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mono mb-2 block text-[10px] tracking-wider text-[#6B7280]">
              CONFIRM_PASSWORD
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="cyber-input"
            />
          </div>

          {/* CREATE PLAYER BUTTON */}
          <button
            type="submit"
            className="clip-small gradient-primary mt-3 flex w-full items-center justify-center gap-3 px-6 py-3.5 font-semibold text-[#0A0C12] transition hover:brightness-110"
          >
            <UserPlus size={18} />
            INITIALIZE PLAYER
          </button>

        </form>

        {/* SIGN IN LINK */}
        <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">

          <p className="text-sm text-[#6B7280]">
            Already have a player account?
          </p>

          <Link
            href="/login"
            className="mono mt-2 inline-block text-xs text-[#00E5FF] transition hover:text-[#8B7CFF]"
          >
            ENTER EXISTING SYSTEM →
          </Link>

        </div>

        {/* FOOTER */}
        <div className="mono mt-8 flex justify-between text-[9px] text-[#4B5563]">
          <span>AUTH_PROTOCOL :: SECURE</span>
          <span>V1.0.0</span>
        </div>

      </div>
    </main>
  );
}