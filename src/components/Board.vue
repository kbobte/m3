<template>
  <div>
    <div>
      <img :src='res1path' height='32px' /><span style='font-size: 32px;margin-right: 10px;'>{{ resource1.value }}</span>
      <img :src='res2path' height='32px' /><span style='font-size: 32px;margin-right: 10px;'>{{ resource2.value }}</span>
      <img :src='res3path' height='32px' /><span style='font-size: 32px;margin-right: 10px;'>{{ resource3.value }}</span>
      <img :src='res4path' height='32px' /><span style='font-size: 32px;margin-right: 10px;'>{{ resource4.value }}</span>
      <img :src='res5path' height='32px' /><span style='font-size: 32px;margin-right: 10px;'>{{ resource5.value }}</span>
      <button @click='destroyTileButton'>Destroy a tile</button>
      <button @click='destroyRowButton'>Destroy a row</button>
      <button @click='destroyColumnButton'>Destroy a column</button>
      <button @click='destroyTypeButton'>Destroy a type</button>
    </div>
    <div class="flex-container">
      <Tile v-for="tile in board.tiles" :key='tile.index' :tile='tile' @tileClick='handleTileClick' :class="[tile.source ? 'active' : 'inactive', tile.matchedX || tile.matchedY ? 'matched' : '',
        tile.dropping === 1 ? 'dropping' : '',
        tile.dropping === 2 ? 'dropping2' : '',
        tile.dropping === 3 ? 'dropping3' : '',
        tile.dropping === 4 ? 'dropping4' : '',
        tile.dropping === 5 ? 'dropping5' : '',
        tile.dropping === 6 ? 'dropping6' : '',
        tile.dropping === 7 ? 'dropping7' : '',
        tile.dropping === 8 ? 'dropping8' : '',
        tile.dropping === 9 ? 'dropping9' : ''
        ]" />
      {{ source }} | {{ target }}
    </div>
  </div>
</template>
<script>
import Tile from '@/components/Tile'
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('board')

