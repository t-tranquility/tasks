/* Importing necessary React hooks */
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Content from './Content';
import Favourite from './Favourite';

import AppContext from '../context';


function Header(props) {
  /* Destructuring cartItems from the context using useContext */
  const { cartItems } = React.useContext(AppContext);

  /* Calculating the total price of items in the cart using reduce */
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  
  return (
    <>
      <header>
        <div className="headerLeft">
          <Link to="/">
            <img width={40} height={40} src="/img/logo.png" alt="logo" />
          </Link>
          <div className="headerInfo">
            <h3>CONTRACT</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>

        <ul className="headerRight">

          <li>
            <img
              onClick={props.onClickCart}
              width={18}
              height={18}
              src="/img/bak.svg"
              alt="cart"
            />
            <span>{totalPrice} руб.</span>
          </li>

          <li>
            <Link to="/favourite">
              <img width={18} height={18} src="/img/like.svg" alt="favorites" />
            </Link>
            <span>Избранное</span>
          </li>

          <li>
            <img width={18} height={18} src="/img/profile.svg" alt="profile" />
            <span>Профиль</span>
          </li>
        </ul>
      </header>

      {/* Routing section for different views: Content and Favourite */}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </>
  );
}

export default Header;
