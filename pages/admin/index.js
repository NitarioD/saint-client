import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import DashBoard from "../../components/admin/dashboard";
import { AdminContentProvider } from "../../contexts";

const AdminApp = () => {
  const router = useRouter();

  //check if user is admin
  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).user._id
    ) {
      //get admin verification
      const isAdmin = async () => {
        const { data } = await axios.get("/is_admin");
      };
      isAdmin();
    } else {
      router.push("/signin");
    }
  }, []);
  return (
    <AdminContentProvider>
      <DashBoard />
    </AdminContentProvider>
  );
};

export default AdminApp;
