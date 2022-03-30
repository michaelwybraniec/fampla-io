<template>
  <TheNavBar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
export default {
  name: 'App',
  components: { TheNavBar }
}
</script>

<style>
@import 'assets/style.css';
/* @import  "~bootstrap/css/bootstrap.css" */
</style>
