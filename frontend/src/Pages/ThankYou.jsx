import React from 'react';
import { Link } from 'react-router-dom';

export const ThankYou = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Thank You for Completing the Interview!</h1>
      <p>We appreciate your time and effort.</p>
      <Link to="/">
        <button style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
};
