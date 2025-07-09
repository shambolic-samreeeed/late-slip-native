import React from "react";
import { requireAuth } from "../utils/checkLogin";

const page = () => {
  const token = requireAuth();
};

export default page;
