import Home from './views/Home';
import About from './views/About';
import SandBox from './views/SandBox';

export const commonRoutes = [
  {
    path: '/',
    component: Home,
    name: 'HomePage'
  },
  {
    path: '/about',
    component: About,
    name: 'AboutPage'
  },
  {
    path: '/sand-box',
    component: SandBox,
    name: 'SandBox'
  },
]