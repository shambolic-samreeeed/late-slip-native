"use client";

import React, { useEffect, useState } from "react";
import { getLateSlips, LateSlip } from "../services/lateslipService";
import NavBar from "../components/NavBar";

const Page = () => {
  const [lateSlips, setLateSlips] = useState<LateSlip[]>([]);

  useEffect(() => {
    const fetchLateSlips = async () => {
      try {
        const response = await getLateSlips();
        setLateSlips(response.lateSlips);
        console.log(response);
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
              <td className="border px-4 py-2">
                {new Date(slip.created_at).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 py-1 px-4 text-white">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
