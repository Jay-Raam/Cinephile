"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
