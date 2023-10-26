import React, { InputHTMLAttributes, useState } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setProPrompt: (value: boolean) => void;
  membership: string;
}

export let timeQuiz = false;

const Checkbox: React.FC<CheckboxProps> = ({ label, setProPrompt, membership,...props }) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {

    if(membership!== "free") {
      setIsChecked(false);
      setProPrompt(!isChecked); // Toggle the value and set it using setProPrompt
      return;
    }

    timeQuiz = !isChecked;
    setIsChecked(timeQuiz);
  };

  return (
    <label className="flex items-center space-x-2 text-center">
      <span className='text-2xl font-bold'>{label}</span>
      <input
        type="checkbox"
        className="h-6 w-6 bg-gray-800"
        checked={isChecked}
        onChange={handleClick}  
        {...props}
      />
    </label>
  );
};

export default Checkbox;
