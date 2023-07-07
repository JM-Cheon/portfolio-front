import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/styles.module.scss";
import AuthContext from "context/authContext";

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { isSignIn, onSignOut } = useContext(AuthContext);

  const onLogoClick = () => {
    navigate("/");
  };
  const onProjectClick = () => {
    navigate("/project");
  };
  const onAboutClick = () => {
    navigate("/about");
  };
  const onResumeClick = () => {
    navigate("/resume");
  };
  const onAuthClick = () => {
    navigate("/signin");
  };
  const onMyClick = () => {
    navigate("/user/my");
  };
  const onSignOutClick = () => {
    onSignOut();
    navigate("/");
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__nav}>
          <button className={styles.header__logo} onClick={onLogoClick}>
            <p>J</p>
            ust_
            <p>M</p>e_
          </button>
          {/* tablet, mobile size header */}
          <button onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <div className={styles.toggle__close}></div>
            ) : (
              <div className={styles.toggle__bars}></div>
            )}
          </button>
          {/* desktop size header */}
          <ul>
            <li>
              <button onClick={onProjectClick}>PROJECT</button>
            </li>
            <li>
              <button onClick={onAboutClick}>ABOUT</button>
            </li>
            <li>
              <button onClick={onResumeClick}>RESUME</button>
            </li>
            {isSignIn ? (
              <>
                <li>
                  <button onClick={onMyClick}>MY</button>
                </li>
                <li>
                  <button onClick={onSignOutClick}>SIGN-OUT</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={onAuthClick}>SIGN-IN</button>
              </li>
            )}
          </ul>
        </div>
        {/* tablet, mobile size header toggle menu */}
        <div className={toggle ? styles.header__nav__menu : styles.hidden}>
          <ul className="flex w-full flex-col items-center">
            <li>
              <button onClick={onProjectClick}>PROJECT</button>
            </li>
            <li>
              <button onClick={onAboutClick}>ABOUT</button>
            </li>
            <li>
              <button onClick={onResumeClick}>RESUME</button>
            </li>
            {isSignIn ? (
              <>
                <li>
                  <button onClick={onMyClick}>MY</button>
                </li>
                <li>
                  <button onClick={onSignOutClick}>SIGN-OUT</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={onAuthClick}>SIGN-IN</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
