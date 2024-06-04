"use client";
import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/useScroll";
import { cn } from "@/utils/tw-merge";
import { Logo } from "../Logo/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Header = () => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('whms_tkn');
    queryClient.removeQueries({ queryKey: ["authUser"], exact: true });
    redirect("/signIn");
  }

	return (
		<div
			className={cn(
				`sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-white`,
				{
					"border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
					"border-b border-gray-200 bg-white": selectedLayout,
				}
			)}>
			<div className='flex h-[47px] items-center justify-between px-4'>
				<div className='flex items-center space-x-4'>
					<Link
						href='/dashboard'
						className='flex flex-row space-x-3 items-center justify-center md:hidden'>
						<Logo w={50} h={50} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
