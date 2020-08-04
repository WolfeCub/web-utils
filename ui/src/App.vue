<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="home-button">
        <img src="./assets/home.png" alt="" class="home-icon" />
      </router-link>
      |
      <router-link to="/shorten">URL Shortener</router-link>
    </div>
    <div class="view-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import 'styles/shared.scss';

body {
  margin: 0px;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  top: 0px;
  left: 0px;
  height: $navbar-height;

  $padding: 15px;
  width: calc(100% - #{$padding * 2});
  padding: 0px $padding;

  background: $dark-gray;
  color: white;

  display: flex;
  align-items: center;

  a {
    color: inherit;
    font-weight: bold;
    margin: 0px 5px;
    text-decoration: none;

    &.router-link-exact-active {
      color: $light-blue;
    }
  }

  .home-button {
    display: grid;
    vertical-align: middle;

    .home-icon {
      width: 20px;
      filter: invert(100%);
    }

    &.router-link-exact-active {
      filter: invert(38%) sepia(90%) saturate(861%) hue-rotate(159deg) brightness(92%) contrast(103%);
    }
  }
}

.view-wrapper {
  text-align: center;
}
</style>
