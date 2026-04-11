"use client";

import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  label: string;
  pendingLabel: string;
  variant?: "primary" | "secondary" | "danger";
};

const variantClasses = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-slate-300 text-slate-700 hover:border-brand hover:text-brand",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export function FormSubmitButton({
  label,
  pendingLabel,
  variant = "primary"
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${variantClasses[variant]}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
