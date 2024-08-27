"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation function
const validatePassword = (
  password: string
): { valid: boolean; error: string | null } => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return {
      valid: false,
      error: `Password must be at least ${minLength} characters long.`,
    };
  }
  if (!hasUppercase) {
    return {
      valid: false,
      error: "Password must contain at least one uppercase letter.",
    };
  }
  if (!hasLowercase) {
    return {
      valid: false,
      error: "Password must contain at least one lowercase letter.",
    };
  }
  if (!hasNumber) {
    return {
      valid: false,
      error: "Password must contain at least one number.",
    };
  }
  if (!hasSpecialChar) {
    return {
      valid: false,
      error: "Password must contain at least one special character.",
    };
  }

  return { valid: true, error: null };
};

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  // Handle form submission
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   // Validate email
  //   if (!validateEmail(email)) {
  //     setEmailError("Invalid email format.");
  //     setLoading(false);
  //     return;
  //   }
  //   setEmailError(null);

  //   // Validate password
  //   const { valid, error: passwordValidationError } =
  //     validatePassword(password);
  //   if (!valid) {
  //     setPasswordError(passwordValidationError);
  //     setLoading(false);
  //     return;
  //   }
  //   setPasswordError(null);

  //   // Confirm passwords match
  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // Send registration request
  //     const response = await fetch("http://localhost:3001/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, email, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Registration failed");
  //     }

  //     const data = await response.json();
  //     toast({
  //       title: "Registration successful",
  //       description: "You have been registered successfully.",
  //       variant: "default",
  //     });
  //     router.push("/dashboard");
  //   } catch (err) {
  //     console.error("Registration failed:", err);
  //     toast({
  //       title: "Registration failed",
  //       description: "Please try again later.",
  //       variant: "destructive",
  //     });
  //     setError("Registration failed. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      setLoading(false);
      return;
    }
    setEmailError(null);

    // Validate password
    const { valid, error: passwordValidationError } =
      validatePassword(password);
    if (!valid) {
      setPasswordError(passwordValidationError);
      setLoading(false);
      return;
    }
    setPasswordError(null);

    // Confirm passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Send registration request
      const response = await fetch(
        "https://cinephile-server-jay.vercel.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      // Log response status and body for debugging
      const responseBody = await response.text();
      console.log("Response status:", response.status);
      console.log("Response body:", responseBody);

      if (!response.ok) {
        throw new Error(responseBody || "Registration failed");
      }

      toast({
        title: "Registration successful",
        description: "You have been registered successfully.",
        variant: "default",
      });
      router.push("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      setError("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container mx-auto my-8 p-6 max-w-md rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full max-w-xs rounded-full text-white"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
