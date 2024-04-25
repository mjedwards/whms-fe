export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};

export type FooterNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
};