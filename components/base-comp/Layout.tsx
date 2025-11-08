import Image from "next/image";
import React from "react";
import authVectorOne from "@/assets/authvectorone.png";
import authVectorTwo from "@/assets/authvectotwo.png";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-background w-screen h-screen relative overflow-hidden">
      {/* Images as background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src={authVectorTwo}
          alt="Auth background"
          fill
          className="object-contain object-bottom"
          priority
        />
        <Image
          src={authVectorOne}
          alt="Auth background"
          fill
          className="object-contain absolute bottom-0 object-bottom"
          priority
        />
      </div>

      {/* Page content on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Layout;
