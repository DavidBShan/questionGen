// import React, { useRef, useState } from "react";
// import { AiOutlineFilePdf } from 'react-icons/ai';

// interface FileInputProps {
//     setFile: any;
// }

// const CustomFileInput = ({setFile}:any) => {
//   const ref = useRef<HTMLInputElement>(null);
//   // 1. add state for tracking the selected files
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

//   // 2. pass the click event to the hidden input element to trigger the file selection.
//   const handleClick = () => {
//     ref.current?.click();
//   };

//   // 3. convert FileList to File[]
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log("handled change!")
//     const files = Array.from(e.currentTarget.files ?? []);
//     setSelectedFiles(files);
//     setFile(files[0])
//   };

//   const isFilesSelected = selectedFiles.length > 0;
//   return (
//     <div>
//       <div
//         // 4. add onClick handler
//         onClick={handleClick}
//         className={`p-4 flex flex-col items-center gap-2 bg-aceflow-blue-bg text-aceflow-blue ${isFilesSelected ? 'rounded-t-3xl' : 'rounded-3xl'} hover:bg-blue-200 cursor-pointer`}
//         // className="p-4 flex flex-col items-center gap-2 bg-aceflow-blue-bg text-aceflow-blue rounded-t-3xl hover:bg-blue-200 cursor-pointer"
//       >
//         <AiOutlineFilePdf size={100}/>

//         <div className="block text-lg font-semibold text-center">Create questions from your study material!</div>
//                 <div className="text-center text-sm text-black">Accepted formats: PDF</div>
        
//                 <input
//                 type="file"
//                 name="pdf"
//                 ref={ref}
//                 accept=".pdf"
//                 multiple
//                 className="hidden"
//                 onChange={handleChange}
//                 />
//                 {/* <input
//                     type="file"
//                     ref={ref}
//                     className="hidden"
//                     // 5. add onChange handler
                    
//                 /> */}
//       </div>
//       {/* 6. display selected files */}
//         {!!selectedFiles.length && (
//             <div className="p-4 bg-aceflow-blue-bg overflow-hidden rounded-b-3xl text-ellipsis">
//             <p className="font-bold">Selected Files:</p>
//             {selectedFiles.map((file, i) => {
//                 return (
//                 <div key={i} className="text-aceflow-blue whitespace-nowrap">
//                     {file.name}                 
//                 </div>
//                 );
//             })}
//             </div>
//         )}
//     </div>
//   );
// };

// export default CustomFileInput;

import React, { useRef, useState } from "react";
import { AiOutlineFilePdf } from 'react-icons/ai';

interface FileInputProps {
    setFile: any;
}

const CustomFileInput = ({setFile}:any) => {
  const ref = useRef<HTMLInputElement>(null);
  // 1. add state for tracking the selected files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // 2. pass the click event to the hidden input element to trigger the file selection.
  const handleClick = () => {
    ref.current?.click();
  };

  // 3. convert FileList to File[]
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
        // 4. add onClick handler
        onClick={handleClick}
        className={`p-4 flex flex-col items-center gap-2  ${isFilesSelected ? 'rounded-t-3xl' : 'rounded-3xl'} hover:bg-gray-100 cursor-pointer`}
        // className="p-4 flex flex-col items-center gap-2 bg-aceflow-blue-bg text-aceflow-blue rounded-t-3xl hover:bg-blue-200 cursor-pointer"
      >
        <AiOutlineFilePdf size={100}/>

        <div className="block text-lg font-semibold text-center">Create questions from your study material!</div>
                <div className="text-center text-sm text-black">Accepted formats: PDF</div>
        
                <input
                type="file"
                name="pdf"
                ref={ref}
                accept=".pdf"
                multiple
                className="hidden"
                onChange={handleChange}
                />
                {/* <input
                    type="file"
                    ref={ref}
                    className="hidden"
                    // 5. add onChange handler
                    
                /> */}
      </div>
      {/* 6. display selected files */}
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
