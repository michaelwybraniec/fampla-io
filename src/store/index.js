import { createStore } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'oppNjkELJiWKrvx6oT6DOcxCE1C3',
    // authId: null,
    unsubscribes: [],
    authUserUnsubscribe: null
  },
  getters,
  actions,
  mutations
})
