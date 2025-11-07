"use client";

import Link from "next/link";
import Input from "@/components/base-comp/Input";
import Button from "@/components/base-comp/Button";
import CheckBox from "@/components/base-comp/CheckBox";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter()

  return (
    <form className="relative w-screen h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Centered content container */}
      <div className="flex flex-col gap-5 w-full max-w-sm z-10">
        <h1 className="text-white text-h1 text-center">Sign in</h1>

        <Input placeholder="Email" variant="default" />
        <Input placeholder="Password" type="password" />

        {/* ✅ Centered checkbox */}
        <div className="flex justify-center">
          <CheckBox defaultChecked label="Remember me" />
        </div>

        <Button onClick={()=>router.push("/movies")} className="w-full py-4 text-2xl">Login</Button>

        {/* ✅ Register link */}
        <p className="text-center text-white/80 text-sm mt-2">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignIn;
