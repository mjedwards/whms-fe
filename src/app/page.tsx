import { Logo } from "@/components/Logo/Logo";
import Link from "next/link";

export default function Home() {
	// axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
	return (
		<>
			<header className='absolute inset-x-0 top-0 z-50'>
				<nav
					className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
					aria-label='Global'>
					<div className='flex lg:flex-1'>
						<Link href='/' className='-m-1.5 p-1.5'>
							<Logo />
						</Link>
					</div>
					<div className='lg:flex lg:flex-1 lg:justify-end'>
						<Link
							href='/signIn'
							className='text-sm font-semibold leading-6 text-white'>
							Log in <span aria-hidden='true'>&rarr;</span>
						</Link>
					</div>
				</nav>
			</header>

			<main className='isolate'>
				<div className='relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14'>
					<div
						className='absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-800 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96'
						aria-hidden='true'></div>
					<div className='mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
							<h1 className='max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:col-span-2 xl:col-auto'>
								In every corner of life, we strive to ignite growth and
								opportunity, bridging the gap between potential and reality.
							</h1>
							<div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
								<p className='text-lg leading-8 text-white'>
									Where potential is universal, opportunity should be too. Let us
									create a world where every young person has the chance to
									thrive.
								</p>
								<div className='h-4'></div>
								<p className='text-lg leading-8 text-white'>
									We believe in a holistic approach to development, connecting
									youth with the tools and mentors they need to shape a brighter
									future.
								</p>
							</div>
						</div>
					</div>
					<div className='absolute inset-x-0 bottom-0 -z-10 h-24  from-white sm:h-32'></div>
				</div>
			</main>
		</>
	);
}
