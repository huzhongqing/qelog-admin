import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/logging'
},
// 新建页面
{
  path: '/logging',
  component: Layout,
  redirect: '/logging/index',
  children: [{
    path: 'index',
    component: () => import('@/views/logging/index'),
    name: 'Logging',
    meta: {
      title: '日志查询',
      icon: 'search',
      noCache: true
    }
  }]
},
{
  path: '/alarm',
  component: Layout,
  redirect: '/alarm/index',
  meta: {
    title: '报警管理',
    icon: 'guide'
  },
  title: '报警管理',
  children: [{
    path: 'index',
    component: () => import('@/views/alarm/index'),
    name: 'Alarm',
    meta: {
      title: '报警配置',
      noCache: true
    }
  },
  {
    path: 'hook',
    component: () => import('@/views/alarm/hook'),
    name: 'Hook',
    meta: {
      title: 'Hook配置',
      noCache: true
    }
  }]
},
{
  path: '/module',
  component: Layout,
  redirect: '/module/index',
  children: [{
    path: 'index',
    component: () => import('@/views/module/index'),
    name: 'Module',
    meta: {
      title: '模块管理',
      icon: 'component',
      noCache: true
    }
  }]
},
{
  path: '/metrics',
  component: Layout,
  redirect: '/metrics/index',
  meta: {
    title: '统计信息',
    icon: 'dashboard',
    noCache: true
  },
  children: [{
    path: 'index',
    component: () => import('@/views/metrics/index'),
    name: 'ModuleMetrics',
    meta: {
      title: '日志趋势',

      noCache: true
    }
  },
  {
    path: 'dbstats',
    component: () => import('@/views/dbstats/index'),
    name: 'DBStats',
    meta: {
      title: '数据容量',
      noCache: true
    }
  }
  ]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
