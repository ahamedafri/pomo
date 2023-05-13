import React from 'react';
import '../pomodoro.css'; // import your custom CSS file

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">My Awesome React App</h1>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item"><a href="/">Home</a></li>
          <li className="header__item"><a href="/about">About</a></li>
          <li className="header__item"><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Copyright © 2023</p>
    </footer>
  );
}

export { Header, Footer };
