"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ImageCropper from "./image-cropper/ImageCropper";
import NextImage from "next/image";

const ImageUploadForm = () => {
	const [file, setFile] = useState<string | ArrayBuffer | null>(null);
	const [croppedImage, setCroppedImage] = useState("");
	const [isReady, setIsReady] = useState(false);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

	const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
      
        if (selectedFile) {
          const reader = new FileReader();
      
          reader.onload = () => {
            const dataUrl = reader.result as string;
            setFile(dataUrl);
            setIsReady(true);
      
            // Get image dimensions
            const img = new Image();
            img.onload = () => {
              setImageDimensions({ width: img.width, height: img.height });
            };
            img.src = dataUrl;
          };
      
          reader.readAsDataURL(selectedFile);
        } else {
          setFile(null);
          setIsReady(false);
          setImageDimensions(null);
        }
      };

	return (
		<>
			<div className='relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center'>
				<div className='absolute inset-0 z-0'></div>
				<div className='w-full p-10 bg-white rounded-xl z-10'>
					<div className='text-center'>
						<p className='mt-2 text-sm text-gray-400'>
							Upload files for webpage
						</p>
					</div>
					<form className='mt-8 space-y-3' onSubmit={() => {}}>
						<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
							<div className='text-center flex flex-col items-center'>
								<Icon icon='logos:imagemin' width={100} height={100} />
								<div className='mt-4 flex text-sm leading-6 text-gray-600'>
									<label
										htmlFor='image'
										className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
										<span>Upload a file</span>
										<input
											id='image'
											name='image'
											type='file'
											className='sr-only'
											required
											onChange={fileUpload}
										/>
									</label>
									<p className='pl-1'>or drag and drop</p>
								</div>
								<p className='text-xs leading-5 text-gray-600'>
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</div>
						<p className='text-sm text-gray-300'>
							<span>File type: doc,pdf,types of images</span>
						</p>
						<div>
							<button
								disabled={!isReady}
								type='submit'
								className={
									!isReady
										? "bg-gray-500 my-5 w-full flex justify-center text-white p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg transition ease-in duration-300"
										: "my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
								}>
								Upload
							</button>
						</div>
					</form>
				</div>
			</div>
			{isReady && imageDimensions && (
    <ImageCropper
      image={file}
      setCropImage={setCroppedImage}
      initialImageDimensions={imageDimensions}
    />
  )}
  {croppedImage && (
    <NextImage
      src={croppedImage}
      alt="Cropped"
      style={{ maxWidth: '100%' }}
      width={imageDimensions?.width}
      height={imageDimensions?.height}
    />
  )}
		</>
	);
};

export default ImageUploadForm;
