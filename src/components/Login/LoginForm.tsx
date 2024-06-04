"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Logo } from "../Logo/Logo";
import loginBG from "../../assets/signin_bg.png";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";


type User = {
	email: string;
	password: string;
};
const LoginForm = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [isDisabled, setIsDisabled] = useState(false);

	const handleFormChange = (e: any) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const {isPending, mutate: login} = useMutation({
		mutationFn: async (user: User) => {
			return axios.post(
				"https://warmheartservice-mbmmiyp34q-uc.a.run.app/api/user/login",
				user
			);
		},
		
		onSuccess: (data) => {
			localStorage.setItem("whms_tkn", data.data.token);
			queryClient.setQueryData(['authUser'], data.data);
			toast.success("Login success");
			router.push("/dashboard");
		},
	});

	const handleUserLogin = async (e: any) => {
		e.preventDefault();
		login(user);
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [user]);

	return (
		<>
			<div className='flex min-h-full flex-1'>
				<div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
					<div className='mx-auto w-full max-w-sm lg:w-96'>
						<div>
						<Link href="/">
						<Logo w={50} h={50}/>
						</Link>
							<h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-white'>
								{isPending ? (
									<>
										<span className='relative flex h-3 w-3'>
											<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
											<span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
										</span>
										Processing
									</>
								) : (
									"Sign in to your account"
								)}
							</h2>
						</div>

						<div className='mt-10'>
							<div>
								<form
									onSubmit={handleUserLogin}
									method='POST'
									className='space-y-6'>
									<div>
										<label
											htmlFor='email'
											className='block text-sm font-medium leading-6 text-white'>
											Email address
										</label>
										<div className='mt-2'>
											<input
												onChange={handleFormChange}
												id='email'
												name='email'
												type='email'
												autoComplete='email'
												required
												className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor='password'
											className='block text-sm font-medium leading-6 text-white'>
											Password
										</label>
										<div className='mt-2'>
											<input
												onChange={handleFormChange}
												id='password'
												name='password'
												type='password'
												autoComplete='current-password'
												required
												className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										</div>
									</div>

									<div>
										<button
											disabled={isDisabled}
											type='submit'
											className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
											Sign in
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className='relative hidden w-0 h-screen flex-1 lg:block'>
					<Image
						className='absolute inset-0 h-full w-full object-cover'
						src={loginBG}
						alt=''
						fill
					/>
				</div>
				<Toaster position='top-center' reverseOrder={false} />
			</div>
		</>
	);
};

export default LoginForm;
