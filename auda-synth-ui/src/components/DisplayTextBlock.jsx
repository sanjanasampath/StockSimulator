import React from "react";

function DisplayTextBlock({ placeholder, text }) {
  return (
    <div className="p-4 pl-8 pr-8 text-center">
      <p className="text-base text-center text-brandPurple">{placeholder}</p>
      <p className="text-brand align-middle text-center font-bold">$ {text}</p>
    </div>
  );
}

export default DisplayTextBlock;
