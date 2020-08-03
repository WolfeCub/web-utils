<template>
  <form @submit.prevent="getSubmitFunction" class="form">
    <input type="text" class="input" v-model="url" placeholder="Target url" />
    <button type="submit" class="button">
      {{ !submitted ? 'Shorten' : 'Copy Link' }}
    </button>
    <Growler msg="Link copied" :show-time="toastTime"/>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import ShortenedUrl from '@shared/shortenedUrl';
import Growler from '@/components/Growler.vue'

export default Vue.extend({
  name: 'ShortenForm',
  components: {
    Growler
  },
  data: () => ({
    submitted: false,
    url: '',
    toastTime: 0
  }),
  methods: {
    getSubmitFunction() {
      if (this.submitted) {
        navigator.clipboard.writeText(this.url);
        this.toastTime = 5000;
      } else {
        this.sendNewUrl();
      }

      this.submitted = true;
    },
    async sendNewUrl() {
      const response = await fetch('/api/shortener/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: this.url
        })
      });

      if (!response.ok) alert(await response.text());

      const body: ShortenedUrl = await response.json();
      this.url = `${window.location.origin}/s/${body.slug}`;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/shared.scss';

$height: 40px;
$radius: 5px;
$border: 1px;

.form {
  padding: 50px 0px;
}

.input {
  height: $height;

  font-size: 16px;
  padding: 0px 10px;

  border: $border solid $light-blue;
  border-radius: $radius 0px 0px $radius;
}

.button {
  height: $height + $border * 2;

  border: $border solid $light-blue;
  border-radius: 0px $radius $radius 0px;

  color: white;
  background: $light-blue;
  font-size: 16px;

  transition-duration: 500ms;

  &:hover {
    color: black;
    background: white;
  }
}
</style>
