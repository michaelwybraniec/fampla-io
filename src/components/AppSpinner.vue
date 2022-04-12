<template>
  <div class="lds-dual-ring"></div>
</template>

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
  width: 34px;
  height: 34px;
  margin: 4px;
  border-radius: 50%;
  border: 3px solid #57ad8d;
  border-color: #57ad8d transparent #57ad8d transparent;
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
