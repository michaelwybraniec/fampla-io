import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// firebase
import firebaseConfig from '@/config/firebase'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
logEvent(analytics, 'notification_received')

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)

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
