import React from 'react';

const CustomLoading = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full overflow-hidden" 
    >
      <div 
        className='text-center text-white'
      > Please Wait!</div>
    
    </div>
  );
};

export default CustomLoading;