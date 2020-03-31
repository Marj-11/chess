<template>
  <div class="chessboard">
    <div
      v-for="field in fields"
      :key="field.id"
      :class="[field.class, field.color]"
      :id="field.id"
    ></div>
  </div>
</template>

<script>
import pieces from "@/components/Pieces";

export default {
  data() {
    return {
      imageUrl:
        "https://raw.githubusercontent.com/Marj-11/chess/master/wikipedia/",
      fields: [],
      x: ["8", "7", "6", "5", "4", "3", "2", "1"],
      y: ["a", "b", "c", "d", "e", "f", "g", "h"],
      color: "",
      class: "square",
      moves: [],
      droppable: false
    };
  },
  methods: {
    drawChessboard() {
      for (let row = 0; row < this.x.length; row++) {
        this.color = row % 2 === 0 ? "black_square" : "white_square";
        for (let field = 1; field < 9; field++) {
          this.color =
            this.color === "black_square" ? "white_square" : "black_square";
          const object = {
            id: this.y[field - 1] + this.x[row],
            color: this.color,
            class: this.class
          };
          this.fields.push(object);
        }
      }
    },

    placePieces() {
      const squares = document.querySelectorAll(".square");
      const entries = Object.values(pieces);
      squares.forEach(square => {
        square.onmousedown = this.mouseDown;
        let img = new Image();
        entries.forEach(piece => {
          if (square.id === piece.position) {
            img.src = this.imageUrl + piece.imageUrl;
            img.id = square.id;
            img.draggable = true;
            img.classList =
              img.src.charAt(img.src.length - 6) == "b" ? "black" : "white";
            square.appendChild(img);
          }
        });
      });
    },

    /////////////////////////////////////////////MOUSE DOWN////////////////////////////////////////////////////////////
    mouseDown(event) {
      const squares = document.querySelectorAll(".square");

      squares.forEach(s => {
        s.classList.remove("droppable");
        s.classList.remove("mark");
      });

      const square = event.path[1];
      let piece = square.firstElementChild;
      let new_piece = this.selected_piece(piece, square);
      this.available_moves(new_piece);

      piece.style.width = "70px";
      piece.style.cursor = "grabbing";
      piece.style.position = "absolute";
      piece.style.zIndex = 1000;
      console.log(this.moves);

      this.moves[0].forEach(allowed => {
        squares.forEach(s => {
          if (allowed === s.id) {
            s.classList.add("droppable");
            s.classList.add("mark");
            setTimeout(() => {
              s.classList.remove("mark");
            }, 2000);
          }
        });
      });
      this.moves = [];
      let currentDroppable = null;
      let shiftX = event.clientX - piece.getBoundingClientRect().left;
      let shiftY = event.clientY - piece.getBoundingClientRect().top;

      moveAt(event.pageX, event.pageY);
      function moveAt(pageX, pageY) {
        square.style.position = null;

        piece.style.left = pageX - shiftX + "px";
        piece.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        piece.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        piece.hidden = false;
        let droppableBelow = elemBelow.closest(".droppable");
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            if (currentDroppable.classList.contains("droppable")) {
              piece.onmouseup = function(e) {
                document.removeEventListener("mousemove", onMouseMove);
                piece.onmouseup = null;
                piece.style.width = "62px";
                piece.style.cursor = "grab";
                piece.setAttribute("id", currentDroppable.id);
                currentDroppable.appendChild(piece);
                currentDroppable.style.position = "relative";
                piece.style.position = "absolute";
                piece.style.top = "0px";
                piece.style.left = "0px";
                piece.style.boxSizing = "border-box";
                currentDroppable.style.border = "none";
                squares.forEach(s => {
                  s.classList.remove("mark");
                });
              };
            }
            enterDroppable(currentDroppable);
          }
        }
      }

      document.addEventListener("mousemove", onMouseMove);

      piece.onmouseup = function(e) {
        document.removeEventListener("mousemove", onMouseMove);
        piece.onmouseup = null;
        piece.style.width = "62px";
        piece.style.cursor = "grab";

        square.style.position = "relative";
        piece.style.position = "absolute";
        piece.style.top = "0px";
        piece.style.left = "0px";
      };

      function enterDroppable(elem) {
        elem.style.border = "3px solid white";
        elem.style.boxSizing = "border-box";
      }

      function leaveDroppable(elem) {
        elem.style.border = "none";
      }

      piece.ondragstart = function() {
        return false;
      };
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////METHODS/////////////////////////////////////////////////////////
    selected_piece(new_piece, position_square) {
      let selected_piece_letter = new_piece.src.charAt(
        new_piece.src.length - 5
      );
      let selected_piece_color = new_piece.src.charAt(new_piece.src.length - 6);
      let selected_piece_position = position_square.id;
      let selected_piece_initial = `${selected_piece_color}${selected_piece_letter}`;
      return {selected_piece_initial, selected_piece_position};
    },

    available_moves(selectedPiece) {
      const squares = document.querySelectorAll(".square");
      if (selectedPiece.selected_piece_initial === "wP") {
        const forward = +1;
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
        const oneForward = `${letter}${num + forward}`;
        const twoForward = `${letter}${num + forward + forward}`;

        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let i = 0; i < letters.length; i++) {
          const element = letters[i];
          if (element === letter) {
            const letterLeft = `${letters[i - 1]}${num + forward}`;
            const letterRight = `${letters[i + 1]}${num + forward}`;
            const fields = {
              l: letterLeft.substring(1, 2) == "9" ? null : letterLeft,
              r: letterRight.substring(0, 2) == "un" ? null : letterRight,
              of: oneForward.substring(1, 2) == "9" ? null : oneForward,
              tf: twoForward.substring(1, 2) == "9" ? null : twoForward
            };
            const finalMoves = [];
            squares.forEach(square => {
              if (square.id === fields.r) {
                if (square.firstElementChild) {
                  if (square.firstElementChild.classList[0] === "black") {
                    finalMoves.push(fields.r);
                  }
                }
              }
              if (square.id === fields.l) {
                if (square.firstElementChild) {
                  if (square.firstElementChild.classList[0] === "black") {
                    finalMoves.push(fields.l);
                  }
                }
              }

              if (square.id === fields.of) {
                if (!square.firstElementChild) {
                  finalMoves.push(fields.of);
                } else {
                  finalMoves.pop();
                }
              }

              if (
                selectedPiece.selected_piece_position.substring(1, 2) == "2"
              ) {
                if (square.id === fields.tf) {
                  if (!square.firstElementChild) {
                    finalMoves.push(fields.tf);
                  }
                }
              }
            });
            this.moves.push(finalMoves);
          }
        }
      }
      if (selectedPiece.selected_piece_initial === "wN") {
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let i = 0; i < letters.length; i++) {
          const element = letters[i];
          if (element === letter) {
            const fields = {
              one: `${letters[i - 1]}${num + 2}`,
              two: `${letters[i - 2]}${num + 1}`,
              three: `${letters[i - 2]}${num - 1}`,
              four: `${letters[i - 1]}${num - 2}`,
              five: `${letters[i + 1]}${num - 2}`,
              six: `${letters[i + 2]}${num - 1}`,
              seven: `${letters[i + 2]}${num + 1}`,
              eight: `${letters[i + 1]}${num + 2}`
            };
            const finalMoves = [];
            const obj = Object.values(fields);
            for (let i = 0; i < obj.length; i++) {
              const element = obj[i];
              squares.forEach(square => {
                if (square.id === element) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(element);
                    }
                  } else {
                    finalMoves.push(element);
                  }
                }
              });
            }
            this.moves.push(finalMoves);
          }
        }
      }

      if (selectedPiece.selected_piece_initial === "wB") {
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

        let finalMoves = [];

        let objectNumber = 0;
        let m = 1;
        function direction() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const objects = {
                one: `${letters[i + m]}${num - m}`,
                two: `${letters[i + m]}${num + m}`,
                three: `${letters[i - m]}${num + m}`,
                four: `${letters[i - m]}${num - m}`
              };
              m++;

              const forbiden = [
                "a1",
                "a2",
                "a3",
                "a4",
                "a5",
                "a6",
                "a7",
                "a8",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "h7",
                "h8",
                "a1",
                "b1",
                "c1",
                "d1",
                "e1",
                "f1",
                "g1",
                "h1",
                "a8",
                "b8",
                "c8",
                "d8",
                "e8",
                "f8",
                "g8",
                "h8"
              ];
              squares.forEach(square => {
                const obj = objects[Object.keys(objects)[objectNumber]];
                console.log(obj);

                if (obj === "undefined2") {
                  objectNumber++;
                  objectNumber++;
                  m = 1;
                  direction();
                } else {
                  if (square.id === obj) {
                    if (square.firstElementChild) {
                      m = 1;
                      if (square.firstElementChild.classList[0] === "black") {
                        finalMoves.push(obj);
                        objectNumber++;

                        direction();
                      } else {
                        objectNumber++;
                        direction();
                      }
                    } else {
                      forbiden.forEach(forbid => {
                        if (obj === forbid) {
                          objectNumber++;
                          m = 1;
                          direction();
                        }
                      });
                      finalMoves.push(obj);
                      direction();
                    }
                  }
                }
              });
            }
          }
        }

        direction();
        this.moves.push(finalMoves);
      }
      if (selectedPiece.selected_piece_initial === "wR") {
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

        let finalMoves = [];

        let g = 1;
        function directionOne() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i + g]}${num}`;
              g++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);

                    directionOne();
                  }
                }
              });
            }
          }
        }
        let n = 1;
        function directionTwo() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i]}${num + n}`;
              n++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionTwo();
                  }
                }
              });
            }
          }
        }
        let h = 1;
        function directionThree() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i - h]}${num}`;
              h++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionThree();
                  }
                }
              });
            }
          }
        }
        let k = 1;
        function directionFour() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i]}${num - k}`;
              k++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionFour();
                  }
                }
              });
            }
          }
        }
        directionOne();
        directionTwo();
        directionThree();
        directionFour();

        this.moves.push(finalMoves);
      }
      if (selectedPiece.selected_piece_initial === "wQ") {
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

        let finalMoves = [];

        let g = 1;
        function directionOne() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i + g]}${num - g}`;
              g++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);

                    directionOne();
                  }
                }
              });
            }
          }
        }

        let n = 1;
        function directionTwo() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i + n]}${num + n}`;
              n++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionTwo();
                  }
                }
              });
            }
          }
        }
        let h = 1;
        function directionThree() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i - h]}${num + h}`;
              h++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionThree();
                  }
                }
              });
            }
          }
        }
        let k = 1;
        function directionFour() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i - k]}${num - k}`;
              k++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionFour();
                  }
                }
              });
            }
          }
        }
        let w = 1;
        function directionFive() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i + w]}${num}`;
              w++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);

                    directionFive();
                  }
                }
              });
            }
          }
        }
        let z = 1;
        function directionSix() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i]}${num + z}`;
              z++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionSix();
                  }
                }
              });
            }
          }
        }
        let o = 1;
        function directionSeven() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i - o]}${num}`;
              o++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionSeven();
                  }
                }
              });
            }
          }
        }
        let p = 1;
        function directionEight() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const one = `${letters[i]}${num - p}`;
              p++;
              squares.forEach(square => {
                if (square.id === one) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(one);
                    }
                  } else {
                    finalMoves.push(one);
                    directionEight();
                  }
                }
              });
            }
          }
        }
        directionOne();
        directionTwo();
        directionThree();
        directionFour();
        directionFive();
        directionSix();
        directionSeven();
        directionEight();
        this.moves.push(finalMoves);
      }
      if (selectedPiece.selected_piece_initial === "wK") {
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

        let finalMoves = [];

        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let i = 0; i < letters.length; i++) {
          const element = letters[i];
          if (element === letter) {
            const fields = {
              forward: `${letter}${num + 1}`,
              backward: `${letter}${num - 1}`,
              left: `${letters[i - 1]}${num}`,
              right: `${letters[i + 1]}${num}`,
              upRight: `${letters[i + 1]}${num + 1}`,
              upLeft: `${letters[i - 1]}${num + 1}`,
              downRight: `${letters[i + 1]}${num - 1}`,
              downLeft: `${letters[i - 1]}${num - 1}`
            };
            const objects = Object.values(fields);
            objects.forEach(obj => {
              squares.forEach(square => {
                if (square.id === obj) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === "black") {
                      finalMoves.push(obj);
                    }
                  } else {
                    finalMoves.push(obj);
                  }
                }
              });
            });
          }
        }
        this.moves.push(finalMoves);
      }
    }
  },
  computed: {},

  created() {
    this.drawChessboard();
  },
  mounted() {
    this.placePieces();
  }
};
</script>

<style>
.chessboard {
  height: 500px;
  width: 500px;
  margin: 20px auto;
  border: 3px solid black;
}

.black_square {
  float: left;
  height: calc(500px / 8);
  width: calc(500px / 8);
  background-color: rgb(22, 139, 168);
}

.white_square {
  float: left;
  height: calc(500px / 8);
  width: calc(500px / 8);
  background-color: rgb(117, 255, 255);
}

.black_square img,
.white_square img {
  width: 62px;
  cursor: grab;
}
.mark::after {
  display: block;
  content: " ";
  margin: 20px auto;
  width: 20px;
  height: 20px;
  background: rgb(85, 85, 85);
  border-radius: 50%;
}
</style>
