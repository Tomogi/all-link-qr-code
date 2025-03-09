import { JSX } from "preact";
import type { Signal } from "@preact/signals";

interface CardVisitProps {
  count: Signal<number>;
}

export default function CardVisit(props: CardVisitProps) {
  return (
    <div
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
