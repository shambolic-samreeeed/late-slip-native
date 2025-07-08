"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <div>
      <div className="flex flex-row justify-between bg-[#3C3C3C] py-3 px-10">
        <div>
          <Image src={"/footer-logo.png"} alt="logo" height={10} width={100} />
        </div>
        <div className=" flex gap-10 items-center ">
          <Link href={"/lateslip"} className="no-underline text-white">
            Late Slips
          </Link>
          <Link href={"/students"} className="no-underline text-white">
            Students
          </Link>
          <Link href={"/login"} className="no-underline text-white">
            Schedules
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
