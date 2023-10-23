import React from 'react';

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white">
        <nav className="flex items-center justify-between border-y-4 border-blue-200 p-6 md:px-24">
        <div className='absolute opacity-0 md:relative md:opacity-100'>
            <span className="text-sm md:text-lg">Practice Questions</span>
        </div>

        <div className="text-2xl font-black md:text-4xl">
            <span>Aceflow</span>
        </div>
        </nav>
    </div>
  );
};

export default Navbar;
