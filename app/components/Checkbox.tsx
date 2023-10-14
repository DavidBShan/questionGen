import React, { InputHTMLAttributes, useState } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setProPrompt: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, setProPrompt, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(false);
    setProPrompt(!isChecked); // Toggle the value and set it using setProPrompt
  };

  return (
    <label className="flex items-center space-x-2 text-center">
      <span className='text-2xl font-bold'>{label}</span>
      <input
        type="checkbox"
        className="form-checkbox w-6 h-6 bg-gray-800"
        checked={isChecked}
        onChange={handleClick}  
        {...props}
      />
    </label>
  );
};

export default Checkbox;
