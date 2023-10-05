import React, { ChangeEventHandler } from 'react';

interface TextAreaProps{
    required?: boolean;
    placeholder?: string;
    resize?:boolean;
    insideContent?: any;
    classNamePassedDown?:any;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>; // Use the correct type here
    value?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    required,
    placeholder,
    resize=false,
    insideContent,
    classNamePassedDown,
    onChange,
    value
}) => {

    const baseClassNames = `
    w-full 
    rounded-3xl
    
    ${resize ? "resize-y" : "resize-none"}
    `;

    const combinedClassNames = classNamePassedDown ? `${baseClassNames} ${classNamePassedDown}` : baseClassNames;

    
    return ( 
        <textarea
        required = {required}
        placeholder = {placeholder}
        className= {combinedClassNames}
        onChange={onChange}
        value={value}
        >
            {insideContent}
        </textarea>
     );
}
 
export default TextArea;