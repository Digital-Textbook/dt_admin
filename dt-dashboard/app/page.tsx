import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/// Pages ///
import Signup from "./auth/signup/page";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Signup />
    </>
  );
}
