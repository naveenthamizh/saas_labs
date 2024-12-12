import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

import "./dropdown.css";

interface DropdownTypes {
  options: Array<string>;
  value?: string;
  onSelect: (value: string) => void;
  label?: string;
}

export const Dropdown = (props: DropdownTypes) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    props.value ?? ""
  );
  return (
    <div className="custom-dropdown">
      <label className="label" htmlFor="options">
        {props.label}
      </label>
      <div
        className="selected-option"
        data-testid="dropdown"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div>{selectedOption?.trim() ? selectedOption : "Select variants"}</div>
        <SlArrowDown size="10" color="var(--colors-success-500)" />
      </div>
      {isDropdownOpen && (
        <ul className="options">
          {props.options.map((option, index) => (
            <li
              data-testid="dropdownOptions"
              key={index}
              className={option === selectedOption ? "selected" : ""}
              onClick={() => {
                props.onSelect(option);
                setIsDropdownOpen(false);
                setSelectedOption(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
