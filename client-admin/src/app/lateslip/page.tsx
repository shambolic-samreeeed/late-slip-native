"use client";

import React, { useEffect, useState } from "react";
import { getLateSlips, LateSlip } from "../services/lateslipService";
import NavBar from "../components/NavBar";
import Link from "next/link";

interface LateSlipWithFormattedDate extends LateSlip {
  formattedCreatedAt: string;
}

const Page = () => {
  const [lateSlips, setLateSlips] = useState<LateSlipWithFormattedDate[]>([]);

  useEffect(() => {
    const fetchLateSlips = async () => {
      try {
        const response = await getLateSlips();
        if (!response || !Array.isArray(response.lateSlips)) {
          setLateSlips([]);
        } else {
          // ✅ Format date on client side only
          const formatted = response.lateSlips.map((slip: any) => ({
            ...slip,
            formattedCreatedAt: new Date(slip.created_at).toLocaleString(),
          }));
          setLateSlips(formatted);
          console.log(formatted);
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchLateSlips();
  }, []);

  return (
    <div>
      <NavBar />

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Reason</th>
            <th className="border px-4 py-2 text-left">Student ID</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Created At</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lateSlips.map((slip) => (
            <tr key={slip.id}>
              <td className="border px-4 py-2">{slip.reason}</td>
              <td className="border px-4 py-2">{slip.student_id}</td>
              <td className="border px-4 py-2">{slip.status}</td>
              <td className="border px-4 py-2">{slip.formattedCreatedAt}</td>
              <td className="border px-4 py-2">
                <Link href={`/lateslip/${slip.id}`}>
                  <button className="bg-blue-500 py-1 px-4 text-white">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
