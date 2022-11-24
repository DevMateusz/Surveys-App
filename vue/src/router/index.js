import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import SurveyPublicView from '../views/SurveyPublic.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import Survey from '../views/Survey.vue';
import Surveys from '../views/Surveys.vue';
import Answer from '../views/Answer.vue';
import Answers from '../views/Answers.vue';
import store from '../store';

const routes = [
  {
    path: '/view/survey/:id/:slug',
    name: 'SurveyPublic',
    component: SurveyPublicView
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/surveys', name: 'Surveys', component: Surveys },
      { path: '/surveys/create', name: 'SurveyCreate', component: Survey },
      { path: '/survey/:id?', name: 'Survey', component: Survey },
      { path: '/answers/:query?', name: 'Answers', component: Answers },
      { path: '/answer/:sid?/:aid?', name: 'Answer', component: Answer },
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
    ]
  },
  { 
    path: '/:pathMatch(.*)*',
    redirect: '/login',
    name: 'NotFound',
    component: Login,
    meta: { isGuest: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'Login' })
  } else if(store.state.user.token && to.meta.isGuest) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router