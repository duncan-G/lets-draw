import React from 'react';
import './LetsDraw.css';
import logo from './logo.svg';

export default function LetsDraw(props) {
  return (
    <header className="Homepage-header">
      <img src={logo} className="Homepage-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="Homepage-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}
