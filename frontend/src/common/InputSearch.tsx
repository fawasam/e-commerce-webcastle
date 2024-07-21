import React from "react";

const InputSearch = () => {
  return (
    <div className="w-[400px] mt-4 p-12 h-[80px]">
      <input
        type="text"
        className="border border-gray-300  rounded-md p-12 w-[400px] h-[40px]"
        placeholder="Seach ..."
        style={{ width: "400px", height: "40px", padding: "20px" }}
      />
    </div>
  );
};

export default InputSearch;
