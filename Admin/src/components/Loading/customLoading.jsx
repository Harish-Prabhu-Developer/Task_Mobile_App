import React from 'react';

const CustomLoading = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-10 bg-black" 
    >
      <div 
        className='text-center text-white'
      > Please Wait!</div>
    
    </div>
  );
};

export default CustomLoading;