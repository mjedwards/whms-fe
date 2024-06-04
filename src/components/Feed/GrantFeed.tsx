"use client";

import React, { useEffect, useState } from "react";
import FeedCard from "./Card/FeedCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GrantType } from "@/@types/global";
import { Icon } from "@iconify/react/dist/iconify.js";


type Headers = {
    Authorization: string;
}

const GrantFeed = () => {
    const [grants, setGrants] = useState([]);
    const queryClient = useQueryClient();
    const { data: userData } = useQuery<any>(
		{ queryKey: ["authUser"] },
		queryClient
	);

    const {isPending, mutate: getGrants} = useMutation({
		mutationFn: async (headers: Headers) => {
			return axios.get(
				"https://warmheartservice-mbmmiyp34q-uc.a.run.app/api/grants/getAllGrants",
				{ headers: headers }
			);
		},
		
		onSuccess: (data:any) => {
            setGrants(data.data);
		},
	});

    useEffect(()=> {
        let token: any;
        if (typeof window !== 'undefined') {
            token = userData?.token || window?.localStorage.getItem("whms_tkn");
        }

        const headers: Headers = {
            Authorization: `Bearer ${token}`,
        };
        if (token) {
            try {
                getGrants(headers)
            } catch (error) {
                console.error(error);
                toast.error("Could not fetch Grants :(");
            }
        }
    },[])

	return (
		<>
			<div className='flex flex-col flex-grow border-l border-r border-gray-300 h-screen'>
				<div className='flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300'>
					<h1 className='text-xl font-semibold'>Grants</h1>
				</div>
				<div className='flex-grow h-0 overflow-auto'>
                    {isPending && <Icon icon="eos-icons:three-dots-loading"  style={{color: "#04102a"}} />}
                    {grants && grants.map((grant: GrantType, index: React.Key) => (<FeedCard key={index} grant={grant} />))}
				</div>
			</div>
            <Toaster position='top-center' reverseOrder={false} />
		</>
	);
};

export default GrantFeed;
