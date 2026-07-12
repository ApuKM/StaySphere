"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Separator,
  TextField,
  Input,
  Description,
  Radio,
  RadioGroup,
  Label,
  Button,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // ডামি সাবমিট ফাংশন (UI টেস্টের জন্য)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register Form Submitted (UI Only)");
  };

  return (
    <>
      {/* OAuth Button */}
      <Button
        fullWidth
        className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 h-12 rounded-xl text-sm font-semibold transition-colors flex items-center shadow-sm"
        onPress={() => console.log("Google Sign Up Clicked")}
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
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        
        {/* Username Field */}
        <TextField fullWidth>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Username <span className="text-brand-primary">*</span>
          </Label>
          <Input
            name="username"
            placeholder="john_doe"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            required
          />
          <Description className="text-slate-500 text-xs mt-1 font-medium">
            Choose a unique username for your profile.
          </Description>
        </TextField>

        {/* Email Field */}
        <TextField fullWidth>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Email <span className="text-brand-primary">*</span>
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="user@example.com"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            required
          />
        </TextField>

        {/* Password Field */}
        <TextField fullWidth>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Password <span className="text-brand-primary">*</span>
          </Label>
          <div className="relative flex w-full items-center">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pr-10 bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
              required
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
        </TextField>

        {/* Optional Avatar Field */}
        <TextField fullWidth>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Avatar URL <span className="text-slate-400 font-normal">(Optional)</span>
          </Label>
          <Input
            type="url"
            name="imageUrl"
            placeholder="https://example.com/avatar.jpg"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
          />
        </TextField>

        {/* Phone Number Field */}
        <TextField fullWidth>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Phone Number <span className="text-brand-primary">*</span>
          </Label>
          <Input
            name="phone"
            type="tel"
            maxLength={14}
            inputMode="numeric"
            placeholder="+8801XXXXXXXXX"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            required
          />
        </TextField>

        {/* Location Field */}
        <TextField fullWidth>
          <Label className="text-slate-700 font-medium text-sm mb-1 block">
            Location <span className="text-brand-primary">*</span>
          </Label>
          <Input
            name="location"
            type="text"
            placeholder="e.g. Dhaka, Bangladesh"
            className="w-full bg-white border border-slate-200 text-slate-800 focus:border-brand-primary rounded-xl"
            required
          />
        </TextField>

        {/* Role Selection (Guest vs Host) */}
        <div className="flex flex-col gap-3 mt-1">
          <Label className="text-slate-700 font-medium text-sm">
            What are you looking to do?
          </Label>
          <RadioGroup
            name="role"
            orientation="horizontal"
            defaultValue="guest"
            className="flex gap-4"
          >
            <Radio value="guest">
              <Radio.Content className="text-slate-700 font-medium">
                <Radio.Control>
                  <Radio.Indicator>
                    <span>✓</span>
                  </Radio.Indicator>
                </Radio.Control>
                Guest (Book places)
              </Radio.Content>
            </Radio>
            <Radio value="host">
              <Radio.Content className="text-slate-700 font-medium">
                <Radio.Control>
                  <Radio.Indicator>
                    <span>✓</span>
                  </Radio.Indicator>
                </Radio.Control>
                Host (List property)
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          className="bg-brand-primary hover:bg-brand-primary/90 font-semibold text-white text-sm h-12 rounded-xl shadow-lg shadow-brand-primary/20 transition-all mt-4"
        >
          Create Account
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