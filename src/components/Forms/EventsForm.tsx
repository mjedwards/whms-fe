"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostInfo } from "@/@types/global";

interface EventForm {
	image: string | Blob;
	title: string;
	date: string;
	time: string;
	location: string;
	description: string;
}

const EventForm = () => {
	const queryClient = useQueryClient();
	const { data: userData } = useQuery<any>(
		{ queryKey: ["authUser"] },
		queryClient
	);

	const [error, setError] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [file, setFile] = useState<string | ArrayBuffer | null>(null);
	const [isReady, setIsReady] = useState(false);
	const [formReady, setFormReady] = useState(false);
	const [fileName, setFileName] = useState("");
	const [event, setEvent] = useState<EventForm>({
		image: "",
		title: "",
		date: "",
		time: "",
		location: "",
		description: "",
	});

	const addressRegex =
		/^[a-zA-Z0-9\s,'-]+,\s*[a-zA-Z\s]+,\s*[a-zA-Z]{2}\s*\d{5}$/;

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setEvent((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];

		if (selectedFile) {
			setFileName(selectedFile.name);
			const reader = new FileReader();

			reader.onload = () => {
				const dataUrl = reader.result as string;

				setEvent((prevState) => ({
					...prevState,
					[e.target.name]: dataUrl,
				}));

				setFile(dataUrl);
				setIsReady(true);

				const img = new Image();
				img.src = dataUrl;
			};

			reader.readAsDataURL(selectedFile);
		} else {
			setFile(null);
			setIsReady(false);
			setIsReady(false);
		}
	};

	const handleAddressChange = (e: any) => {
		const newAddress = e.target.value;

		if (addressRegex.test(newAddress)) {
		}
	};

	const { isPending, mutate: uploadEvent } = useMutation({
		mutationFn: async (postInfo: PostInfo) => {
			const { formData, headers } = postInfo;
			return axios.post("http://localhost:8080/api/event/addEvent", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					...headers,
				},
			});
		},
		onSuccess: (data) => {
			toast.success("Image uploaded successfully");
			setFile(null);
			setIsReady(false);
			// setFormReady(true);
		},
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const token = userData?.token || window?.localStorage.getItem("whms_tkn");
		if (token) {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
				};

				const formData = new FormData();

				const { image, title, date, time, location, description } = event;

				formData.append("title", title);
				formData.append("date", date);
				formData.append("time", time);
				formData.append("location", location);
				formData.append("description", description);

				let mimeType;
				let binaryString;
				let bytes;
				if (typeof image === "string") {
					mimeType =
						image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || "";

					binaryString = atob(image.split(",")[1]);
					bytes = new Uint8Array(binaryString.length);

					for (let i = 0; i < binaryString.length; i++) {
						bytes[i] = binaryString.charCodeAt(i);
					}
				}

				if (bytes) {
					const blob = new Blob([bytes], { type: mimeType });
					formData.append("image", blob, fileName);
				}

				const postInfo: PostInfo = { formData: formData , headers };
				uploadEvent(postInfo);
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						{/* image */}
						<div className='col-span-full'>
							<label
								htmlFor='event-photo'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Event photo
							</label>
							<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
								<div className='flex flex-col items-center text-center'>
									{typeof file === "string" && (
										<img src={file} alt='Uploaded Image' />
									)}
									{!file && (
										<Icon
											icon='material-symbols:add-photo-alternate-outline'
											width='24'
											height='24'
											className='mx-auto h-12 w-12 text-gray-300'
										/>
									)}

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
												onChange={handleFile}
											/>
										</label>
										<p className='pl-1'>or drag and drop</p>
									</div>
									<p className='text-xs leading-5 text-gray-600'>
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
							</div>
						</div>
						{/* title */}
						<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='sm:col-span-4'>
								<label
									htmlFor='title'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Event Title
								</label>
								<div className='mt-2'>
									<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
										<input
											type='text'
											name='title'
											id='title'
											autoComplete='title'
											className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
											placeholder='Mentor Breakfast'
											required
											value={event.title}
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>

							{/* date */}
							<div className='col-span-full'>
								<label
									htmlFor='date'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Event Date
								</label>
								<div className='mt-2'>
									<input
										id='date'
										name='date'
										type='date'
										className='cursor-pointer block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										required
										value={event.date}
										onChange={handleInputChange}
									/>
								</div>
								<p className='mt-3 text-sm leading-6 text-gray-600'>
									When is your event happening?
								</p>
							</div>

							{/* time */}
							<div className='col-span-full'>
								<label
									htmlFor='time'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Event Time
								</label>
								<div className='mt-2'>
									<input
										type='time'
										name='time'
										id='time'
										className='cursor-pointer block w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										min='09:00'
										max='18:00'
										required
										value={event.time}
										onChange={handleInputChange}
									/>
								</div>
							</div>

							{/* location */}
							<div className='col-span-full'>
								<label
									htmlFor='location'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Event Location
								</label>
								<div className='mt-2'>
									<input
										type='address'
										id='location'
										name='location'
										placeholder='456 Park Avenue, New York, NY 10022'
										className='p-1 cursor-pointer block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										required
										value={event.location}
										onChange={handleInputChange}
									/>
								</div>
								{/* error flag */}
								{error ? (
									<span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
										Invalid Location
									</span>
								) : (
									<></>
								)}
							</div>

							{/* description */}
							<div className='col-span-full'>
								<label
									htmlFor='description'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Event Description
								</label>
								<div className='mt-2'>
									<textarea
										id='description'
										name='description'
										rows={3}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										required
										value={event.description}
										onChange={handleInputChange}
									/>
								</div>
								<p className='mt-3 text-sm leading-6 text-gray-600'>
									Tell us about your upcoming event.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='button'
						className='text-sm font-semibold leading-6 text-gray-900'>
						Cancel
					</button>
					{uploadSuccess ? (
						<button
							disabled
							className='flex justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-green shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
							<Icon icon='ep:success-filled' style={{ color: "#18f014" }} />
						</button>
					) : (
						<button
							type='submit'
							className='my-5 flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300'>
							Upload
						</button>
					)}
				</div>
			</form>
			<Toaster position='top-center' reverseOrder={false} />
		</>
	);
};

export default EventForm;
