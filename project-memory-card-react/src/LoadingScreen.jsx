import React from 'react';
import './LoadingScreen.css'

const LoadingScreen = ({percentage}) => {
  return (
    <div className="loading-screen">
      <p>Loading... {percentage}%</p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;