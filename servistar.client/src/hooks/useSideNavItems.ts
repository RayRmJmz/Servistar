import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StarIcon from '@mui/icons-material/Star';


import { ROLES, ROUTES, LABELS } from '../constants';
import { replacePathParams } from '../utils';
import { SidenavItem } from '../models';
import useCredentials from './useCredentials';

export default function useSideNavItems() {
	const { id, roles, isRootUser } = useCredentials();

	const getAssistantRequestPath = replacePathParams(
		ROUTES.TEST,
		':idUser',
		`${id}`
	);

	const items: SidenavItem[] = [
		{
			label: 'Inicio',
			path: ROUTES.TEST,
			icon: HomeIcon,
			noView: false,
			subItems: [],
			roles: [...Object.values(ROLES)],
		},
		{
			label: 'Colaboradores',
			path: ROUTES.TEST,
			icon: GroupIcon,
			noView: false,
			subItems: [],
			roles: [ROLES.ADMI, ROLES.ADMI],
		},
		{
			label: `${LABELS.CANCEL}`,
			path: ROUTES.TEST,
			icon: StarIcon,
			noView: false,
			subItems: [],
			roles: [ROLES.ADMI, ROLES.ADMI],
		},
		{
			label: 'Catálogos',
			path: '#',
			icon: ReceiptIcon,
			noView: true,
			subItems: [
				{
					label: 'Códigos SAT',
					path: ROUTES.TEST,
					icon: BusinessCenterIcon,
				},
				{
					label: 'Empresas Emisoras',
					path: ROUTES.TEST,
					icon: BusinessIcon,
				},
			],
			roles: [ROLES.ADMI, ROLES.ADMI],
		},
		{
			label: 'Comisión Servicios',
			path: ROUTES.TEST,
			icon: SettingsIcon,
			noView: false,
			subItems: [],
			roles: [ROLES.ADMI, ROLES.ADMI],
		},

		// {
		// 	label: 'Notificaciones',
		// 	path: '#',
		// 	icon: NotificationsIcon,
		// 	noView: false,
		// 	subItems: [],
		// 	roles: [...Object.values(ROLES)],
		// 	badge: {
		// 		content: 1,
		// 		color: 'error',
		// 	},
		// },
		{
			label: 'Preferencias',
			path: ROUTES.TEST,
			icon: EmailIcon,
			noView: false,
			subItems: [],
			roles: [ROLES.ADMI, ROLES.ADMI],
		},
		{
			label: 'Mis Solicitudes',
			path: ROUTES.TEST,
			icon: LibraryBooksIcon,
			noView: false,
			subItems: [],
			roles: [ROLES.ADMI],
		},
		{
			label: 'Solicitantes',
			path: `/applicants/${id}`,
			icon: ContactsIcon,
			noView: false,
			subItems: [],
			roles: [ROLES.ADMI],
		},
		{
			label: `${LABELS.CANCEL}`,
			path: `/assignable-individuals-for-transfers/${id}`,
			icon: SocialDistanceIcon,
			noView: false,
			subItems: [],
			roles: [ROLES.ADMI],
		},
		{
			label: `${LABELS.CANCEL}`,
			path: getAssistantRequestPath,
			icon: AccountTreeIcon,
			noView: false,
			subItems: [],
			roles: isRootUser ? [ROLES.ADMI] : [],
		},
	];

	const itemsToShowBaseOnRoles = items.filter(item =>
		item.roles.some(role => roles.includes(role))
	);

	return itemsToShowBaseOnRoles;
}
