'use client';

import { FOOTERNAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/@types/global";
import useCurrentYear from "@/hooks/useCurrentYear";

const FooterNav = () => {
	const year = useCurrentYear();

	return (
		<footer className='bg-white'>
			<div className='mx-auto max-w-7xl overflow-hidden px-6 py-6 sm:py-24 lg:px-8'>
				<nav
					className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12'
					aria-label='Footer'>
					{FOOTERNAV_ITEMS.map((item: SideNavItem) => (
						<div key={item.title} className='pb-6'>
							<a
								href={item.path}
								className='text-sm leading-6 text-gray-600 hover:text-gray-900'>
								{item.title}
							</a>
						</div>
					))}
				</nav>
				<p className='mt-10 text-center text-xs leading-5 text-gray-500'>
					&copy; {year} Warmhearts Mentorship Services, Inc. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default FooterNav;
