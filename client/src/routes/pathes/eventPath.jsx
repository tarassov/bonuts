import AppPath from "routes/appPath";
import EventPage from "containers/pages/EventPage";

export const eventPath = new AppPath({
    path: "/event/:id",
    anonymous: false,
    authenticated:true,
    active: true,
    hideInMenu: true,
    component: EventPage
})