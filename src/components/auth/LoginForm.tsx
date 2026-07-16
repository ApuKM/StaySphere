"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Input,
  Button,
  Separator,
  Link,
  TextField,
  FieldError,
  Label,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/utils/auth-client";
import { LoginFormData } from "@/utils/types/AuthTypes";

const LoginForm = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { data: authData, error: authError } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password || "",
        });

      if (authError) {
        setError("root", {
          message: authError.message || "Failed to login. Please try again.",
        });
        return;
      }
      if (authData) {
        router.push(redirectUrl ?? "/");
        console.log("Login successful:", data);
      }
    } catch (err) {
      setError("root", { message: "Network error. Please try again later." });
    }
  };

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <>
      {/* Google Login Button - Light Theme */}
      <Button
        fullWidth
        className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 h-12 rounded-xl text-sm font-semibold transition-colors flex items-center shadow-sm"
        onPress={signInWithGoogle}
      >
        <FcGoogle className="text-xl" />
        Log in with Google
      </Button>

      {/* Separator */}
      <div className="flex items-center my-6 gap-4">
        <Separator className="flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold shrink-0">
          or
        </span>
        <Separator className="flex-1 bg-slate-200" />
      </div>

      {/* Main Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-full flex-col gap-4"
      >
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
              {errors?.email?.message}
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
              {errors?.password?.message}
            </FieldError>
          )}
        </TextField>

        {/* Root Error Message */}
        {errors.root && (
          <p className="text-red-600 text-sm font-medium text-center bg-red-50 py-2.5 rounded-xl mt-2 border border-red-100">
            {errors?.root?.message}
          </p>
        )}

        {/* Forgot Password Link */}
        <div className="flex justify-end w-full mt-1">
          <Link
            href="/auth/reset-password"
            className="text-xs text-slate-500 hover:text-brand-primary font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          className="bg-brand-primary hover:bg-brand-primary/90 font-semibold text-white text-sm h-12 rounded-xl shadow-lg shadow-brand-primary/20 transition-all mt-3"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-slate-500">
          Dont have an account?{" "}
          <Link
            href="/auth/register"
            className="text-brand-primary hover:underline font-bold text-sm ml-1 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
