"use client";
import { getAllLateSlips } from "@/services/lateSlipService";
import React, { useEffect, useState } from "react";

const page = () => {
  const [lateSlips, setLateSlips] = useState([]);

  useEffect(() => {
    const fetchLateSlips = async () => {
      try {
        const response = await getAllLateSlips();
        if (response.success) {
          setLateSlips(response.lateSlips || []);
          console.log(lateSlips);
        } else {
          console.log("failed to fetch");
        }
      } catch (err) {
        console.log("error fetching slips", err);
      }
    };
    fetchLateSlips();
  }, []);
  return <div></div>;
};

export default page;
