"use client";

import { getAllLateSlips, approveLateSlip } from "@/services/lateSlipService";
import React, { useEffect, useState } from "react";

const Page = () => {
  interface LateSlip {
    id: string;
    student_id: string;
    reason: string;
    status: string;
    created_at: string;
    updated_at: string;
    request_id: string;
  }

  const [lateSlips, setLateSlips] = useState<LateSlip[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const fetchLateSlips = async () => {
    try {
      const slips = await getAllLateSlips();
      setLateSlips(slips);
    } catch (err) {
      console.error("Error fetching slips", err);
    }
  };

  useEffect(() => {
    fetchLateSlips();
  }, []);

  const handleApprove = async (slip: LateSlip) => {
    try {
      setLoading(slip.id); 
      const res = await approveLateSlip(slip.id, slip.student_id);
      console.log("Approved:", res.message);
      await fetchLateSlips(); 
    } catch (err) {
      console.error("Approval failed", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Late Slips</h1>

      {lateSlips.length === 0 ? (
        <p className="text-gray-600">No late slips found.</p>
      ) : (
        <ul className="space-y-3">
          {lateSlips.map((item) => (
            <li
              key={item.id}
              className="border rounded p-4 shadow-sm bg-white hover:bg-gray-50"
            >
              <p>
                <strong>Reason:</strong> {item.reason}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    item.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Requested on: {new Date(item.created_at).toLocaleDateString()}
              </p>

              {item.status === "pending" && (
                <button
                  onClick={() => handleApprove(item)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={loading === item.id}
                >
                  {loading === item.id ? "Approving..." : "Approve"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
