import VueRouter from "vue-router";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Profile from "./views/profile/Profile";
import Clients from "@/views/clients/Clients";
import axios from "axios";
import ProfileOptions from "@/views/profile/ProfileOptions";
import ClientOptions from "@/views/clients/ClientOptions";
import ProfileIndex from "@/views/profile/ProfileIndex";
import ClientsIndex from "@/views/clients/ClientsIndex";
import {bus} from "@/main";
import NewClient from "@/views/clients/NewClient";

// create router
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileIndex,
            meta: {
                requiresAuth: true
            },
            redirect: {name: 'profilehome'},
            children: [
                {
                    path: 'home',
                    name: 'profilehome',
                    component: Profile,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'options',
                    component: ProfileOptions,
                    name: 'profileoptions',
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '*',
                    redirect: {name: 'profilehome'}
                },
            ]
        },
        {
            path: '/clients',
            name: 'clients',
            component: ClientsIndex,
            meta: {
                requiresAuth: true
            },
            redirect: {name: 'clientshome'},
            children: [
                {
                    path: 'home',
                    name: 'clientshome',
                    component: Clients,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'new',
                    name: 'newclient',
                    component: NewClient,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: ':clientId/options',
                    name: 'clientoptions',
                    component: ClientOptions,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '*',
                    redirect: {name: 'clientshome'}
                },
            ],
        },
        {
            path: '*',
            redirect: {name: 'home'}
        },
    ],
    mode: 'history'
});

// set authentication
router.beforeEach(async (to, from, next) => {
    const isAuthed = await isAuthenticated();

    // if not authed, remove user (just in case)
    if(!isAuthed) {
        localStorage.removeItem("user");
        // update components
        updateDynamicComponents();
    }

    // if we going TO login and we are authenticated, just skip it and go to profile
    if (to.name === 'login' && isAuthed) {
        updateDynamicComponents();
        next('/profile');
        return;
    }

    if (to.meta.requiresAuth) { // if it requires auth
        // are we authenticated
        if (isAuthed) {
            updateDynamicComponents();
            next();
        } else {
            // if we are coming from /login, DON'T redirect again to login. No need.
            if (from.name !== 'login') {
                next('/login');
            }
        }
    } else {
        next();
    }
});

const isAuthenticated = async () => {
    try {
        let response = await axios
            .post(process.env.VUE_APP_API_URL + process.env.VUE_APP_GET_PATH, {}, {withCredentials: true});

        if (response.data.response._id) {
            // set localStorage user
            localStorage.setItem("user", response.data.response);
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
}

const updateDynamicComponents = () => {
    // try to update dynamic components
    bus.$emit("update-dynamic", "update-dynamic event");
}

export default router;