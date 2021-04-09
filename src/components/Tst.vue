<template>
  <div>
      Loaded from Tst.vue: {{ tst.title }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('tst')

export default {
  name: 'Tst',
  data () {
    return {

    }
  },
  created () {
    this.loadTst({
      title: 'Load tst'
    })
  },
  mounted () {

  },
  computed: {
    ...mapGetters(['tst'])
  },
  methods: {
    ...mapActions(['loadTst'])
  }
}
</script>

<style>

</style>
