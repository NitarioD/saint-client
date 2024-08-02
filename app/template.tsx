"use client";
import { AuthProvider } from "@/contexts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <NavBar />

        {children}

        <Footer />
      </AuthProvider>
    </div>
  );
}
