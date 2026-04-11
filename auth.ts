import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { safeCompare, verifyPassword } from "@/lib/password";

function isAuthorizedAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !safeCompare(email.toLowerCase(), adminEmail.toLowerCase())) {
    return false;
  }

  if (!passwordHash) {
    return false;
  }

  return verifyPassword(password, passwordHash);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      authorize(credentials) {
        const email = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        if (!isAuthorizedAdmin(email, password)) {
          return null;
        }

        return {
          id: "admin-user",
          email,
          name: "Admin"
        };
      }
    })
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginRoute = nextUrl.pathname.startsWith("/admin/login");
      const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
      const currentEmail = auth?.user?.email?.toLowerCase();
      const isAllowedAdmin = Boolean(adminEmail && currentEmail && currentEmail === adminEmail);

      if (!isAdminRoute) {
        return true;
      }

      if (isLoginRoute) {
        return true;
      }

      return isAllowedAdmin;
    }
  }
});
