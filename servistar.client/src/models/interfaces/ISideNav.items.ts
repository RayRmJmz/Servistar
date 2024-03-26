import { BadgeProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type IconItem = OverridableComponent<SvgIconTypeMap> | null;

export interface SideNavSubItem {
	label: string;
	path: string;
	icon: IconItem;
}
export interface BadgeConfig {
	content: React.ReactNode;
	color?: BadgeProps['color'];
}

export interface SidenavItem {
	label: string;
	path: string;
	noView: boolean;
	icon: IconItem;
	subItems: SideNavSubItem[];
	roles: string[];
	badge?: BadgeConfig;
}
