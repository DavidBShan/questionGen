import React from 'react';

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white">
        <nav className="flex items-center justify-between p-6 px-6 md:px-24 border-y-4 border-blue-200">
        <div className='opacity-0 absolute md:opacity-100 md:relative'>
            <span className="text=sm md:text-lg">Practice Questions</span>
        </div>

        <div className="text-2xl md:text-4xl font-black">
            <span>Aceflow</span>
        </div>

        <div>
            <button className="w-full bg-aceflow-blue font-medium text=sm md:text-lg text-white px-3 md:px-5 py-3 rounded-xl hover:bg-blue-600">
            Try Aceflow Pro+
            </button>
        </div>
        </nav>
    </div>
  );
};

export default Navbar;
