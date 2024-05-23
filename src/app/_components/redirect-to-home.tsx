"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export const RedirectToHome = () => {
  useEffect(() => {
    redirect("https://build.top");
  });
  return <></>;
};
