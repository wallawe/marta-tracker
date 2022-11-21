import { directionMappings, colorMappings } from "../constants";

// would normally go into a util file or similar
const byTime = (a, b) => {
  return a.NEXT_ARR.localeCompare(b.NEXT_ARR);
};

export default function UpcomingArrivals({
  trains,
  selectedStation,
  selectedLines,
  selectedCardinals,
}) {
  const upcomingTrains = trains.filter((t) => {
    return (
      t.STATION === selectedStation?.STATION &&
      (selectedLines.length === 0 || selectedLines.includes(t.LINE)) &&
      (selectedCardinals.length === 0 ||
        selectedCardinals.includes(t.DIRECTION))
    );
  });

  if (upcomingTrains?.length < 1) {
    return (
      <span className="italic text-lg">
        No trains arriving that match your criteria
      </span>
    );
  }

  return upcomingTrains.sort(byTime).map((t, i) => {
    return (
      <li key={i} className="py-2">
        Train arriving at {t.NEXT_ARR} headed{" "}
        <strong>{directionMappings[t.DIRECTION].label}</strong> on the{" "}
        <strong className={`capitalize ${colorMappings[t.LINE].text}`}>
          {t.LINE.toLowerCase()}
        </strong>{" "}
        line
      </li>
    );
  });
}
