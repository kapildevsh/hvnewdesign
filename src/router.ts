import store from '@/store';
import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';
import Login from './components/Login.vue';
import NotFound from './components/NotFound.vue';
import Register from './components/Register.vue';
import { LoginStoreState } from './store/login.store';
import Gallery from './views/Gallery.vue';
import Home from './views/Home.vue';
import Inbox from './views/Inbox.vue';
import Index from './views/Index.vue';
import Links from './views/Links.vue';
import MarriageBureau from './views/MarriageBureau.vue';
import MbDashboard from './views/MbDashboard.vue';
import MbSearch from './views/MbSearch.vue';
import PerfectMatch from './views/PerfectMatch.vue';
import Search from './views/Search.vue';
import Settings from './views/Settings.vue';
import ViewProfile from './views/ViewProfile.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Index',
    meta: { indexToolbar: true },
    component: Index, //() => import(/* webpackChunkName: "index" */ './views/Index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true,
    meta: { componentView: true, loginPage: true },
  },
  {
    path: '/links',
    name: 'Links',
    component: Links,
    meta: { indexToolbar: true, noAppBar: true, noFooter: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { componentView: true, width: '850px', registerPage: true },
  },
  {
    path: '/home',
    name: 'Home',
    meta: { secured: true },
    component: Home, // () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
  },
  {
    path: '/gallery/:profileId?',
    name: 'Gallery',
    props: true,
    meta: { secured: (to: Route) => !to.params.profileId },
    component: Gallery, // () => import(/* webpackChunkName: "gallery" */ './views/Gallery.vue'),
  },
  {
    path: '/profile/:profileId?',
    name: 'View Profile',
    props: true,
    meta: { secured: (to: Route) => !to.params.profileId },
    component: ViewProfile, // () => import(/* webpackChunkName: "view-profile" */ './views/ViewProfile.vue'),
  },
  {
    path: '/perfect-match',
    name: 'Perfect Match',
    meta: { secured: true },
    component: PerfectMatch, // () => import(/* webpackChunkName: "perfect-match" */ './views/PerfectMatch.vue'),
  },
  {
    path: '/inbox',
    name: 'Inbox',
    component: Inbox, // () => import(/* webpackChunkName: "inbox" */ './views/Inbox.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: Search, // () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
  },
  {
    path: '/marriage-bureau/dashboard',
    name: 'Marriage Bureau Dashboard',
    props: true,
    component: MbDashboard, // () => import(/* webpackChunkName: "marriage-bureau-dashboard" */ './views/MbDashboard.vue'),
    meta: { bureauPage: true, secured: true },
  },
  {
    path: '/marriage-bureau/search',
    name: 'Marriage Bureau Search',
    props: true,
    component: MbSearch, // () => import(/* webpackChunkName: "marriage-bureau-search" */ './views/MbSearch.vue'),
    meta: { bureauPage: true, secured: true },
  },
  {
    path: '/marriage-bureau/:marriageBureauId',
    name: 'Marriage Bureau',
    props: true,
    component: MarriageBureau, // () => import(/* webpackChunkName: "marriage-bureau" */ './views/MarriageBureau.vue'),
    meta: { bureauPage: true, secured: true },
  },
  {
    name: 'Settings',
    path: '/settings',
    redirect: '/settings/about-me',
  },
  {
    path: '/settings/:settingsName',
    name: 'Settings',
    meta: { secured: true },
    props: true,
    component: Settings, // () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
  },

  // -------------------------------------------- drafts

  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
    meta: { componentView: true },
  },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = (store.state as { login: LoginStoreState }).login.loggedIn;

  if ((to.path === '/login' || to.path === '/register') && loggedIn) return next(to.params.redirectTo || '/');

  let secured =
    to.meta?.secured == null ? to.matched.find(t => t.meta?.secured != null)?.meta.secured : to.meta.secured;

  if (typeof secured === 'function') secured = secured(to, from);
  if (!loggedIn && secured && to.path !== '/login') return next({ path: '/login', query: { redirectTo: to.fullPath } });

  next();
});

export default router;
