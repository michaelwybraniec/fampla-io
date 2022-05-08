<template>
  <AppHead>
    <title>Vue.js 3 Master Class Forum</title>
    <meta name="description" content="A crazy-fast netlified vue3-firebase app! (michaelwybraniec@me.com)">

    <!-- Social -->
    <meta property="og:title" content="A crazy-fast netlified vue3-firebase app! (michaelwybraniec@me.com)">
    <meta property="og:description" content="A crazy-fast netlified vue3-firebase app! (michaelwybraniec@me.com)">
    <meta property="og:image" content="https://avatars.githubusercontent.com/u/46869143?s=400&u=948ae08c3d756babbb80b5388b7a1006fa832606&v=4">

    <!-- Twitter -->
    <meta name="twitter:title" content="A crazy-fast netlified vue3-firebase app! (michaelwybraniec@me.com)">
    <meta name="twitter:description" content="A crazy-fast netlified vue3-firebase app! (michaelwybraniec@me.com)">
    <meta name="twitter:image" content="https://avatars.githubusercontent.com/u/46869143?s=400&u=948ae08c3d756babbb80b5388b7a1006fa832606&v=4">
    <meta name="twitter:card" content="summary_large_image">
  </AppHead>

  <the-nav-bar />
  <div class="container">
    <router-view
      v-show="showPage"
      @ready="onPageReady"
      :key="$route.fullPath"
    />
    <app-spinner :style="{ margin: '100px auto' }" v-show="!showPage" />
    <app-notifications />
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
import { mapActions } from 'vuex'
import NProgress from 'nprogress'
import AppNotifications from '@/components/AppNotifications'

export default {
  name: 'App',
  components: { TheNavBar, AppNotifications },
  data() {
    return {
      showPage: false
    }
  },
  methods: {
    ...mapActions('auth', ['fetchAuthUser']),
    onPageReady() {
      this.showPage = true
      NProgress.done()
    }
  },
  created() {
    this.fetchAuthUser()
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
  }
}
</script>

<style>
@import 'assets/style.css';
@import '~nprogress/nprogress.css';
#nprogress .bar {
  background: #57ad8d !important;
}
</style>
