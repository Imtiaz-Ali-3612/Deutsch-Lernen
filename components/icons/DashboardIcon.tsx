import React from 'react';

const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M13 3V9H21V3H13ZM3 21H11V15H3V21ZM3 13H11V3H3V13ZM13 21H21V11H13V21Z" />
  </svg>
);

export default DashboardIcon;
