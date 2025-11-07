import Image from "next/image";
import React from "react";
import authVectorOne from "@/assets/authvectorone.png";
import authVectorTwo from "@/assets/authvectotwo.png";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-background w-screen h-screen">
      {children}
      <div>
        <Image
          src={authVectorTwo} // must start with "/" if from /public
          alt="Auth background"
          fill // automatically fills the parent container
          className="object-contain justify-end object-bottom"
          priority
        />
        <Image
          src={authVectorOne} // must start with "/" if from /public
          alt="Auth background"
          fill // automatically fills the parent container
          className="object-contain absolute bottom-0 justify-end object-bottom"
          priority
        />
      </div>
    </div>
  );
};

export default Layout;
