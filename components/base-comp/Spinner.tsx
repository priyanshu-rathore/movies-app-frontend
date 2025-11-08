import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white" />
    </div>
  );
};

export default Spinner;
