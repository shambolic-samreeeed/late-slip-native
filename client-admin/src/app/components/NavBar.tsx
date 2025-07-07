"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex justify-between items-center bg-[#3C3C3C] text-white p-2">
      <div>Admin Panel</div>
      <div className="flex items-center">
        <ul className="flex gap-4 items-center">
          <li>Late Slips</li>
          <li>Students</li>
          <li>Schedules</li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
