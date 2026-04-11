"use client";

import { useActionState } from "react";
import { authenticateAdminAction } from "@/app/admin/login/actions";
import { LoginSubmitButton } from "@/components/admin/login-submit-button";

type LoginFormProps = {
  initialError?: string;
};

type LoginFormState = {
  error?: string;
};

const initialState: LoginFormState = {};

export function LoginForm({ initialError }: LoginFormProps) {
  const [state, formAction] = useActionState(authenticateAdminAction, initialState);
  const error = state.error ?? initialError;

  return (
    <form action={formAction} className="mt-8 grid gap-4">
      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <input
        type="email"
        name="email"
        placeholder="Admin e-posta"
        required
        className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand"
      />
      <input
        type="password"
        name="password"
        placeholder="Sifre"
        required
        className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand"
      />
      <LoginSubmitButton />
    </form>
  );
}
