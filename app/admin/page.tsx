"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashBoard from "@/components/admin/dashboard";
import { AdminContentProvider } from "@/contexts";
import { isAdmin } from "@/api/api_communications";

const AdminApp = () => {
  const router = useRouter();

  //check if user is admin
  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      // @ts-ignore
      JSON.parse(localStorage.getItem("auth")).user._id
    ) {
      //get admin verification
      isAdmin();
    } else {
      //redirect if not admin
      router.push("/signin");
    }
  }, [router]);
  return (
    <AdminContentProvider>
      <DashBoard />
    </AdminContentProvider>
  );
};

export default AdminApp;
