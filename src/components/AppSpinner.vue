<template>
  <div class="lds-dual-ring"></div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: '#57ad8d' }
  },
  data() {
    return {
      spinnerColor: this.color
    }
  }
}
</script>

<style scoped>
.lds-dual-ring {
  margin: 100px auto;
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 36px;
  height: 36px;
  margin: 5px;
  border-radius: 100%;
  border: 4px solid v-bind(spinnerColor);
  border-color: v-bind(spinnerColor) transparent v-bind(spinnerColor) transparent;
  animation: lds-dual-ring 0.3s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
