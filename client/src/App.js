import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./styles/style.css";
import "./App.css"
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Navbars from "./Components/Navbars";
import Profile from "./Pages/Profile";
import Order from "./Pages/Order";
import EditProfile from "./Pages/EditProfile";
import HomeAdmin from "./Pages/Admin/HomeAdmin";
import AddProduct from "./Pages/Admin/AddProduct";
import ProfileAdmin from "./Pages/Admin/ProfileAdmin";

import { CartContext } from "./Contexts/CartContext";
import EditAdmin from "./Pages/Admin/EditAdmin";
import { UserContext, UserContextProvider } from "./Contexts/userContext";
import { API, setAuthToken } from "./config/api";

// const PrivateRoute = () => {
//   const { isLogin, setIsLogin } = useContext(LoginContext);

//   return isLogin ? <Outlet /> : <Navigate to="/" />;
// };

function App() {
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);

  const [state, dispatch] = useContext(UserContext);

  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }

  //   if (state.isLogin == false && !isLoading) {
  //     navigate("/auth");
  //   } else {
  //     if (state.user.status == "Partner") {
  //       navigate("/transaction");
  //     } else if (state.user.status == "User") {
  //       navigate("/");
  //     }
  //   }
  // }, [state]);

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");
      console.log(response);

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();

  const [cartLength, setCartLength] = useState(0);

  return (
    <CartContext.Provider value={{ cartLength, setCartLength }}>
      <QueryClientProvider client={client}>
        <Router>
          <Navbars />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<PrivateRoute />}> */}
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/home-admin" element={<HomeAdmin />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/profile-admin" element={<ProfileAdmin />} />
            <Route path="/edit-admin" element={<EditAdmin />} />
            {/* </Route> */}
          </Routes>
        </Router>
      </QueryClientProvider>
    </CartContext.Provider>
  );
}

export default App;
