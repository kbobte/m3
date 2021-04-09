<template>
  <div id="example">
    <p>title: {{ example.title }}</p>
    <Tst />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Tst from './Tst.vue'
const { mapGetters, mapActions } = createNamespacedHelpers('example')

export default {
  name: 'Example',
  components: {
    Tst
  },
  data () {
    return {

    }
  },
  created () {
    /*
    this.$store.dispatch('example/loadExample', {
      title: 'Init example'
    })
    */
    this.loadExample({
      title: 'New example'
    })
  },
  mounted () {

  },
  computed: {
    ...mapGetters(['example'])
  },
  methods: {
    ...mapActions(['loadExample'])
  }
}
</script>

<style lang="less" scoped>

</style>
