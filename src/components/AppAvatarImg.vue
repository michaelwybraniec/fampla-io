<template>
  <img :src="src || '/user-placeholder.png'" :onError="swapErroredImg" />
</template>
<script>
export default {
  props: {
    src: { type: String }
  },
  methods: {
    swapErroredImg(e) {
      e.target.src = '/user-placeholder.png'
    }
  }
}
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
