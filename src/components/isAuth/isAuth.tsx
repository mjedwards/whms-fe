"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isTokenExpired } from "./util/isExpired";

export default function isAuth(Component: any) {
	return function IsAuth(props: any) {
		const queryClient = useQueryClient();
		const { data: userData } = useQuery<any>(
			{ queryKey: ["authUser"] },
			queryClient
		);

		let isAuthenticated: any;

		if (typeof window !== 'undefined') {
			isAuthenticated = userData?.token || window?.localStorage.getItem("whms_tkn")
		} 

		useEffect(() => {
			if (!isAuthenticated) {
				return redirect("/signIn");
			}
			if (isTokenExpired(isAuthenticated)) {
				return redirect("/signIn");
			}
		}, []);

		if (!isAuthenticated) {
			return null;
		}

		return <Component {...props} />;
	};
}
