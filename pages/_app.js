import { AuthProvider } from "../contexts";
import TopNav from "../components/topNav";
import Footer from "../components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../public/css/styles.css";
import "../public/css/tiptap.scss";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <TopNav />
      <div className="body">
        <Component {...pageProps} />
      </div>
      <Footer />
    </AuthProvider>
  );
}
