import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    cookies: {
      session_token: {
        name: "app_session",
      },
    },
    defaultCookieAttributes: { sameSite: "None", secure: true, httpOnly: true },
    useSecureCookies: true,
  },
  session: {
    cookieCache: { enabled: true, maxAge: 10 * 60 },
  },

  trustedOrigins: [process.env.CLIENT_URL as string],
});
