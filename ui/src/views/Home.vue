<template>
  <div>
    <div class="header">
      <h1 class="title">Wolfe's Utils</h1>
      <img src="@/assets/wolf-logo.png" alt="" class="logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0px;
  padding: 50px;

  font-family: 'Helvetica Neue', sans-serif;
  font-size: 150px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;

  color: white;
  text-shadow: 0 3px 7px rgba(255, 255, 255, 0.3);
}

@keyframes color-rotate {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}

.logo {
  margin-bottom: 50px;

  &:hover {
    animation: color-rotate 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
}

.header {
  width: 100%;
  background: rgb(19,19,19);

  clip-path: polygon(50% 0%, 100% 0, 100% 65%, 50% 100%, 0 65%, 0 0);
}
</style>
