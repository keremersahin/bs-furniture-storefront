"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

type AuthenticationState = {
  error?: string;
};

export async function authenticateAdminAction(
  _previousState: AuthenticationState,
  formData: FormData
) {
  if (!process.env.ADMIN_PASSWORD_HASH) {
    return {
      error: "Admin girisi icin ADMIN_PASSWORD_HASH tanimlanmalidir."
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin/products"
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Girdigin bilgilerle giris yapilamadi."
          };
        default:
          return {
            error: "Giris sirasinda bir hata olustu."
          };
      }
    }

    throw error;
  }

  return {};
}

export async function signOutAdminAction() {
  await signOut({
    redirectTo: "/admin/login"
  });
}
