"use client"

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const AuthContext = createContext();
const AdminContentContext = createContext();
const MenuContext = createContext();
const PostsContext = createContext();
const BasicContentContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      const authDetails = JSON.parse(localStorage.getItem("auth"));
      if (!auth.token) setAuth(authDetails);
      axios.defaults.headers.common["Authorization"] = `Bearer ${authDetails.token}`;
    }
  }, [auth]);
  
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    // axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;

  axios.interceptors.response.use(
    function (response) {
      //perform a function before request is sent
      return response;
    },
    function (error) {
      //do something when an error happens after request is sent
      const res = error.response;
      if (res?.status === 401 && res?.config && !res?.config.__isRetryRequest) {
        setAuth({
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        router.push("/signin");
      }
      return error;
    }
  );

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const AdminContentProvider = ({ children }) => {
  const [content, setContent] = useState("");

  return (
    <AdminContentContext.Provider value={[content, setContent]}>
      {children}
    </AdminContentContext.Provider>
  );
};

const BasicContentProvider = ({children}) => {
  const [basics, setBasics] = useState({});

  return (<BasicContentContext.Provider value={[basics, setBasics]}>{children}</BasicContentContext.Provider>)
}
const MenuProvider = ({children}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return(
    <MenuContext.Provider value={[menuOpen, setMenuOpen]}>
      {children}
    </MenuContext.Provider>
  )
}

const PostsProvider = ({children}) => {
  const [allPosts, setAllPosts] = useState([]);

    return (
      <PostsContext.Provider value={[allPosts, setAllPosts]}>{children}</PostsContext.Provider>
    )
}

export { AuthContext, AuthProvider, AdminContentContext, AdminContentProvider, MenuContext, MenuProvider, PostsContext, PostsProvider, BasicContentContext, BasicContentProvider };
