import React, { useRef, useState } from "react";
import { AiOutlineFilePdf } from 'react-icons/ai';

interface FileInputProps {
    setFile: any;
}

const CustomFileInput = ({setFile}:any) => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handled change!")
    const files = Array.from(e.currentTarget.files ?? []);
    setSelectedFiles(files);
    setFile(files[0])
  };

  const isFilesSelected = selectedFiles.length > 0;
  return (
    <div>
      <div
        onClick={handleClick}
        className={`p-4 flex flex-col items-center gap-2 py-10  ${isFilesSelected ? 'rounded-t-3xl' : 'rounded-3xl'} hover:bg-gray-100 cursor-pointer`}
      >
        <AiOutlineFilePdf 
        className="h-16 w-16 md:h-28 md:w-28 lg:h-32 lg:w-32"        
        />

        <div className="block text-md md:text-2xl font-semibold text-center">Create questions from your study material!</div>
                <div className="text-center text-sm md:text-lg text-black">Accepted formats: PDF</div>
        
                <input
                type="file"
                name="pdf"
                ref={ref}
                accept=".pdf"
                multiple
                className="hidden"
                onChange={handleChange}
                />
      </div>
        {!!selectedFiles.length && (
            <div className="p-4 overflow-hidden rounded-b-3xl text-ellipsis">
            <p className="font-bold">Selected Files:</p>
            {selectedFiles.map((file, i) => {
                return (
                <div key={i} className="whitespace-nowrap">
                    {file.name}                 
                </div>
                );
            })}
            </div>
        )}
    </div>
  );
};

export default CustomFileInput;
