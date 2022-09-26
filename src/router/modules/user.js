import { Layout } from '../const'

const userRouter = {
  path: '/user',
  component: Layout,
  name: 'User',
  redirect: 'list',
  meta: {
    title: '权限管理',
    icon: 'people'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user'),
      name: 'UserList',
      meta: {
        title: '用户管理',
        icon: 'person'
      }
    },
    {
      path: 'menu',
      component: () => import('@/views/user'),
      name: 'Menu',
      meta: {
        title: '菜单管理',
        icon: 'menu'
      }
    },
    {
      path: 'apis',
      component: () => import('@/views/user'),
      name: 'Apis',
      meta: {
        title: 'Api管理',
        icon: 'key'
      }
    },
    {
      path: 'info',
      component: () => import('@/views/userInfo'),
      name: 'UserInfo',
      meta: {
        title: '个人信息'
      },
      hidden: true
    }
  ]
}

export default userRouter
