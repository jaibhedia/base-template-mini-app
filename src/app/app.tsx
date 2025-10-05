"use client";

import dynamic from "next/dynamic";

// note: dynamic import is required for components that use the Frame SDK
const BaseNinjaGame = dynamic(() => import("~/components/game/BaseNinjaGame").then(mod => ({ default: mod.BaseNinjaGame })), {
  ssr: false,
});

export default function App() {
  return (
    <>
      <BaseNinjaGame />
    </>
  );
}
