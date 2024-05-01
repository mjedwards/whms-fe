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

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}