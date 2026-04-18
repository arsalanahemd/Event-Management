import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from './layouts/dashboard/layout';
import IconsPage from './pages1/icons';
import NotFoundPage from './pages1/404';
import OrdersPage from './pages1/orders';
import ReportsPage from './pages1';
import SettingsPage from './pages1/settings';
import ThemePage from './pages1/theme';
import ChangePass from './layouts/dashboard/ChangePassword';
import AddAdmins from './pages/Admins/AddAdmins';
import ShowAdmins from './pages/Admins/ShowAdmins';
import ShowUsers from './pages/User/Showuser';
import UsersMessages from './pages/User/UsersMessages';
import UsersRatings from './pages/User/UsersRatings';
import AddFloor from './pages/Floor/AddFloors';
import ShowFloors from './pages/Floor/ShowFloor';
import AddVenue from './pages/Venue/AddVenue';
import ShowVenues from './pages/Venue/ShowVenue';
import AddExpo from './pages/Expo/Addexpo';
import ShowExpos from './pages/Expo/ShowExpo';
import EditExpo from './pages/Expo/EditExpo';
import ShowRegistrations from './pages/Registration/ExpoReg';
import AddSpeaker from './pages/Speaker/AddSpeaker';
import ShowSpeaker from './pages/Speaker/ShowSpeaker';
import ShowExhiReg from './pages/Exhibitor/ShowExhiReg';

export const routes = [
  {
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <ReportsPage />
      },
      {
        path: 'orders',
        element: <OrdersPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'theme',
        element: <ThemePage />
      },
      {
        path: 'icons',
        element: <IconsPage />
      },
      {
        path: 'changePass',
        element: <ChangePass />
      },
            {
        path: 'addAdmin',
        element: <AddAdmins />
      },
      {
        path: 'showAdmin',
        element: <ShowAdmins />
      },
         {
        path: 'showusers',
        element: <ShowUsers />
      },

      {
        path: 'usermessages',
        element: <UsersMessages />
      },
      {
        path: 'UsersRatings',
        element: <UsersRatings />
      },

      {
        path: 'addFloor',
        element: <AddFloor />
      },
      {
        path: 'showFloor',
        element: <ShowFloors />
      },
     {
        path: 'addVenue',
        element: <AddVenue />
      },
      {
        path: 'showVenue',
        element: <ShowVenues />
      },
       {
        path: 'addExpo',
        element: <AddExpo />
      },
      {
        path: 'showVenue',
        element: <ShowVenues />
      },
      {
        path: 'showExpo',
        element: <ShowExpos />
      },
      {
        path: 'editExpo/:id',
        element: <EditExpo />
      },
      {
        path: 'showReg',
        element: <ShowRegistrations />
      },
     {
        path: 'addSpeak',
        element: <AddSpeaker />
      },
       {
        path: 'showSpeak',
        element: <ShowSpeaker />
      },
             {
        path: 'showExhiReg',
        element: <ShowExhiReg />
      },
    ]
  },
  {
    path: '404',
    element: <NotFoundPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];


