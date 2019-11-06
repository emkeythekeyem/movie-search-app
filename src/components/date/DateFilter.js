import React from "react";

const year = new Date().getFullYear();
const years = Array.from(new Array(100), (val, index) => year - index);

export default function DateFilter() {
  return (
    <div>
      <select>
        {years.map((year, index) => {
          return (
            <option key={`year${index}`} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
