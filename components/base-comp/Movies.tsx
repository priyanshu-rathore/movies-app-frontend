import React from "react";
import Button from "./Button";

const Movies = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-h2">Your movie list is empty</h1>
      <Button>Add a new movie</Button>
    </div>
  );
};

export default Movies;
