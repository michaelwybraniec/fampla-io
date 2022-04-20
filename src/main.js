import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// Directives and Plugins
import FontAwesome from '@/plugins/FontAwesome'
import ClickOutsideDirective from '@/plugins/ClickOutsideDirective'
import PageScrollDirective from '@/plugins/PageScrollDirective'

// firebase
import firebaseConfig from '@/config/firebase'
import { getAnalytics, logEvent } from 'firebase/analytics'
import firebase from 'firebase/compat/app'
const app = firebase.initializeApp(firebaseConfig)

// app.auth().onAuthStateChanged(user => {
//   store.dispatch('unsubscribeAuthUserSnapshot')
//   if (user) store.dispatch('fetchAuthUser')
// })

const analytics = getAnalytics(app)
logEvent(analytics, 'notification_received')

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)

// importing all components
// https://v2.vuejs.org/v2/style-guide/?redirect=true#Base-component-names-strongly-recommended
const requireComponent = require.context('./components', true, /App[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  forumApp.component(baseComponentName, baseComponentConfig)
})

forumApp.mount('#app')
