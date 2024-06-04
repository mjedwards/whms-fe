import { Icon } from "@iconify/react";
import { SideNavItem } from "./@types/global";

export const SIDENAV_ITEMS: SideNavItem[] = [
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
	{
		title: "Logout",
		path: "/logout",
		icon: <Icon icon="material-symbols:logout"  style={{color: "#000"}} width='24' height='24'/>,
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
