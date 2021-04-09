import _ from 'lodash'

export default {
  SET_BOARD: (state, payload) => {
    state.board = payload
  },
  SET_SOURCE: (state, tile) => {
    state.board.source = tile
    state.board.tiles[tile.index].source = true
    // state.board[tile.index].source = true
  },
  SET_TARGET: (state, tile) => {
    state.board.target = tile
  },
  SWAP_TILES: state => {
    const source = _.cloneDeep(state.board.source)
    const target = _.cloneDeep(state.board.target)
    // Swap tiles
    state.board.tiles[source.index].type = target.type
    state.board.tiles[target.index].type = source.type

    // Clear source tile
    state.board.tiles[source.index].source = false
    state.board.source = null
    state.board.target = null
  },
  CLEAR_SOURCE: state => {
    const source = _.cloneDeep(state.board.source)
    state.board.tiles[source.index].source = false
    state.board.source = null
  },
  MARK_MATCHED_X: (state, payload) => {
    payload.forEach(element => {
      state.board.tiles[element].matchedX = true
    })
  },
  MARK_MATCHED_Y: (state, payload) => {
    payload.forEach(element => {
      state.board.tiles[element].matchedY = true
    })
  },
  FILL_EMPTY: (state, payload) => {
    const rowLength = 9
    const matchedByY = []
    let droppingValue = 1
    payload.reverse().forEach(index => {
      if (matchedByY.findIndex(x => x.key === state.board.tiles[index].y) > -1) {
        return false
      }

      // If on 1st row
      if (index < rowLength) {
        // Add random type as there is no tiles above this row
        state.board.tiles[index].type = Math.floor(Math.random() * 5) + 1
        state.board.tiles[index].matchedX = false
        state.board.tiles[index].matchedY = false
        state.board.tiles[index].dropping = droppingValue
        return false
      }

      let currentTileIndex = index
      do {
        // above tile index
        let aboveTileIndex = currentTileIndex - rowLength

        // Horizontal matching
        // (TEST) Both two rows above are matched X
        // if (aboveTileIndex >= 0 && state.board.tiles[aboveTileIndex].matchedX === true && aboveTileIndex - rowLength >= 0 && state.board.tiles[aboveTileIndex - rowLength].matchedX === true) {
        // 3 rows above tile index
        // aboveTileIndex = currentTileIndex - 3 * rowLength
        // }

        // Above row is matched too
        if (aboveTileIndex >= 0 && state.board.tiles[aboveTileIndex].matchedX === true) {
          // 2 rows above tile index
          aboveTileIndex = currentTileIndex - 2 * rowLength
          droppingValue = 2
        }

        // Current tile is matching x
        // if (currentTileIndex > 0 && state.board.tiles[currentTileIndex].matchedX === true) {
        //   aboveTileIndex = currentTileIndex - rowLength
        // }

        // Vertical matching
        if (currentTileIndex >= 0 && state.board.tiles[currentTileIndex].matchedY === true) {
          aboveTileIndex = currentTileIndex - 3 * rowLength
          droppingValue = 3

          // Match 4 column
          if (currentTileIndex - 3 * rowLength >= 0 && state.board.tiles[currentTileIndex - 3 * rowLength].matchedY === true) {
            aboveTileIndex = currentTileIndex - 4 * rowLength
            console.log('m4', currentTileIndex)
            droppingValue = 4
          }
          // Match 5 column
          if (currentTileIndex - 4 * rowLength >= 0 && state.board.tiles[currentTileIndex - 4 * rowLength].matchedY === true) {
            aboveTileIndex = currentTileIndex - 5 * rowLength
            console.log('m5', currentTileIndex)
            droppingValue = 5
          }
          // Match 6 column
          if (currentTileIndex - 5 * rowLength >= 0 && state.board.tiles[currentTileIndex - 5 * rowLength].matchedY === true) {
            aboveTileIndex = currentTileIndex - 6 * rowLength
            droppingValue = 6
          }
          // Match 7 column
          if (currentTileIndex - 6 * rowLength >= 0 && state.board.tiles[currentTileIndex - 6 * rowLength].matchedY === true) {
            aboveTileIndex = currentTileIndex - 7 * rowLength
            droppingValue = 7
          }
          // Match 8 column
          if (currentTileIndex - 7 * rowLength >= 0 && state.board.tiles[currentTileIndex - 7 * rowLength].matchedY === true) {
            aboveTileIndex = currentTileIndex - 8 * rowLength
            droppingValue = 8
          }
          // Match 9 column
          if (currentTileIndex - 8 * rowLength >= 0 && state.board.tiles[currentTileIndex - 8 * rowLength].matchedY === true) {
            aboveTileIndex = currentTileIndex - 9 * rowLength
            droppingValue = 9
          }

          if (matchedByY.findIndex(x => x.key === state.board.tiles[currentTileIndex].y) < 0) {
            // if (_.indexOf(matchedByY, state.board.tiles[currentTileIndex].y, false) === -1) {
            // matchedByY.push(state.board.tiles[currentTileIndex].y)
            matchedByY.push({
              key: state.board.tiles[currentTileIndex].y,
              value: droppingValue
            })
          }
        }

        // Above vertical match
        const pos = matchedByY.findIndex(x => x.key === state.board.tiles[currentTileIndex].y)
        if (pos > -1) {
          aboveTileIndex = currentTileIndex - matchedByY[pos].value * rowLength
        }

        // If there is no above row, add random type
        if (aboveTileIndex < 0) {
          state.board.tiles[currentTileIndex].type = Math.floor(Math.random() * 5) + 1
          // TEST
          // state.board.tiles[currentTileIndex].type = 1
        }

        // Assign (1, 2, 3..)above tile to current one
        if (aboveTileIndex >= 0 && currentTileIndex > rowLength) {
          state.board.tiles[currentTileIndex].type = state.board.tiles[aboveTileIndex].type
        }

        state.board.tiles[currentTileIndex].matchedX = false
        state.board.tiles[currentTileIndex].matchedY = false
        state.board.tiles[currentTileIndex].dropping = droppingValue
        currentTileIndex = currentTileIndex - rowLength
      } while (currentTileIndex >= 0)
    })
  },
  // const rowM = 9
  // payload.reverse().forEach(index => {
  //   if (index < rowM) {
  //     state.board.tiles[index].type = Math.floor(Math.random() * 5) + 1
  //     state.board.tiles[index].matchedX = false
  //     state.board.tiles[index].matchedY = false
  //     state.board.tiles[index].dropping = true
  //     return false
  //   }
  //   let d = index
  //   do {
  //     let getTop = d - rowM
  //     if (getTop >= 0 && state.board.tiles[getTop].matchedX === true) {
  //       getTop = d - 2 * rowM
  //     }

  //     // Vertical matching
  //     if (getTop >= 0 && state.board.tiles[getTop].matchedY === true) {
  //       // 4 for 3 matches, 5 for 4 and 6 for 5 matches
  //       getTop = d - 4 * rowM
  //       console.log('calculate getTop by d')
  //       console.log(d)
  //       if (getTop === 7) {
  //         console.log(state.board.tiles[getTop])
  //       }
  //       console.log(getTop)
  //     }

  //     if (getTop < 0) {
  //       state.board.tiles[d].type = Math.floor(Math.random() * 5) + 1
  //     }
  //     if (getTop >= 0 && d >= rowM) {
  //       state.board.tiles[d].type = state.board.tiles[getTop].type
  //     }
  //     state.board.tiles[d].matchedX = false
  //     state.board.tiles[d].matchedY = false
  //     state.board.tiles[d].dropping = true
  //     d = d - rowM
  //   } while (d >= 0)
  // })
  // },
  CLEAR_DROPPING: state => {
    state.board.tiles.forEach(tile => {
      state.board.tiles[tile.index].dropping = false
    })
  }
}
