"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Separator,
  TextField,
  Input,
  Description,
  Label,
  Button,
  FieldError,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/utils/auth-client";
import { RegisterFormData } from "@/utils/types/AuthTypes";
// import { auth } from "@/utils/auth";

// type User = typeof auth.$Infer.Session.user;

const RegisterForm = (): React.JSX.Element => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const { data: authData, error: authError } = await authClient.signUp.email({
        name: data.username,
        email: data.email,
        password: data.password,
        image: data.imageUrl ? data.imageUrl : undefined,
        phone: data.phone,
        location: data.location,
      });

      if (authError) {
        setError("root", {
          message: authError.message || "Failed to create account. Please try again.",
        });
        return;
      }

      console.log("Account successfully created:", authData);
      router.push("/");
    } catch (err) {
      setError("root", {
        message: "Something went wrong establishing a connection. Please try again.",
      });
    }
  };

  const signUpWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <>
      {/* OAuth Button */}
      <Button
        fullWidth
        className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 h-12 rounded-xl text-sm font-semibold transition-colors flex items-center shadow-sm"
        onPress={signUpWithGoogle}
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center my-6 gap-4">
        <Separator className="flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold shrink-0">
          or
        </span>
        <Separator className="flex-1 bg-slate-200" />
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-4">
        
        {/* Username Field */}
        <TextField fullWidth isInvalid={!!errors.username}>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Username <span className="text-brand-primary">*</span>
          </Label>
          <Input
            placeholder="john_doe"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters.",
              },
            })}
          />
          {errors.username ? (
            <FieldError className="text-red-500 text-xs mt-1 font-medium">
              {errors.username.message}
            </FieldError>
          ) : (
            <Description className="text-slate-500 text-xs mt-1 font-medium">
              Choose a unique username for your profile.
            </Description>
          )}
        </TextField>

        {/* Email Field */}
        <TextField fullWidth isInvalid={!!errors.email}>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Email <span className="text-brand-primary">*</span>
          </Label>
          <Input
            type="email"
            placeholder="user@example.com"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <FieldError className="text-red-500 text-xs mt-1 font-medium">
              {errors.email.message}
            </FieldError>
          )}
        </TextField>

        {/* Password Field */}
        <TextField fullWidth isInvalid={!!errors.password}>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Password <span className="text-brand-primary">*</span>
          </Label>
          <div className="relative flex w-full items-center">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pr-10 bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
              {...register("password", {
                required: "Password is required.",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                  message: "Must contain 8 chars, 1 uppercase, 1 lowercase, 1 special char.",
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 focus:outline-none text-slate-400 hover:text-brand-primary transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <FieldError className="text-red-500 text-xs mt-1 font-medium">
              {errors.password.message}
            </FieldError>
          )}
        </TextField>

        {/* Optional Avatar Field */}
        <TextField fullWidth isInvalid={!!errors.imageUrl}>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Avatar URL <span className="text-slate-400 font-normal">(Optional)</span>
          </Label>
          <Input
            type="url"
            placeholder="https://example.com/avatar.jpg"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            {...register("imageUrl", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL starting with http:// or https://",
              },
            })}
          />
          {errors.imageUrl && (
            <FieldError className="text-red-500 text-xs mt-1 font-medium">
              {errors.imageUrl.message}
            </FieldError>
          )}
        </TextField>

        {/* Phone Number Field */}
        <TextField fullWidth isInvalid={!!errors.phone}>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Phone Number <span className="text-brand-primary">*</span>
          </Label>
          <Input
            type="tel"
            maxLength={14}
            inputMode="numeric"
            placeholder="+8801XXXXXXXXX"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            {...register("phone", {
              required: "Phone number is required.",
              pattern: {
                value: /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
                message: "Please enter a valid Bangladeshi phone number.",
              },
            })}
          />
          {errors.phone && (
            <FieldError className="text-red-500 text-xs mt-1 font-medium">
              {errors.phone.message}
            </FieldError>
          )}
        </TextField>

        {/* Location Field */}
        <TextField fullWidth isInvalid={!!errors.location}>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Location <span className="text-brand-primary">*</span>
          </Label>
          <Input
            type="text"
            placeholder="e.g. Dhaka, Bangladesh"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            {...register("location", {
              required: "Location is required.",
              minLength: {
                value: 3,
                message: "Location must be at least 3 characters.",
              },
            })}
          />
          {errors.location && (
            <FieldError className="text-red-500 text-xs mt-1 font-medium">
              {errors.location.message}
            </FieldError>
          )}
        </TextField>

        {/* Global Root Error */}
        {errors.root && (
          <p className="text-red-600 text-sm font-medium text-center bg-red-50 py-2.5 rounded-xl mt-2 border border-red-100">
            {errors.root.message}
          </p>
        )}

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          isDisabled={isSubmitting}
          className="bg-brand-primary hover:bg-brand-primary/90 font-semibold text-white text-sm h-12 rounded-xl shadow-lg shadow-brand-primary/20 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-brand-primary hover:underline font-bold text-sm ml-1 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;