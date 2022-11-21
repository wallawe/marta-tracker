import { Switch } from "@headlessui/react";
import cx from "classnames";

export default function AutoRefreshToggle({ autofetch = true, setAutofetch }) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={autofetch}
        onChange={() => setAutofetch((prev) => !prev)}
        className={cx(
          autofetch ? "bg-green-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
        )}
      >
        <span
          aria-hidden="true"
          className={cx(
            autofetch ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Auto-refresh</span>{" "}
        <span className="text-sm text-gray-500">(every 30 seconds)</span>
      </Switch.Label>
    </Switch.Group>
  );
}
