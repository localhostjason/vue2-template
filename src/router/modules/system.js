import { Layout } from '../const'

const SystemRouter = {
  path: '/system',
  component: Layout,
  name: 'System',
  redirect: 'bak',
  meta: {
    title: '系统管理',
    icon: 'cog'
  },
  children: [
    {
      path: 'bak',
      component: () => import('@/views/user'),
      name: 'Bak',
      meta: {
        title: '备份/还原',
        icon: 'transfer'
      }
    },
    {
      path: 'about',
      component: () => import('@/views/user'),
      name: 'About',
      meta: {
        title: '关于本系统',
        icon: 'print'
      }
    }
  ]
}

export default SystemRouter
