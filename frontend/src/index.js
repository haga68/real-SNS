import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./state/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
// public/index.htmlのid="root"のdivタグの中の要素を取り出してrootに格納

// 各componentの内容が、divタグの中に格納されていく
root.render(
  //  <React.StrictMode>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  //  </React.StrictMode>
);
