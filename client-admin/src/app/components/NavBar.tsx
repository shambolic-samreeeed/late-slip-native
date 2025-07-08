"use client";
import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div>
      <div>
        <div>Logo</div>
        <div>
          <Link href={"/lateslip"}>Late Slips</Link>
          <Link href={"/students"}>Students</Link>
          <Link href={"/login"}>Schedules</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
