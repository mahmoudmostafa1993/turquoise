/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // Login
        {
            name: 'Login',
            path: '/login',
            component: () =>
                import ('@/pages/login'),
        },
        {
            name: 'Inter Phone Number',
            path: '/ResetPassword',
            component: () =>
                import ('@/pages/ResetPassword/EnterPhone'),
        },
        {
            name: 'Inter Code',
            path: '/enterCode',
            component: () =>
                import ('@/pages/ResetPassword/RessetCode'),
        },
        {
            name: 'Enter New Password',
            path: '/enterPass',
            component: () =>
                import ('@/pages/ResetPassword/NewPassword'),
        },
        {
            path: '/',
            meta: { requiresAuth: true },
            redirect: '/',
            component: () =>
                import ('@/views/dashboard/Index'),
            children: [
              // Home
              {
                name: 'statistics',
                path: '/',
                component: () =>
                    import ('@/views/dashboard/Dashboard'),
                meta: { requiresAuth: true },
            },
            // Start invoices Routers
            // invoices
            {
              name: 'invoices',
              path: '/invoices/invoices',
              component: () =>
                  import ('@/views/dashboard/invoices/invoices/List'),
              meta: { requiresAuth: true },
            },
            // Start settings Routers
            // categries
            {
              name: 'categries',
              path: '/settings/categries',
              component: () =>
                  import ('@/views/dashboard/setting/category/List'),
              meta: { requiresAuth: true },
            },
            {
              name: 'categriesForm',
              path: '/settings/categriesForm/:id?',
              component: () =>
                  import ('@/views/dashboard/setting/category/Form'),
              meta: { requiresAuth: true },
            },
            // Branches
            {
              name: 'branches',
              path: '/settings/branches',
              component: () =>
                  import ('@/views/dashboard/setting/branches/List'),
              meta: { requiresAuth: true },
            },
            {
              name: 'branchesForm',
              path: '/settings/branchesForm/:id?',
              component: () =>
                  import ('@/views/dashboard/setting/branches/Form'),
              meta: { requiresAuth: true },
            },
            // Stones
            {
              name: 'stones',
              path: '/settings/stones',
              component: () =>
                  import ('@/views/dashboard/setting/stones/List'),
              meta: { requiresAuth: true },
            },
            {
              name: 'stonesForm',
              path: '/settings/stonesForm/:id?',
              component: () =>
                  import ('@/views/dashboard/setting/stones/Form'),
              meta: { requiresAuth: true },
            },
            // employee
            {
              name: 'employees',
              path: '/settings/employees',
              component: () =>
                  import ('@/views/dashboard/setting/employee/List'),
              meta: { requiresAuth: true },
            },
            {
              name: 'employeesForm',
              path: '/settings/employeesForm/:id?',
              component: () =>
                  import ('@/views/dashboard/setting/employee/Form'),
              meta: { requiresAuth: true },
            },
            // End settings Routers
            {
              path: '/notAuthorized',
              name: 'notAuthorized',
              component: () =>
              import ('../pages/NotAuthorized.vue'),
            },
            { path: '*', redirect: '/login' },
          ],
        },
    ],
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth) {
        if (!token) {
            next({
                name: 'Login',
            })
        } else {
            return next()
        }
    } else {
        next()
    }
})

export default router
