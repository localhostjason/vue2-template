import { Layout } from '../const'

const LogRouter = {
  path: '/log',
  component: Layout,
  name: 'Log',
  redirect: 'alert',
  meta: {
    title: '日志查询',
    icon: 'search'
  },
  children: [
    {
      path: 'alert',
      component: () => import('@/views/user'),
      name: 'AlertLog',
      meta: {
        title: '告警日志',
        icon: 'shield'
      }
    },
    {
      path: 'system',
      component: () => import('@/views/user'),
      name: 'SystemLog',
      meta: {
        title: '系统日志',
        icon: 'layers'
      }
    }
  ]
}

export default LogRouter
