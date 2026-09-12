"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function DashboardPage() {
  const [status, setStatus] = useState("CONNECTING...");

  useEffect(() => {
    async function testConnection() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .limit(1);

      if (error) {
        console.error(error);
        setStatus("CONNECTION ERROR");
        return;
      }

      console.log(data);
      setStatus("SUPABASE CONNECTED");
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0C12] text-[#F3F4F6]">
      <div className="hud-panel p-10 text-center">

        <p className="mono text-xs text-[#00E5FF]">
          [ DATABASE_CONNECTION ]
        </p>

        <h1 className="display-font mt-4 text-2xl font-bold">
          {status}
        </h1>

      </div>
    </main>
  );
}