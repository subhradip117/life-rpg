"use client";

import { ArrowLeft, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
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

      {/* LOGIN PANEL */}
      <div className="hud-panel hud-brackets clip-corner w-full max-w-md p-8 sm:p-10">

        {/* HEADER */}
        <div className="mb-8">

          <div className="mono mb-4 flex items-center gap-2 text-xs text-[#00E5FF]">
            <span className="h-1.5 w-1.5 animate-pulse bg-[#00E5FF]" />
            [ SYSTEM :: PLAYER_LOGIN ]
          </div>

          <h1 className="display-font text-3xl font-bold">
            WELCOME
            <br />
            <span className="gradient-text">BACK.</span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#9CA3AF]">
            Enter your credentials to continue your progression.
          </p>

        </div>

        {/* FORM */}
        <form className="space-y-5">

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
              placeholder="Enter your password"
              className="cyber-input"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="clip-small gradient-primary mt-3 flex w-full items-center justify-center gap-3 px-6 py-3.5 font-semibold text-[#0A0C12] transition hover:brightness-110"
          >
            <LogIn size={18} />
            ENTER SYSTEM
          </button>

        </form>

        {/* SIGN UP LINK */}
        <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">

          <p className="text-sm text-[#6B7280]">
            New to LIFE//RPG?
          </p>

          <Link
            href="/signup"
            className="mono mt-2 inline-block text-xs text-[#00E5FF] transition hover:text-[#8B7CFF]"
          >
            INITIALIZE NEW PLAYER →
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