export default {
  name: 'Board',
  components: {
    Tile
  },
  data () {
    return {
      magic: {
        destroyTile: false,
        destroyRow: false,
        destroyColumn: false,
        destroyType: false
      },
      matched: [],
      resource1: {
        img: '',
        value: 0
      },
      resource2: {
        img: '',
        value: 0
      },
      resource3: {
        img: '',
        value: 0
      },
      resource4: {
        img: '',
        value: 0
      },
      resource5: {
        img: '',
        value: 0
      }
    }
  },
  created () { },
  computed: {
    ...mapGetters(['board', 'source', 'target']),
    res1path () {
      const images = require.context('../assets/types/', false, /\.png$/)
      return images('./1.png')
    },
    res2path () {
      const images = require.context('../assets/types/', false, /\.png$/)
      return images('./2.png')
    },
    res3path () {
      const images = require.context('../assets/types/', false, /\.png$/)
      return images('./3.png')
    },
    res4path () {
      const images = require.context('../assets/types/', false, /\.png$/)
      return images('./4.png')
    },
    res5path () {
      const images = require.context('../assets/types/', false, /\.png$/)
      return images('./5.png')
    }
  },
  methods: {
    ...mapActions(['loadBoard', 'addSource', 'addTarget', 'swapTiles', 'clearSource', 'markAsMatchedX', 'markAsMatchedY', 'fillAction', 'clearDropping']),
    timeout (ms) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms))
    },
    handleTileClick (tile) {
      if (this.magic.destroyTile === true) {
        this.magicDestroyTile(tile)
        return false
      }
      if (this.magic.destroyRow === true) {
        this.magicDestroyRow(tile)
        return false
      }
      if (this.magic.destroyColumn === true) {
        this.magicDestroyColumn(tile)
        return false
      }
      if (this.magic.destroyType === true) {
        this.magicDestroyType(tile)
        return false
      }
      if (this.source === null) {
        this.addSource(tile)
        return true
      }
      if (this.source.index === tile.index) {
        this.clearSource()
        return false
      }
      this.handleTargetClick(tile)
    },
    handleTargetClick (tile) {
      const isNext = this.isNext(tile)
      if (!isNext) {
        this.clearSource()
        this.addSource(tile)
        return false
      }
      this.addTarget(tile)
      this.swapTiles()
      this.fillMatchedAnimateFalling()
    },
    async animationFlow (intervalId) {
      this.findMatches()
      if (this.matched.length === 0) {
        if (intervalId) {
          clearInterval(intervalId)
        }
        return false
      }
      await this.timeout(500)
      this.fillEmpty()
      await this.timeout(1000)
      this.clearDropping()
      this.matched = []
    },
    fillMatchedAnimateFalling () {
      this.animationFlow()
      const intervalId = setInterval(() => {
        this.animationFlow(intervalId)
      }, 1600)
    },
    isNext (tile) {
      if (tile.x === this.source.x && (tile.y + 1 === this.source.y || tile.y - 1 === this.source.y)) {
        return true
      }
      if (tile.y === this.source.y && (tile.x + 1 === this.source.x || tile.x - 1 === this.source.x)) {
        return true
      }
      return false
    },
    findMatches () {
      // console.log('find matches')
      const tiles = this.board.tiles
      const rowX = 9
      let found = false
      tiles.forEach((tile, index) => {
        // 9 Horizontal
        if (tile.matchedX === false && tile.y < 5 && tile.type === tiles[index + 1].type && tile.type === tiles[index + 2].type && tile.type === tiles[index + 3].type && tile.type === tiles[index + 4].type && tile.type === tiles[index + 5].type && tile.type === tiles[index + 6].type && tile.type === tiles[index + 7].type && tile.type === tiles[index + 8].type) {
          this.markAsMatchedX([tile.index, index + 1, index + 2, index + 3, index + 4, index + 5, index + 6, index + 7, index + 8])
          this.matched.push([tile, tiles[index + 1], tiles[index + 2], tiles[index + 3], tiles[index + 4], tiles[index + 5], tiles[index + 6], tiles[index + 7], tiles[index + 8]])
          found = true
        }
        // 8 Horizontal
        if (tile.matchedX === false && tile.y < 5 && tile.type === tiles[index + 1].type && tile.type === tiles[index + 2].type && tile.type === tiles[index + 3].type && tile.type === tiles[index + 4].type && tile.type === tiles[index + 5].type && tile.type === tiles[index + 6].type && tile.type === tiles[index + 7].type) {
          this.markAsMatchedX([tile.index, index + 1, index + 2, index + 3, index + 4, index + 5, index + 6, index + 7])
          this.matched.push([tile, tiles[index + 1], tiles[index + 2], tiles[index + 3], tiles[index + 4], tiles[index + 5], tiles[index + 6], tiles[index + 7]])
          found = true
        }
        // 7 Horizontal
        if (tile.matchedX === false && tile.y < 5 && tile.type === tiles[index + 1].type && tile.type === tiles[index + 2].type && tile.type === tiles[index + 3].type && tile.type === tiles[index + 4].type && tile.type === tiles[index + 5].type && tile.type === tiles[index + 6].type) {
          this.markAsMatchedX([tile.index, index + 1, index + 2, index + 3, index + 4, index + 5, index + 6])
          this.matched.push([tile, tiles[index + 1], tiles[index + 2], tiles[index + 3], tiles[index + 4], tiles[index + 5], tiles[index + 6]])
          found = true
        }
        // 6 Horizontal
        if (tile.matchedX === false && tile.y < 5 && tile.type === tiles[index + 1].type && tile.type === tiles[index + 2].type && tile.type === tiles[index + 3].type && tile.type === tiles[index + 4].type && tile.type === tiles[index + 5].type) {
          this.markAsMatchedX([tile.index, index + 1, index + 2, index + 3, index + 4, index + 5])
          this.matched.push([tile, tiles[index + 1], tiles[index + 2], tiles[index + 3], tiles[index + 4], tiles[index + 5]])
          found = true
        }
        // 5 Horizontal
        if (tile.matchedX === false && tile.y < 5 && tile.type === tiles[index + 1].type && tile.type === tiles[index + 2].type && tile.type === tiles[index + 3].type && tile.type === tiles[index + 4].type) {
          this.markAsMatchedX([tile.index, index + 1, index + 2, index + 3, index + 4])
          this.matched.push([tile, tiles[index + 1], tiles[index + 2], tiles[index + 3], tiles[index + 4]])
          found = true
        }
        // 4 Horizontal
        if (tile.matchedX === false && tile.y < 6 && tile.type === tiles[index + 1].type && tile.type === tiles[index + 2].type && tile.type === tiles[index + 3].type) {
          this.markAsMatchedX([tile.index, index + 1, index + 2, index + 3])
          this.matched.push([tile, tiles[index + 1], tiles[index + 2], tiles[index + 3]])
          found = true
        }
        // 3 Horizontal
        if (tile.matchedX === false && tile.y < 7 && tile.type === tiles[index + 1].type && tile.type === tiles[index + 2].type) {
          this.markAsMatchedX([tile.index, index + 1, index + 2])
          this.matched.push([tile, tiles[index + 1], tiles[index + 2]])
          found = true
          console.log('3 horizontal')
        }
        // 9 Vertical
        if (tile.matchedY === false && tile.x < 1 && tile.type === tiles[index + 1 * rowX].type && tile.type === tiles[index + 2 * rowX].type && tile.type === tiles[index + 3 * rowX].type && tile.type === tiles[index + 4 * rowX].type && tile.type === tiles[index + 5 * rowX].type && tile.type === tiles[index + 6 * rowX].type && tile.type === tiles[index + 7 * rowX].type && tile.type === tiles[index + 8 * rowX].type) {
          this.markAsMatchedY([tile.index, index + 1 * rowX, index + 2 * rowX, index + 3 * rowX, index + 4 * rowX, index + 5 * rowX, index + 6 * rowX, index + 7 * rowX, index + 8 * rowX])
          this.matched.push([tile, tiles[index + 1 * rowX], tiles[index + 2 * rowX], tiles[index + 3 * rowX], tiles[index + 4 * rowX], tiles[index + 5 * rowX], tiles[index + 6 * rowX], tiles[index + 7 * rowX], tiles[index + 8 * rowX]])
          found = true
        }
        // 8 Vertical
        if (tile.matchedY === false && tile.x < 2 && tile.type === tiles[index + 1 * rowX].type && tile.type === tiles[index + 2 * rowX].type && tile.type === tiles[index + 3 * rowX].type && tile.type === tiles[index + 4 * rowX].type && tile.type === tiles[index + 5 * rowX].type && tile.type === tiles[index + 6 * rowX].type && tile.type === tiles[index + 7 * rowX].type) {
          this.markAsMatchedY([tile.index, index + 1 * rowX, index + 2 * rowX, index + 3 * rowX, index + 4 * rowX, index + 5 * rowX, index + 6 * rowX, index + 7 * rowX])
          this.matched.push([tile, tiles[index + 1 * rowX], tiles[index + 2 * rowX], tiles[index + 3 * rowX], tiles[index + 4 * rowX], tiles[index + 5 * rowX], tiles[index + 6 * rowX], tiles[index + 7 * rowX]])
          found = true
        }
        // 7 Vertical
        if (tile.matchedY === false && tile.x < 3 && tile.type === tiles[index + 1 * rowX].type && tile.type === tiles[index + 2 * rowX].type && tile.type === tiles[index + 3 * rowX].type && tile.type === tiles[index + 4 * rowX].type && tile.type === tiles[index + 5 * rowX].type && tile.type === tiles[index + 6 * rowX].type) {
          this.markAsMatchedY([tile.index, index + 1 * rowX, index + 2 * rowX, index + 3 * rowX, index + 4 * rowX, index + 5 * rowX, index + 6 * rowX])
          this.matched.push([tile, tiles[index + 1 * rowX], tiles[index + 2 * rowX], tiles[index + 3 * rowX], tiles[index + 4 * rowX], tiles[index + 5 * rowX], tiles[index + 6 * rowX]])
          found = true
        }
        // 6 Vertical
        if (tile.matchedY === false && tile.x < 4 && tile.type === tiles[index + 1 * rowX].type && tile.type === tiles[index + 2 * rowX].type && tile.type === tiles[index + 3 * rowX].type && tile.type === tiles[index + 4 * rowX].type && tile.type === tiles[index + 5 * rowX].type) {
          this.markAsMatchedY([tile.index, index + 1 * rowX, index + 2 * rowX, index + 3 * rowX, index + 4 * rowX, index + 5 * rowX])
          this.matched.push([tile, tiles[index + 1 * rowX], tiles[index + 2 * rowX], tiles[index + 3 * rowX], tiles[index + 4 * rowX], tiles[index + 5 * rowX]])
          found = true
        }
        // 5 Vertical
        if (tile.matchedY === false && tile.x < 5 && tile.type === tiles[index + 1 * rowX].type && tile.type === tiles[index + 2 * rowX].type && tile.type === tiles[index + 3 * rowX].type && tile.type === tiles[index + 4 * rowX].type) {
          this.markAsMatchedY([tile.index, index + 1 * rowX, index + 2 * rowX, index + 3 * rowX, index + 4 * rowX])
          this.matched.push([tile, tiles[index + 1 * rowX], tiles[index + 2 * rowX], tiles[index + 3 * rowX], tiles[index + 4 * rowX]])
          found = true
        }
        // 4 Vertical
        if (tile.matchedY === false && tile.x < 6 && tile.type === tiles[index + 1 * rowX].type && tile.type === tiles[index + 2 * rowX].type && tile.type === tiles[index + 3 * rowX].type) {
          this.markAsMatchedY([tile.index, index + 1 * rowX, index + 2 * rowX, index + 3 * rowX])
          this.matched.push([tile, tiles[index + 1 * rowX], tiles[index + 2 * rowX], tiles[index + 3 * rowX]])
          found = true
        }
        // 3 Vertical
        if (tile.matchedY === false && tile.x < 7 && tile.type === tiles[index + 1 * rowX].type && tile.type === tiles[index + 2 * rowX].type) {
          this.markAsMatchedY([tile.index, index + 1 * rowX, index + 2 * rowX])
          this.matched.push([tile, tiles[index + 1 * rowX], tiles[index + 2 * rowX]])
          found = true
          console.log('3 vertical')
        }
      })
      // console.log('matched:')
      // console.log(this.matched)
      if (found) {
        this.matched.forEach(m => {
          let prize = 3
          m.forEach(t => {
            if (t.matchedX && t.matchedY) {
              prize = 5
            }
          })
          if (m.length === 4) {
            prize = 4
          }
          if (m.length >= 5) {
            prize = 10
          }
          switch (m[0].type) {
            case 1:
              this.resource1.value += prize
              return true
            case 2:
              this.resource2.value += prize
              return true
            case 3:
              this.resource3.value += prize
              return true
            case 4:
              this.resource4.value += prize
              return true
            case 5:
              this.resource5.value += prize
              return true
          }
        })
      }
      return found
    },
    fillEmpty () {
      const matches = _.cloneDeep(this.matched)
      const indexes = []
      matches.forEach(array => {
        array.map(m => {
          indexes.push(m.index)
        })
      })
      this.fillAction(indexes)
    },
    destroyTileButton () {
      // if (this.resource1.value <= 3) {
      //   return false
      // }
      this.magic.destroyTile = true
    },
    destroyRowButton () {
      // if (this.resource1.value < 6) {
      //   return false
      // }
      this.magic.destroyRow = true
    },
    destroyColumnButton () {
      // if (this.resource1.value < 6) {
      //   return false
      // }
      this.magic.destroyColumn = true
    },
    destroyTypeButton () {
      // if (this.resource1.value < 6) {
      //   return false
      // }
      this.magic.destroyType = true
    },
    clearMagics () {
      this.magic.destroyTile = false
      this.magic.destroyRow = false
      this.magic.destroyColumn = false
      this.magic.destroyType = false
    },
    magicDestroyTile (tile) {
      this.markAsMatchedX([tile.index])
      this.matched.push([tile])
      this.addResources()
      this.fillMatchedAnimateFalling()
      this.clearMagics()
    },
    magicDestroyRow (tile) {
      // console.log('destroy row')
      const rowTiles = []
      this.board.tiles.forEach(t => {
        if (tile.x === t.x) {
          rowTiles.push(t.index)
          this.matched.push([t])
        }
      })
      this.markAsMatchedX(rowTiles)
      this.addResources()
      this.fillMatchedAnimateFalling()
      this.clearMagics()
    },
    magicDestroyColumn (tile) {
      const columnTiles = []
      this.board.tiles.forEach(t => {
        if (tile.y === t.y) {
          columnTiles.push(t.index)
          this.matched.push([t])
        }
      })
      this.markAsMatchedY(columnTiles)
      this.addResources()
      this.fillMatchedAnimateFalling()
      this.clearMagics()
    },
    magicDestroyType (tile) {
      const typeTiles = []
      this.board.tiles.forEach(t => {
        if (tile.type === t.type) {
          typeTiles.push(t.index)
          this.matched.push([t])
        }
      })
      this.markAsMatchedX(typeTiles)
      this.addResources()
      this.fillMatchedAnimateFalling()
      this.clearMagics()
    },
    addResources () {
      // console.log('add res')
      this.matched.forEach(tiles => {
        tiles.forEach(tile => {
          if (tile.type === 1) {
            this.resource1.value += 1
          }
          if (tile.type === 2) {
            this.resource2.value++
          }
          if (tile.type === 3) {
            this.resource3.value++
          }
          if (tile.type === 4) {
            this.resource4.value++
          }
          if (tile.type === 5) {
            this.resource5.value++
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .flex-container {
    width: 532px;
    display: flex;
    flex-wrap: wrap;
    padding: 80px;
    /* background-image: url("../assets/types/dark_pergament.jpg"); */
    /* height: 182px; */
    /* background-position: center; */
    /* background-repeat: no-repeat; */
    /* background-size: cover; */
    background-color: black;
  }
</style>
