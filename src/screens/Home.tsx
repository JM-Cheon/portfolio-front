import React, { useEffect, useState } from "react";
import styles from "styles/styles.module.scss";
import coin from "assets/coin.png";

const Home = () => {
  const textString = "Hello, \nI'm Jinmin Cheon";
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText(text + textString[count]);
      setCount(count + 1);
    }, 100);
    if (count === textString.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.home}>
      <div className={styles.home__intro}>
        <p>{text}</p>
        <span>Backend developer (with Spring Boot, NestJS)</span>
        <div className={styles.home__intro__btn}>
          <button>resume</button>
          <button>github</button>
        </div>
      </div>
      <div className={styles.home__animation}>
        <img src={coin} alt="coin" />
      </div>
    </div>
  );
};

export default Home;
