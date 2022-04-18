
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import ForumShow from '@/pages/ForumShow'
import ThreadShow from '@/pages/ThreadShow'
import ThreadCreate from '@/pages/ThreadCreate'
import ThreadEdit from '@/pages/ThreadEdit'
import NotFound from '@/pages/NotFound'
import RegisterPage from '@/pages/RegisterPage'
import SignInPage from '@/pages/SignInPage'
import { createRouter, createWebHistory } from 'vue-router'
import { findById } from '@/helpers'
import ProfilePage from '@/pages/ProfilePage'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/me',
    name: 'Profile',
    component: ProfilePage,
    meta: { toTop: true, smoothScroll: true, requiresAuth: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: ProfilePage,
    props: { edit: true },
    meta: { requiresAuth: true }
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: CategoryPage,
    props: true // set component parameters as a component prop
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: ForumShow,
    props: true // set component parameters as a component prop
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    async beforeEnter(to, from, next) {
      await store.dispatch('fetchThread', { id: to.params.id })
      // check if thread exists
      const threadExists = findById(store.state.threads, to.params.id)
      // if exists continue
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash
          query: to.query,
          hash: to.hash
        })
      }
      // if doesnt exist redirect to not found
    }
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInPage
  },
  {
    path: '/logout',
    name: 'SignOut',
    async beforeEnter(to, from) {
      await store.dispatch('signOut')
      return { name: 'Home' }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

router.beforeEach(async (to, from) => {
  await store.dispatch('initAuthentication')
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)
  store.dispatch('unsubscribeAllSnapshots')
  if (to.meta.requiresAuth && !store.state.authId) {
    return { name: 'SignIn' }
  }
  if (to.meta.requiresGuest && store.state.authId) {
    return { name: 'Home' }
  }
})

export default router
