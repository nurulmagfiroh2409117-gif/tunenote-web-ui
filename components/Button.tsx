import React from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function Button({ label, variant = "primary", onClick }: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded-lg font-bold text-sm transition duration-150";
  const variants = {
    primary: "bg-indigo-900 hover:bg-indigo-950 text-white shadow-sm",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {label}
    </button>
  );
}