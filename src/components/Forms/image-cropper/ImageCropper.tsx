"use Client";
import { Area } from "@/@types/global";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

interface ImageCropperProps {
	image: string | ArrayBuffer | null;
	setCropImage: React.Dispatch<React.SetStateAction<string>>;
	initialImageDimensions: { width: number; height: number };
}

const ImageCropper: React.FC<ImageCropperProps> = ({
	image,
	setCropImage,
	initialImageDimensions,
}) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (ctx && typeof image === "string") {
			// create the image
			const imageObj = new Image();
			imageObj.src = image;

			imageObj.onload = () => {
				canvas.width = croppedAreaPixels.width;
				canvas.height = croppedAreaPixels.height;
				ctx.drawImage(
					imageObj,
					croppedAreaPixels.x,
					croppedAreaPixels.y,
					croppedAreaPixels.width,
					croppedAreaPixels.height,
					0,
					0,
					croppedAreaPixels.width,
					croppedAreaPixels.height
				);

				const croppedImageDataURL = canvas.toDataURL();
				setCropImage(croppedImageDataURL);
			};
		}
	};

	const updateZoom = (e: any) => {
		setZoom(e.target.value);
	};

	// Check if the image prop is a string
	const isImageString = typeof image === "string";

	return (
		<div
			className='relative bg-gray-900 w-full h-64'
			style={{ zIndex: 10 }}>
			<div className='crop-container'>
				{isImageString && (
					<Cropper
						image={image}
						crop={crop}
						zoom={zoom}
						aspect={4 / 3}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
						//   initialImageDimensions={initialImageDimensions}
					/>
				)}
			</div>
			<div className=''>
				<div className=''>
					<div className=''>Zoom</div>
					<input
						type='range'
						value={zoom}
						min={1}
						max={3}
						step={0.1}
						aria-labelledby='Zoom'
						onChange={updateZoom}
						className='zoom-range'
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageCropper;
