"use client";
import React from "react";

// Ensure you export as default if you import it as default:
export default function PhoneInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}
