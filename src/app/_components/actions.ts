"use server";

import { signOut } from "~/lib/auth";

export const handleLogout = async () => {
  await signOut({ redirectTo: "/sign-in" });
};
