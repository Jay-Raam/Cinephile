"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const validateEmail = (email: string): boolean => {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (
  password: string
): { valid: boolean; error: string | null } => {
  // Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return {
      valid: false,
      error: `Password must be at least ${minLength} characters long`,
    };
  }
  if (!hasUppercase) {
    return {
      valid: false,
      error: "Password must contain at least one uppercase letter",
    };
  }
  if (!hasLowercase) {
    return {
      valid: false,
      error: "Password must contain at least one lowercase letter",
    };
  }
  if (!hasNumber) {
    return { valid: false, error: "Password must contain at least one number" };
  }
  if (!hasSpecialChar) {
    return {
      valid: false,
      error: "Password must contain at least one special character",
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
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
        description: "Please try again.",
        variant: "destructive",
      });
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h2 className="mb-7 text-3xl">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
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
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-[200px] rounded-full"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
