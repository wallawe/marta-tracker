import { useState } from "react";
import cx from "classnames";
import { EyeIcon, ClearIcon, MagnifyingGlass } from "../components/icons";

export default function StationSelector({
  stations,
  setSelectedStation,
  selectedStation,
  selectedCardinals,
  selectedLines,
}) {
  const [query, setQuery] = useState("");

  const stationsQuery = stations.filter((s) => {
    return (
      (selectedLines.length === 0 || selectedLines.includes(s.LINE)) &&
      (selectedCardinals.length === 0 ||
        selectedCardinals.includes(s.DIRECTION)) &&
      s.STATION.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <>
      <section className="sticky top-0 pt-6 pb-0 bg-white">
        <div className="flex justify-between">
          <span className="block mb-2 text-base">
            Which station are you leaving from?
          </span>
          {!selectedStation && (
            <span className="text-gray-500 italic block mb-3 text-sm">
              {stationsQuery.length} matching stations
            </span>
          )}
        </div>
        <div className="relative">
          <span
            className={cx(
              "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            )}
          >
            {selectedStation ? <EyeIcon /> : <MagnifyingGlass />}
          </span>
          <input
            className="block w-full rounded-md border border-gray-300 shadow-sm pl-12 p-4 text-lg mb-2"
            type="text"
            onChange={(e) => {
              setSelectedStation(null);
              setQuery(e.target.value);
            }}
            value={query}
            placeholder="Search for your station"
          />
          {query.length > 1 && (
            <button
              type="button"
              className="text-gray-700 absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => {
                setQuery("");
                setSelectedStation(null);
              }}
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </section>
      {!selectedStation && (
        <ul className="divide-y">
          {stationsQuery
            .sort((a, b) => a.STATION.localeCompare(b.STATION.toLowerCase()))
            .map((s, index) => (
              <li
                key={index}
                className="py-6 px-2 cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setSelectedStation(s);
                  setQuery(s.STATION.toLowerCase());
                }}
              >
                <strong className="capitalize block">
                  {s.STATION.toLowerCase()}
                </strong>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
