"use client";

import React from "react";

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between bg-[#3C3C3C] px-5">
      <div className="w-[90px] h-[40px]">
        <img
          src="/assets/footer-logo.png"
          alt="Herald Sync Logo"
          width={90}
          height={40}
          style={{ objectFit: "contain" }}
        />
      </div>
      <h1 className="text-[20px] font-bold text-[#75BF43] m-0">Herald Sync</h1>
    </header>
  );
};

export default Header;
