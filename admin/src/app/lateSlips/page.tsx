// app/lateSlips/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireAuth } from "../utils/checkLogin";

export default async function LateSlipsPage() {
  const token = requireAuth();

  return <main className="p-8">LateSlips</main>;
}
