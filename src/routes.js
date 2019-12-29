// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SearchIcon from '@material-ui/icons/Search'
import scheduleIcon from '@material-ui/icons/Schedule'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Person from "@material-ui/icons/Person"
import Forum from "@material-ui/icons/People"
import Chat from "@material-ui/icons/Chat"
import School from "@material-ui/icons/School"
import Subject from "@material-ui/icons/Subject"
import History from "@material-ui/icons/History"
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import ConsultantPage from "views/Consultant/Consultant.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Forums from "views/Forum/Forums.jsx";
import ConsultantPreference from 'views/ConsultantPreference/ConsultantPreference.jsx'
import AccountInformation from 'views/AccountInformation/AccountInformation.jsx'
import Resources from 'views/Resources/Resources.jsx'
import Appointment from 'views/Appointment/Appointment'
import Availability from 'views/Availability/Availability'
import Messages from 'views/Messages/Messages'
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Signout from "views/Signout/Signout.jsx";
// core components/views for RTL layout

export const learningRoutes = [
    {
        path: "consultant",
        name: "Search For Experts",
        icon: SearchIcon,
        component: ConsultantPage,
        layout: "/"
    },
    {
        path: "user",
        name: "User Profile",
        icon: Person,
        component: UserProfile,
        layout: "/"
    },
    {
        path: "infomation",
        name: "Account Information",
        icon: History,
        component: AccountInformation,
        layout: "/"
    },
    {
        path: "appointment",
        name: "Your Appointments",
        icon: scheduleIcon,
        component: Appointment,
        layout: "/"
    },
    {
        path: "messages",
        name: "Messages",
        icon: Chat,
        component: Messages,
        layout: "/"
    },
    {
        path: "forum",
        name: "Forum",
        icon: Forum,
        component: Forums,
        layout: "/"
    },
    {
        path: "resources",
        name: "Resources",
        icon: Subject,
        component: Resources,
        layout: "/"
    },
    {
        path: "signout",
        name: "Sign Out",
        icon: ExitToAppIcon,
        component: Signout,
        layout: "/"
    },
    {
        path: "landing",
        name: "Start Page",
        icon: School,
        component: Signout,
        layout: "/"
    },
];

export const expertRoutes = [
    {
        path: "user",
        name: "User Profile",
        icon: Person,
        component: UserProfile,
        layout: "/"
    },
    {
        path: "preference",
        name: "Expert Preferences",
        icon: Subject,
        component: ConsultantPreference,
        layout: "/"
    },
    {
        path: "infomation",
        name: "Account Information",
        icon: History,
        component: AccountInformation,
        layout: "/"
    },
    {
        path: "messages",
        name: "Messages",
        icon: Chat,
        component: Messages,
        layout: "/"
    },
    {
        path: "appointment",
        name: "Your Appointments",
        icon: scheduleIcon,
        component: Appointment,
        layout: "/"
    },
    {
        path: "availability",
        name: "Set Availability",
        icon: CalendarTodayIcon,
        component: Availability,
        layout: "/"
    },
    {
        path: "forum",
        name: "Forum",
        icon: Forum,
        component: Forums,
        layout: "/"
    },
    {
        path: "signout",
        name: "Sign Out",
        icon: ExitToAppIcon,
        component: Signout,
        layout: "/"
    },
    {
        path: "landing",
        name: "Start Page",
        icon: School,
        layout: "/"
    },
];
