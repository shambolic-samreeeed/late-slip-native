"use client";

import { getAllLateSlips } from "@/services/lateSlipService";
import React, { useEffect, useState } from "react";

interface LateSlip {
  id: string;
  student_id: string;
  reason: string;
  status: string;
  created_at: string;
  updated_at: string;
  request_id: string;
}

const Page = () => {
  const [lateSlips, setLateSlips] = useState<LateSlip[]>([]);

  useEffect(() => {
    const fetchLateSlips = async () => {
      try {
        const response = await getAllLateSlips();
        if (response?.success && response?.lateSlips) {
          setLateSlips(response.lateSlips);
          console.log(response.Lateslips);
        } else {
          console.log("Failed to fetch the slips");
        }
      } catch (err: any) {
        console.log("Error fetching slips:", err.message || err);
      }
    };
    fetchLateSlips();
  }, []);

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
                <strong>Status:</strong> {item.status}
              </p>
              <p className="text-sm text-gray-500">
                Requested on: {new Date(item.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
