"use client";
import { incrementByAmount } from "@/redux/slices/features/counterSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    // dispatch({ type: "counter/incrementByAmount", payload: 9 });
    dispatch((incrementByAmount(9)));
  };

  console.log(selectedOption, "selectedOption");
  return (
    <>
      <div>Page data from the {count}</div>
      <div>
        <label htmlFor="dropdown">Select an option:</label>
        <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
          <option value="" disabled>Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      {selectedOption && <div>You selected: {selectedOption}</div>}
    </>
  );
};

export default Page;
