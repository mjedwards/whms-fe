import { Icon } from "@iconify/react";
import { SideNavItem } from "./@types/global";

export const SIDENAV_ITEMS: SideNavItem[] = [
	// {
	//   title: 'Home',
	//   path: '/',
	//   icon: <Icon icon="lucide:home" width="24" height="24" />,
	// },
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: (
			<Icon icon='material-symbols:dashboard-outline' width='24' height='24' />
		),
	},
	{
		title: "Resources",
		path: "/dashboard/resources",
		icon: <Icon icon='grommet-icons:resources' width='24' height='24' />,
	},
	{
		title: "Uploads",
		path: "/dashboard/uploads",
		icon: <Icon icon='mdi:uploads' width='24' height='24' />,
	},
	{
		title: "Events",
		path: "/dashboard/events",
		icon: <Icon icon='mdi:events-check' width='24' height='24' />,
	},
];

export const FOOTERNAV_ITEMS = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: (
			<Icon icon='material-symbols:dashboard-outline' width='24' height='24' />
		),
	},
	{
		title: "Resources",
		path: "/dashboard/resources",
		icon: <Icon icon='grommet-icons:resources' width='24' height='24' />,
	},
	{
		title: "Uploads",
		path: "/dashboard/uploads",
		icon: <Icon icon='mdi:uploads' width='24' height='24' />,
	},
	{
		title: "Events",
		path: "/dashboard/events",
		icon: <Icon icon='mdi:events-check' width='24' height='24' />,
	},
];
