import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export function requireAuth() {
  const token = cookies().get("token");
  if (!token) {
    redirect("/login");
  }
  return token;
}
