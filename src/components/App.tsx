import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "@styles/styles.module.scss";

const App = () => {
  return (
    <>
      <div id={styles.stars}></div>
      <div id={styles.stars2}></div>
      <div id={styles.stars3}></div>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
