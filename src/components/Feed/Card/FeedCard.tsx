"use client";

import { GrantType } from "@/@types/global";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const FeedCard: React.FC<{ grant: GrantType }> = ({ grant }) => {
	const { Description, Links, cloudStorageRefs } = grant;
	const baseURL = "https://storage.cloud.google.com/whms_images";
	const logo = `${baseURL}${cloudStorageRefs.logo}`;
	const photo = `${baseURL}${cloudStorageRefs.photo}`;

	return (
		<div className='flex w-full p-8 border-b border-gray-300'>
			<span className='flex-shrink-0 w-12 h-12 bg-transparent rounded-full'>
				<img src={logo} alt='company logo' />
			</span>
			<div className='flex flex-col flex-grow ml-4'>
				<div className='flex'>
					<span className='font-semibold'>{grant["Grant Name"]}</span>
					<span className='ml-1'></span>
					<span className='ml-auto text-sm'></span>
				</div>
				<p className='mt-1'>{Description}</p>
				<br />
				<a className='underline flex items-center' href={Links} target='_blank'>
				<Icon icon="ant-design:read-outlined"  style={{color: "black"}} className="mr-2.5"/>
					Read more!
				</a>
				<div className='flex items-center justify-center h-64 mt-2 bg-transparent'>
					<span className='font-semibold text-gray-500'>
						<img src={photo} alt='company photo' style={{ height: "256px" }} />
					</span>
				</div>
				<div className='flex mt-2'>
					<a href={Links} target='_blank'>
						<button className='text-sm font-semibold flex items-center'>
							<Icon icon='mdi:world-wide-web' style={{ color: "black" }} className="mr-2.5"/>
							Website
						</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default FeedCard;
