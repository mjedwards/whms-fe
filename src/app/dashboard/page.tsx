import GrantFeed from "@/components/Feed/GrantFeed";

const Dashboard = () => {
	return (
		<>
		{/* fetch events by user email in axios `/api/events/${userEmail}` */}
			<span className='font-bold text-4xl'>Dashboard</span>

			<GrantFeed />
			{/* <div className='border-dashed border border-zinc-500 w-full h-12 rounded-lg'>
				How many visitors to the page.
			</div>
			<div className='border-dashed border border-zinc-500 w-full h-64 rounded-lg'>
				See if we can integrate Seo stuff.
			</div>
			<div className='border-dashed border border-zinc-500 w-full h-64 rounded-lg'>
				See if we can integrate Seo stuff.
			</div>
			<div className='border-dashed border border-zinc-500 w-full h-64 rounded-lg'>
				See if we can integrate Seo stuff.
			</div> */}
		</>
	);
};

export default Dashboard;
