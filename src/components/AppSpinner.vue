<template>
  <div class="lds-dual-ring"></div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: '#57ad8d' },
    size: { type: String, default: 'md' }
  },
  data() {
    return {
      spinnerColor: this.color,
      spinnerSize: this.size === 'md' ? '36px' : '24px'
    }
  }
}
</script>

<style scoped>
.lds-dual-ring {
  margin: 0px;
  padding: 0px;
  /* display: inline-block; */
  /* width: 80px; */
  /* height: 80px; */
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: v-bind(spinnerSize);
  height: v-bind(spinnerSize);
  /* margin: 5px; */
  border-radius: 100%;
  border: 4px solid v-bind(spinnerColor);
  border-color: v-bind(spinnerColor) transparent v-bind(spinnerColor)
    transparent;
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
