<template>
  <div class="col-full text-center">
    <img src="https://emoji.gg/assets/emoji/8268-cat-sad.png" />
    <h1>Not found</h1>
    <router-link :to="{ name: 'Home' }">Read some cool threads</router-link>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit('ready')
  }
}
</script>

<style scoped></style>
