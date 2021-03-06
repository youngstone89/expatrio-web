import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: Home
        // },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('./views/BoardAdmin.vue')
        },
        {
            path: '/adduser',
            name: 'adduser',
            // lazy-loaded
            component: () => import('./views/AddUser.vue')
        },
        {
            path: '/edituser/:customerId',
            name: 'edituser',
            // lazy-loaded
            component: () => import('./views/EditUser.vue')
        },
        {
            path: '*',
            // lazy-loaded
            component: Home
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/home','/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // try to access a restricted page + not logged in
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});