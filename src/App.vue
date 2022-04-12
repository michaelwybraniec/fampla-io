<template>
  <the-nav-bar />
  <div class="container">
    <router-view v-show="showPage" @ready="showPage = true" />
    <div v-show="!showPage" class="push-top">loading...</div>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: { TheNavBar },
  data() {
    return {
      showPage: false
    }
  },
  methods: {
    ...mapActions(['fetchAuthUser'])
  },
  created() {
    this.fetchAuthUser()
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  }
}
</script>

<style>
@import 'assets/style.css';
/* @import  "~bootstrap/css/bootstrap.css" */
</style>
