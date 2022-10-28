import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContext, UserContextProvider } from "./Contexts/userContext";

// const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <UserContext> */}
    {/* <QueryClientProvider client={client}> */}
    <UserContextProvider>
      <App />
      {/* </QueryClientProvider> */}
      {/* </UserContext> */}
      {/* </BrowserRouter> */}
    </UserContextProvider>
  </React.StrictMode>
);
