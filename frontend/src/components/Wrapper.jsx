
import React from 'react';

const Wrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1250px] mx-auto flex flex-col items-center gap-10  lg:p-5">
      {children}
    </div>
  );
};

export default Wrapper;
