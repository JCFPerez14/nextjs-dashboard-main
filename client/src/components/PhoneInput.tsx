"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps extends React.ComponentPropsWithoutRef<"input"> {}

const PhoneInput = (props: PhoneInputProps) => {
  const [warning, setWarning] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // List of keys that we allow (navigation and editing keys)
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
      "Home",
      "End",
      "ENTER",
      "-"
    ];

    // Allow allowed keys without checking
    if (allowedKeys.includes(e.key)) {
      setWarning("");
      return;
    }

    // If the key pressed is not a digit (0-9) then prevent it and show warning.
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      setWarning("Only numbers are allowed");
    } else {
      setWarning("");
    }
  };

  return (
    <div>
      <Input {...props} onKeyDown={handleKeyDown} />
      {warning && <p style={{ color: "red", fontSize: "0.875rem" }}>{warning}</p>}
    </div>
  );
};

export default PhoneInput;
