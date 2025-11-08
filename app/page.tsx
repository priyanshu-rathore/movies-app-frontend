"use client";

import SignIn from "@/components/auth/SignIn";
import Spinner from "@/components/base-comp/Spinner";
import Movies from "@/components/movies/Movies";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // show a full-screen spinner while checking auth
    return (
      <Spinner/>
    );
  }

  return <div>{isAuthenticated ? <Movies /> : <SignIn />}</div>;
}
