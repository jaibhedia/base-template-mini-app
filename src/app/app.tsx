"use client";

import dynamic from "next/dynamic";
import { APP_NAME } from "~/lib/constants";

// note: dynamic import is required for components that use the Frame SDK
const BaseNinjaGame = dynamic(() => import("~/components/game/BaseNinjaGame").then(mod => ({ default: mod.BaseNinjaGame })), {
  ssr: false,
});

export default function App(
  { title }: { title?: string } = { title: APP_NAME }
) {
  return <BaseNinjaGame />;
}
