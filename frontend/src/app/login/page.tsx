"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Imagee0001 from "../image/m4.jpeg";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
        variant: "default",
      });
      if (response.ok) {
        login();
        router.push("/dashboard");
      } else {
      }

      setEmail("");
      setPassword("");
      console.log("Login successful:", data);
    } catch (err) {
      console.error("Login failed:", err);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login max-w-[1200px] mx-auto my-0 mt-8 flex justify-center items-center flex-col-reverse lg:flex-row ">
        <div className="image flex justify-center items-center w-full lg:w-1/2">
          <Image
            src={Imagee0001}
            alt="login-logo"
            className="w-[300px] md:w-[400px] mt-4 pb-3 lg:mt-0 lg:pb-0"
          />
        </div>
        <div className="form w-full lg:w-1/2">
          <h2 className="mb-7 text-3xl">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-[200px] rounded-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="mt-4 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
