"use client";
import DashBoard from "./dashboard";

export default function DashboardLayout({ children }) {
  return <DashBoard>{children}</DashBoard>; // ✅ Wrap only specific pages in Dashboard
}
