<template>
  <div id="app">
    <Board />
    <router-view/>
  </div>
</template>

<script>
import Board from '@/components/Board'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style>
  /* body { */
    /* background-color: black; */
  /* } */
</style>
