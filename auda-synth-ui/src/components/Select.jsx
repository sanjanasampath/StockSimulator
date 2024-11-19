import React, { useState } from "react";
import { classNames } from "../utils/ui";

function Select(props) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const selectValues = props.options;
  const classNames = `flex w-full px-4 py-3 bg-textboxBackground border border-textboxBackground relative text-brand text-base rounded-2xl focus:ring-textboxBackground focus:border-textboxBackground focus-visible:outline-none block ${props.customstyles}`;

  const Tooltip = ({ message, visible }) => (
    <div
      className={`absolute left-10 top-20 mt-1 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg transition-opacity duration-300 whitespace-pre-line
		${visible ? "opacity-100" : "opacity-0"}`}
    >
      {message}
    </div>
  );

  return (
    <>
      <select
        {...props}
        className={classNames}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        {selectValues.map((option) => (
          <option key={option.value} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>
      {/* <Tooltip message={props.message} visible={tooltipVisible} /> */}
    </>
  );
}

export default Select;
