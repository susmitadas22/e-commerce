import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
  adapter: PrismaAdapter(prisma),
});
