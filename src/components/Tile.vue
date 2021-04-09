<template>
    <div
      class="tile"
      @click='handleClick'>
      <!-- @dragover.prevent
      @drop.prevent="drop" -->
      <img
        :src='getImgUrl'
        height="32px"
        :title="this.tile.type"
        :class='{isSource}'
        :id='this.tile.index'
        />
        <!-- :draggable="draggable"
        @dragstart="dragStart"
        @dragover.stop 42-->
    </div>
</template>

<script>
export default {
  name: 'Tile',
  props: ['tile', 'isSource'],
  data () {
    return {
      draggable: true
    }
  },
  computed: {
    getImgUrl () {
      const images = require.context('../assets/types/', false, /\.png$/)
      return images('./' + this.tile.type + '.png')
    }
  },
  methods: {
    handleClick () {
      this.$emit('tileClick', this.tile)
    }
    // drop: e => {
    //   const id = e.dataTransfer.getData('id')
    //   const card = document.getElementById(id)
    //   card.style.display = 'block'
    //   console.log('dropped')
    // },
    // dragStart: e => {
    //   const target = e.target
    //   e.dataTransfer.setData('id', target.id)
    //   setTimeout(() => {
    //     // target.style.display = 'none'
    //   }, 0)
    // }
  }
}
</script>

<style scoped>
  .tile {
    position: relative;
    margin: 5px;
    padding: 5px;
    height: 32px;
    width: 32px;
    border: 1px solid silver;
    border-radius: 18%;
    opacity: 1;

    /* background-image: url('../assets/types/1.png');
    background-position: center;
    background-repeat: no-repeat; */
    /* transition: transform 0.2s; */
    /* background:
    linear-gradient(to right, rgb(170, 36, 3) 1px, transparent 1px) 0 0,
    linear-gradient(to right, rgb(170, 36, 3) 1px, transparent 1px) 0 100%,
    linear-gradient(to left, rgb(170, 36, 3) 1px, transparent 1px) 100% 0,
    linear-gradient(to left, rgb(170, 36, 3) 1px, transparent 1px) 100% 100%,
    linear-gradient(to bottom, rgb(170, 36, 3) 1px, transparent 1px) 0 0,
    linear-gradient(to bottom, rgb(170, 36, 3) 1px, transparent 1px) 100% 0,
    linear-gradient(to top, rgb(170, 36, 3) 1px, transparent 1px) 0 100%,
    linear-gradient(to top, rgb(170, 36, 3) 1px, transparent 1px) 100% 100%;
    background-repeat: no-repeat;
    background-size: 12px 12px; */
  }
  .inactive:hover {
    border: 1px solid transparent;
    /* background-color: rgb(212, 155, 218); */
    background:
    linear-gradient(to right, rgb(229, 255, 0) 1px, transparent 1px) 0 0,
    linear-gradient(to right, rgb(229, 255, 0) 1px, transparent 1px) 0 100%,
    linear-gradient(to left, rgb(229, 255, 0) 1px, transparent 1px) 100% 0,
    linear-gradient(to left, rgb(229, 255, 0) 1px, transparent 1px) 100% 100%,
    linear-gradient(to bottom, rgb(229, 255, 0) 1px, transparent 1px) 0 0,
    linear-gradient(to bottom, rgb(229, 255, 0) 1px, transparent 1px) 100% 0,
    linear-gradient(to top, rgb(229, 255, 0) 1px, transparent 1px) 0 100%,
    linear-gradient(to top, rgb(229, 255, 0) 1px, transparent 1px) 100% 100%;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    /* transform: rotate(18deg); */
  }
  .active {
    /* border: 1px solid transparent; */
    animation-name: rotation;
    animation-duration: 1.3s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    /* background:
    linear-gradient(to right, rgb(170, 36, 3) 1px, transparent 1px) 0 0,
    linear-gradient(to right, rgb(170, 36, 3) 1px, transparent 1px) 0 100%,
    linear-gradient(to left, rgb(170, 36, 3) 1px, transparent 1px) 100% 0,
    linear-gradient(to left, rgb(170, 36, 3) 1px, transparent 1px) 100% 100%,
    linear-gradient(to bottom, rgb(170, 36, 3) 1px, transparent 1px) 0 0,
    linear-gradient(to bottom, rgb(170, 36, 3) 1px, transparent 1px) 100% 0,
    linear-gradient(to top, rgb(170, 36, 3) 1px, transparent 1px) 0 100%,
    linear-gradient(to top, rgb(170, 36, 3) 1px, transparent 1px) 100% 100%;
    background-repeat: no-repeat;
    background-size: 12px 12px; */
  }
  @keyframes rotation {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
  @keyframes pulsing {
    from {transform: scale(1)}
    to {transform: scale(1.2)}
  }
  @keyframes shaking {
    0% {top: 0px;left: 0px}
    50% {top: -1px;left: -1px}
    100% {top: +1px;left: +1px}
  }
  .matched {
    /* transform: scale(0.8) rotate(45deg);
    opacity: 0.4;
    background-color: red; */
    animation-name: mymatchedExplode;
    /* animation-duration: 1s; */
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }
  .dropping {
    animation-name: falling;
    animation-fill-mode: forwards;
    /* animation-duration: 1.8s; */
    animation-duration: 1s;
    animation-timing-function: linear;
    /* animation-delay: 3s; */
  }

  /* 42 - 74 */
  @keyframes falling {
    0% {opacity: 1;  top:-42px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping2 {
    animation-name: falling2;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
    /* animation-delay: 3s; */
  }

  @keyframes falling2 {
    0% {opacity: 1;  top:-84px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping3 {
    animation-name: falling3;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
    /* animation-delay: 3s; */
  }

  @keyframes falling3 {
    0% {opacity: 1;  top:-126px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping4 {
    animation-name: falling4;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
  }

  @keyframes falling4 {
    0% {opacity: 1;  top:-168px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping5 {
    animation-name: falling5;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
  }

  @keyframes falling5 {
    0% {opacity: 1;  top:-210px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping6 {
    animation-name: falling6;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
  }

  @keyframes falling6 {
    0% {opacity: 1;  top:-252px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping7 {
    animation-name: falling7;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
  }

  @keyframes falling7 {
    0% {opacity: 1;  top:-294px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping8 {
    animation-name: falling8;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
  }

  @keyframes falling8 {
    0% {opacity: 1;  top:-336px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  .dropping9 {
    animation-name: falling9;
    animation-fill-mode: forwards;
    animation-duration: 1.8s;
    animation-timing-function: linear;
  }

  @keyframes falling9 {
    0% {opacity: 1;  top:-378px}
    50% {opacity: 1; top:0px}
    100% {opacity: 1}
  }

  @keyframes mymatchedRotate {
    0% {opacity: 1;transform: scale(1.1)}
    50% {opacity: 0.5;transform: scale(1.3) rotate(90deg)}
    100% {opacity: 0;transform: scale(0.4) rotate(180deg)}
  }

  @keyframes mymatchedExplode {
    0% {opacity: 1;transform: scale(1.1)}
    50% {opacity: 0.5;transform: scale(1.3)}
    100% {opacity: 0;transform: scale(1.7)}
  }
</style>
