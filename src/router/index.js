import Vue from 'vue';
import Router from 'vue-router';
//懒加载
const Home = () => import('../view/home/Home');
const Container = () => import('../view/container/Container');
const Board = () => import('../view/board/Board');
const ChatRoom = () => import('../view/chatroom/ChatRoom');
const Music = () => import('../view/music/Music');
const Login = () => import('../view/login/Login');
const Register = () => import('../view/login/Register');
Vue.use(Router);
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/container',
    component: Container,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'board',
        component: Board
      },
      {
        path: 'chatroom',
        component: ChatRoom
      },
      {
        path: 'music',
        component: Music
      },
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
];
export default new Router({
  routes
})


