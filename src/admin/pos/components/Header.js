import React from 'react';

export default function Header(props) {
  return (
    <header >
      <div>
        <a href="#">
          <h1>point of sale system</h1>
        </a>
      </div>
      <div>
        <a href="#/cart">
          Cart{' '}
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ''
          )}
        </a>{' '}
      </div>
    </header>
  );
}
