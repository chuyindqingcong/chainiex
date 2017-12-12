import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import User from '@/components/user/user'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['../components/index.vue'], resolve),
      children: [{
          path: '/',
          component: resolve => require(['../components/user/user'], resolve)
        },
        {
          path: '/addnotice',
          component: resolve => require(['../components/notice/add'], resolve)
        },
        {
          path: '/nocicelist',
          component: resolve => require(['../components/notice/list'], resolve)
        },
        {
          path: '/show',
          component: resolve => require(['../components/case/show'], resolve)
        },
        {
          path: '/adduser',
          component: resolve => require(['../components/user/add'], resolve)
        },
        {
          path: '/userlist',
          component: resolve => require(['../components/user/list'], resolve)
        },
        {
          path: '/revise',
          component: resolve => require(['../components/user/revise'], resolve)
        },
        {
          path: '/addcoin',
          component: resolve => require(['../components/coin/add'], resolve)
        },
        {
          path: '/coinlist',
          component: resolve => require(['../components/coin/list'], resolve)
        },
         {
          path: '/caselist',
          component: resolve => require(['../components/case/caselist'], resolve)
        },
         {
          path: '/idcardlist',
          component: resolve => require(['../components/case/idcard'], resolve)
        },
        {
        	path:'/user',
        	component:resolve=> require(['../components/case/userlist'],resolve)
        },
        {
        	path:'/config',
        	component:resolve=> require(['../components/system/config'],resolve)
        },
        {
        	path:'/newAdd',
        	component:resolve=> require(['../components/news/newsAdd'],resolve)
        },
        {
        	path:'/newList',
        	component:resolve=> require(['../components/news/list'],resolve)
        }
      ]
    }
  ]
})