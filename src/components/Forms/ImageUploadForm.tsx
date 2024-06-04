"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ImageCropper from "./image-cropper/ImageCropper";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";


type PostInfo = {
    formData: FormData;
    headers: {
        Authorization: string;
    };
}

const ImageUploadForm = () => {
	const queryClient = useQueryClient();
	const { data: userData } = useQuery<any>(
		{ queryKey: ["authUser"] },
		queryClient
	);

	// image related state
	const [file, setFile] = useState<string | ArrayBuffer | null>(null);
	const [croppedImage, setCroppedImage] = useState<string>("");
	const [isReady, setIsReady] = useState(false);
	const [fileName, setFileName] = useState("");
	const [imageDimensions, setImageDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	// handle the file upload
	const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];

		if (selectedFile) {
            setFileName(selectedFile.name);
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
            setIsReady(false);
		}
	};

	const { isPending, mutate: uploadImage } = useMutation({
		mutationFn: async (postInfo: PostInfo) => {
            const {formData, headers} = postInfo;
			return axios.post(
				"https://warmheartservice-mbmmiyp34q-uc.a.run.app/api/image/uploadImage",
				formData,
				{ headers: headers }
			);
		},
		onSuccess: (data) => {
			toast.success("Image uploaded successfully");
            setFile(null);
            setCroppedImage("");
			setIsReady(false);
			setImageDimensions(null);
            setIsReady(false);
		},
	});

	const onFileSubmit = (e: any) => {
		e.preventDefault();
		const token = userData?.token || window?.localStorage.getItem("whms_tkn");

		if (token) {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
				};

				const formData = new FormData();

				const mimeType =
					croppedImage.match(
						/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
					)?.[1] || "";

				// Create a Blob from the base64 string
				const binaryString = atob(croppedImage.split(",")[1]);

				const bytes = new Uint8Array(binaryString.length);
				for (let i = 0; i < binaryString.length; i++) {
					bytes[i] = binaryString.charCodeAt(i);
				}
				const blob = new Blob([bytes], { type: mimeType });

				// Get the filename from the original file
				const fileExtension = mimeType.split("/")[1];

				// Append the Blob to the FormData
				formData.append("file", blob, fileName);
                
                const postInfo: PostInfo = { formData, headers }
				uploadImage(postInfo);
			} catch (error) {
				// Handle any other errors
				console.error(error);
			}
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
					<form className='mt-8 space-y-3' onSubmit={onFileSubmit}>
						<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
							<div className='text-center flex flex-col items-center w-full h-full'>
								{!croppedImage && (
									<Icon icon='logos:imagemin' width={100} height={100} />
								)}
								{isReady && imageDimensions && (
									<ImageCropper
										image={file}
										setCropImage={setCroppedImage}
										initialImageDimensions={imageDimensions}
									/>
								)}
								<div className='mt-4 flex text-sm leading-6 text-gray-600'>
									<label
										htmlFor='file'
										className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
										<span>Upload a file</span>
										<input
											id='file'
											name='file'
											type='file'
											className='sr-only'
											required
                                            accept=".png, .jpg, .jpeg, .gif"
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
            <Toaster position='top-center' reverseOrder={false} />
		</>
	);
};

export default ImageUploadForm;
