<template>
  <transition name="fade">
    <div class="growler" v-if="isShown">
      {{ $props.msg }}
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Growler',
  data: () => ({
    isShown: false
  }),
  props: {
    msg: String,
    showTime: Number
  },
  watch: {
    showTime(changedTime) {
      if (changedTime < 0) return;

      setTimeout(() => (this.isShown = false), changedTime);
      this.isShown = true;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/shared.scss';

.growler {
  position: absolute;
  top: $navbar-height + 15px;
  right: 15px;

  border: 1px black solid;
  border-radius: 5px;
  padding: 15px;

  color: white;
  font-weight: bold;
  background: $light-blue;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
