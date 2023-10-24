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
        className={`flex flex-col items-center gap-2 p-2 py-10  ${isFilesSelected ? 'rounded-t-3xl' : 'rounded-3xl'} cursor-pointer hover:bg-gray-100`}
      >
        <AiOutlineFilePdf 
        className="h-16 w-16 md:h-28 md:w-28"        
        />

        <div className="block text-center text-base font-semibold md:text-2xl">Create questions from your study material!</div>
                <div className="text-center text-sm text-black md:text-lg">Accepted formats: PDF</div>
        
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
            <div className="overflow-hidden text-ellipsis rounded-b-3xl p-4">
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
