import Sidebar from '@/components/Sidebar';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        {children}
      </div>
    </div>
  );
};

export default Layout;

