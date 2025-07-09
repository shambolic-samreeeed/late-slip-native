"use client";

import React, { useEffect, useState } from "react";
import {
  approveLateSlip,
  getLateSlips,
  LateSlip,
} from "../services/lateslipService";

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
          const formatted = response.lateSlips.map((slip: any) => ({
            ...slip,
            formattedCreatedAt: new Date(slip.created_at).toLocaleString(),
          }));
          setLateSlips(formatted);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchLateSlips();
  }, []);

  const handleApprove = async (slip: LateSlipWithFormattedDate) => {
    try {
      const result = await approveLateSlip(slip.id, slip.student_id);
      if (result.success) {
        setLateSlips((prev) =>
          prev.map((s) => (s.id === slip.id ? { ...s, status: "approved" } : s))
        );
        alert("Late slip approved successfully!");
      } else {
        alert("Failed to approve late slip.");
      }
    } catch (err) {
      console.error(err);
      alert("Error approving late slip.");
    }
  };

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
              <td className="border px-4 py-2 flex gap-2">
                <Link href={`/lateslip/${slip.id}`}></Link>
                {slip.status !== "approved" && (
                  <button
                    className="bg-green-600 py-1 px-4 text-white"
                    onClick={() => handleApprove(slip)}
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
