import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import uniqBy from "lodash/uniqBy";
import DirectionFilter from "../components/DirectionFilter";
import LineFilter from "../components/LineFilter";
import StationSelector from "../components/StationSelector";
import UpcomingArrivals from "../components/UpcomingArrivals";
import AutoRefreshToggle from "../components/AutoRefreshToggle";
import { ENDPOINT, fetcherFn } from "../constants";
import toast, { Toaster } from "react-hot-toast";

const initCardinals = [];
const initLines = [];

export default function Home() {
  const [autofetchOn, setAutofetchOn] = useState(true);
  const { data: trains = [] } = useSWR(ENDPOINT, fetcherFn, {
    refreshInterval: autofetchOn ? 30000 : 0,
    revalidateIfStale: autofetchOn,
    revalidateOnFocus: autofetchOn,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedCardinals, setSelectedCardinals] = useState(initCardinals);
  const [selectedLines, setSelectedLines] = useState(initLines);
  const allStations = uniqBy(trains, "STATION");
  const { mutate: fetchData } = useSWRConfig();

  return (
    <>
      <header className="max-w-4xl mx-auto py-4 border-b flex justify-between">
        <h1 className="text-3xl font-black">Marta Schedule</h1>

        <AutoRefreshToggle
          autofetch={autofetchOn}
          setAutofetch={setAutofetchOn}
        />
      </header>

      <div className="max-w-4xl mx-auto flex gap-10">
        <main className="grow">
          <StationSelector
            stations={allStations}
            selectedLines={selectedLines}
            selectedStation={selectedStation}
            selectedCardinals={selectedCardinals}
            setSelectedStation={setSelectedStation}
          />

          {selectedStation && (
            <UpcomingArrivals
              trains={trains}
              selectedStation={selectedStation}
              selectedLines={selectedLines}
              selectedCardinals={selectedCardinals}
            />
          )}
        </main>

        <aside>
          <div className="sticky top-6 mt-6">
            <div className="border px-3 py-4 bg-white rounded-md">
              <nav className="flex justify-between items-center mb-3 border-b pb-2">
                <h3 className="text-lg font-bold">Filters</h3>
                <button
                  className="text-sm"
                  onClick={() => {
                    setSelectedCardinals(initCardinals);
                    setSelectedLines(initLines);
                  }}
                >
                  clear
                </button>
              </nav>

              <LineFilter
                trains={trains}
                selectedLines={selectedLines}
                setSelectedLines={setSelectedLines}
              />

              <DirectionFilter
                trains={trains}
                selectedCardinals={selectedCardinals}
                setSelectedCardinals={setSelectedCardinals}
              />
            </div>
            <button
              className="block w-full mt-4 py-1 border rounded-full hover:bg-gray-50 text-sm"
              onClick={() => {
                fetchData(ENDPOINT);
                toast.success("Latest data retrieved!");
              }}
            >
              Refresh Data Now
            </button>
          </div>
        </aside>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
