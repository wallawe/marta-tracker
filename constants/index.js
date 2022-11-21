import {
  ArrowNorth,
  ArrowSouth,
  ArrowEast,
  ArrowWest,
} from "../components/icons";

// Can't use normal string interpolation e.g. `bg-${line}-500` bc of how
// Tailwind's JIT compiler works :/ so we spell out the classes here
export const colorMappings = {
  GOLD: {
    bg: "bg-yellow-500",
    text: "text-yellow-600",
    border: "border-yellow-500",
  },
  RED: {
    bg: "bg-red-500",
    text: "text-red-600",
    border: "border-red-500",
  },
  GREEN: {
    bg: "bg-green-500",
    text: "text-green-600",
    border: "border-green-500",
  },
  BLUE: {
    bg: "bg-blue-500",
    text: "text-blue-600",
    border: "border-blue-500",
  },
};

export const directionMappings = {
  N: {
    label: "North",
    icon: <ArrowNorth />,
  },
  S: {
    label: "South",
    icon: <ArrowSouth />,
  },
  E: {
    label: "East",
    icon: <ArrowEast />,
  },
  W: {
    label: "West",
    icon: <ArrowWest />,
  },
};

export const sharedBtnClasses =
  "border mr-2 rounded-full px-3 py-0.5 text-sm font-medium hover:opacity-75 capitalize gap-1.5 items-center inline-flex";

export const ENDPOINT = "/api/marta";

// actually a fn, so would go in a util file or similar
export const fetcherFn = (url) => fetch(url).then((r) => r.json());
