import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        //redirect 是重新定向
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '',
            keepAlive: false
        }
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine/index.vue'),
        meta: {
            title: '',
            keepAlive: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: ' ',
            keepAlive: false
        }
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/detail/index.vue'),
        meta: {
            title: '1',
            keywords: '',
            description: '',
            keepAlive: false
        }
    },
    {
        path: '/record',
        name: 'record',
        component: () => import('../views/record/index.vue'),
        meta: {
            title: '2',
            keepAlive: false
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router