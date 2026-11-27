"use client";
import { useState } from "react";
import { useToast } from "@/components/Toast";

export default function JoinButton({ status, name }: { status: string; name: string }) {
  const [joined, setJoined] = useState(false);
  const { show, node } = useToast();
  if (status === "Finished") return <span className="muted">Results are final.</span>;
  return (
    <>
      <button
        className={`btn ${joined ? "btn-ghost" : "btn-pulse"}`}
        disabled={joined}
        onClick={() => {
          setJoined(true);
          show(`You're in ${name}. Your demo account login has been sent to your email.`);
        }}
      >
        {joined ? "Joined ✓" : "Join competition"}
      </button>
      {node}
    </>
  );
}
