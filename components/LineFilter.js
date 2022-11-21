import { colorMappings, sharedBtnClasses } from "../constants";
import groupBy from "lodash/groupBy";
import cx from "classnames";

export default function LineFilter({
  trains,
  selectedLines,
  setSelectedLines,
}) {
  const availableLines = groupBy(trains, "LINE");

  const toggleLine = (line) => {
    let newFilters;

    if (selectedLines.includes(line)) {
      newFilters = selectedLines.filter((l) => l != line);
    } else {
      newFilters = [...selectedLines, line];
    }

    setSelectedLines(newFilters);
  };

  return (
    <div className="mb-4">
      <span className="block mb-1 text-xs uppercase tracking-wider text-gray-500">
        line
      </span>

      {Object.keys(availableLines).map((line) => {
        const { bg, border, text } = colorMappings[line];

        return (
          <button
            type="button"
            key={line}
            onClick={() => toggleLine(line)}
            className={cx(
              border,
              sharedBtnClasses,
              selectedLines.includes(line) ? `${bg} text-white` : text
            )}
          >
            {line.toLowerCase()}
          </button>
        );
      })}
    </div>
  );
}
