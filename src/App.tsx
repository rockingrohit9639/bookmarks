import React, { useCallback, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Singup from "./Pages/Signup/Singup";
import Home from "./Pages/Home/Home";
import AddNewBookmark from "./Pages/AddNewBookmark/AddNewBookmark";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthContext } from "./hooks/useAuthentication";
import { server } from "./axios/instance";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Logout from "./Pages/Logout/Logout";

const queryClient = new QueryClient();

function App() {
  const { setAuthenticated, setUserContent } = useAuthContext();

  const [token] = useLocalStorage("token", "");
  const getUserContent = useCallback(async () => {
    const res = await server.get("/users/profile");
    const userData = {
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
    };
    setUserContent(userData);
  }, [setUserContent]);

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
      server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUserContent();
    } else {
      setAuthenticated(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/add-new-bookmark" element={<AddNewBookmark />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
