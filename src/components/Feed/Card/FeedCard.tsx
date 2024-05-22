"use client";

import { GrantType } from "@/@types/global";
import React from "react";

const FeedCard: React.FC<{ grant: GrantType }> = ({ grant }) => {
	const { Description, Links } = grant;
	// console.log(process.env.STORAGE_BASE_URL);

	return (
		<div className='flex w-full p-8 border-b border-gray-300'>
			<span className='flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full'></span>
			<div className='flex flex-col flex-grow ml-4'>
				<div className='flex'>
					<span className='font-semibold'>{grant["Grant Name"]}</span>
					<span className='ml-1'></span>
					<span className='ml-auto text-sm'></span>
				</div>
				<p className='mt-1'>{Description}</p>
                <br/>
				<a className='underline' href={Links} target="_blank">
					Read more!
				</a>
				<div className='flex items-center justify-center h-64 mt-2 bg-gray-200'>
					<span className='font-semibold text-gray-500'>Image</span>
				</div>
				<div className='flex mt-2'>
					<a href={Links} target="_blank">
						<button className='text-sm font-semibold'>Website</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default FeedCard;
