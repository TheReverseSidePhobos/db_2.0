import React, { useState } from 'react';
import styles from './Burger.module.scss';
import Link from 'next/link';

const Burger = () => {
  const [burger, setBurger] = useState(false);

  const handleBurger = () => {
    setBurger(!burger);
  };

  return (
    <>
      <div onClick={handleBurger} className={styles.burger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {burger && (
        <div className={styles.menu}>
          <div className={styles.menu_item}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div className={styles.menu_item}>
            <Link href="/aboutUs">
              <a>About us</a>
            </Link>
          </div>
          <div className={styles.menu_item}>
            <Link href="/signup">
              <a>Register</a>
            </Link>
          </div>
          <div className={styles.menu_item}>
            <Link href="/signin">
              <a>Login</a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Burger;
