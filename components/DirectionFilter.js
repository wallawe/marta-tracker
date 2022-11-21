import { directionMappings, sharedBtnClasses } from "../constants";
import uniqBy from "lodash/uniqBy";
import cx from "classnames";

export default function DirectionFilter({
  trains,
  selectedCardinals,
  setSelectedCardinals,
}) {
  const cardinalList = uniqBy(trains, "DIRECTION").map((t) => t.DIRECTION);

  const toggleCardinal = (direction) => {
    let newFilters;

    if (selectedCardinals.includes(direction)) {
      newFilters = selectedCardinals.filter((d) => d != direction);
    } else {
      newFilters = [...selectedCardinals, direction];
    }

    setSelectedCardinals(newFilters);
  };

  return (
    <div>
      <span className="block mb-1 text-xs uppercase tracking-wider text-gray-500">
        direction
      </span>

      {cardinalList.map((direction) => {
        return (
          <button
            type="button"
            key={direction}
            className={cx(
              sharedBtnClasses,
              "border-black",
              selectedCardinals.includes(direction)
                ? "bg-black text-white"
                : "text-black bg-white"
            )}
            onClick={() => toggleCardinal(direction)}
          >
            {direction}
            {directionMappings[direction]?.icon}
          </button>
        );
      })}
    </div>
  );
}
