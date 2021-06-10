import React from 'react';
import { Link } from 'react-router-dom';
const AuthWrapper = ({ children }) => {
  return (
    <div className="AuthWrapper">
      <div className="side" style={{ background: '#2E7B8C' }}></div>
      <div className="auth">
        <div className="back">
          <Link to="/">{'< '}Back</Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
