<template>
  <div>
    <button @click='toggle'>Toggle</button>
    <slide-y-up-transition>
      <div v-show="show">Your content here</div>
    </slide-y-up-transition>
  </div>
</template>
<script>
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'Swap',
  components: {
    SlideYUpTransition
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>

</style>
