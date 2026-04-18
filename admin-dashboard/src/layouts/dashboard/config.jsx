// Heroicons
import HomeIcon from "@heroicons/react/24/solid/HomeIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/solid/ChatBubbleLeftRightIcon";
import MicrophoneIcon from "@heroicons/react/24/solid/MicrophoneIcon";
import MapPinIcon from "@heroicons/react/24/solid/MapPinIcon";
import RocketLaunchIcon from "@heroicons/react/24/solid/RocketLaunchIcon";
import ClipboardDocumentCheckIcon from "@heroicons/react/24/solid/ClipboardDocumentCheckIcon";

// MUI Icons (For more specific "Add/Show" variations)
import { 
  StarRounded as StarRoundedIcon,
  AddBusiness as AddFloorIcon,
  Domain as ShowFloorIcon,
  LibraryAdd as AddItemIcon,
  FormatListBulleted as ListIcon 
} from "@mui/icons-material";

import { SvgIcon } from '@mui/material';  

export const items = [
  {
    href: '/',
    icon: <SvgIcon><HomeIcon /></SvgIcon>,
    label: 'Home'
  },
  {
    href: '/addAdmin',
    icon: <SvgIcon><UserPlusIcon /></SvgIcon>,
    label: 'Add Admin'
  },
  {
    href: '/showAdmin',
    icon: <SvgIcon><UsersIcon /></SvgIcon>,
    label: 'Show Admins'
  },
  {
    href: '/showusers',
    icon: <SvgIcon><UserGroupIcon /></SvgIcon>,
    label: 'Users'
  },
  {
    href: '/usermessages',
    icon: <SvgIcon><ChatBubbleLeftRightIcon /></SvgIcon>,
    label: 'Users Msg'
  },
  {
    href: '/UsersRatings',
    icon: <SvgIcon><StarRoundedIcon /></SvgIcon>,
    label: 'Ratings'
  },
  {
    href: '/addFloor',
    icon: <SvgIcon><AddFloorIcon /></SvgIcon>, // Building with +
    label: 'Add Floor'
  },
  {
    href: '/showFloor',
    icon: <SvgIcon><ShowFloorIcon /></SvgIcon>, // Building structure
    label: 'Show Floor'
  },
  {
    href: '/addSpeak',
    icon: <SvgIcon><AddItemIcon /></SvgIcon>, // General Add icon
    label: 'Add Speaker'
  },
  {
    href: '/showSpeak',
    icon: <SvgIcon><MicrophoneIcon /></SvgIcon>,
    label: 'Show Speaker'
  },
  {
    href: '/addVenue',
    icon: <SvgIcon><MapPinIcon /></SvgIcon>,
    label: 'Add Venue'
  },
  {
    href: '/showVenue',
    icon: <SvgIcon><ListIcon /></SvgIcon>, // List view for venues
    label: 'Show Venue'
  },
  {
    href: '/addExpo',
    icon: <SvgIcon><RocketLaunchIcon /></SvgIcon>,
    label: 'Add Expo'
  },
  {
    href: '/showExpo',
    icon: <SvgIcon><ListIcon /></SvgIcon>,
    label: 'Show Expo'
  },
  {
    href: '/showReg',
    icon: <SvgIcon><ClipboardDocumentCheckIcon /></SvgIcon>,
    label: 'Show Reg'
  },
  {
    href: '/showExhiReg',
    icon: <SvgIcon><ClipboardDocumentCheckIcon /></SvgIcon>,
    label: 'Exhi Reg'
  },
];