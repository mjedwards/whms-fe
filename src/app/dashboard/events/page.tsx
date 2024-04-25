const Events = () => {
	return (
		<>
			<span className='font-bold text-4xl'>Events</span>

			<div className='border-dashed border border-zinc-500 w-full h-12 rounded-lg'>
				This will include a form to create new events.
			</div>
			<div className='border-dashed border border-zinc-500 w-full h-64 rounded-lg'>
				it will ask for description, image, location, attire style, date, time
			</div>
			<div className='border-dashed border border-zinc-500 w-full h-64 rounded-lg'>
				Manage other events as well. Deprecate past events etc.
			</div>
		</>
	);
};

export default Events;
