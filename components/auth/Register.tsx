"use client";

import Input from "@/components/base-comp/Input";
import Button from "@/components/base-comp/Button";
import CheckBox from "@/components/base-comp/CheckBox";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/"); // This works
  };

  return (
    <div className="relative min-h-screen w-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Form Content - Centered */}
      <div className="relative z-20 w-full max-w-sm px-6">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-white text-4xl font-bold text-center">Register</h1>

          <Input placeholder="Full Name" variant="default" />
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
          <Input placeholder="Confirm Password" type="password" />

          <div className="flex justify-center">
            <CheckBox label="I agree to the Terms & Conditions" />
          </div>

          <Button className="w-full py-4 text-2xl font-semibold">Sign Up</Button>

          <p className="text-center text-white/70 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleSignInClick}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>

    </div>
  );
};

export default Register;