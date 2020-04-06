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
        "https://raw.githubusercontent.com/Marj-11/chess-final/master/src/assets/",
      fields: [],
      x: ["8", "7", "6", "5", "4", "3", "2", "1"],
      y: ["a", "b", "c", "d", "e", "f", "g", "h"],
      color: "",
      class: ["square", "whiteS"],
      moves: [],

      droppable: false,
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
            class: this.class,
          };
          this.fields.push(object);
        }
      }
    },

    placePieces() {
      const squares = document.querySelectorAll(".square");
      const entries = Object.values(pieces);
      squares.forEach((square) => {
        square.onmousedown = this.mouseDown;
        let img = new Image();
        entries.forEach((piece) => {
          if (square.id === piece.position) {
            img.src = this.imageUrl + piece.imageUrl;
            img.id = square.id;
            img.draggable = true;
            img.style.position = "absolute";
            img.classList =
              img.src.charAt(img.src.length - 6) == "b" ? "black" : "white";

            square.appendChild(img);
          }
        });
      });
    },

    /////////////////////////////////////////////MOUSE DOWN////////////////////////////////////////////////////////////
    mouseDown(event) {
      const chess = document.querySelector(".chessboard");
      chess.addEventListener("contextmenu", (event) => event.preventDefault());
      event.preventDefault();
      const squares = document.querySelectorAll(".square");

      squares.forEach((s) => {
        s.classList.remove("droppable");
        s.classList.remove("mark");
        s.classList.remove("target");
      });

      const square = event.path[1];

      let piece = square.firstElementChild;

      if (piece.tagName == "DIV") {
        return;
      }
      if (event.button == 0) {
        let new_piece = this.selected_piece(piece, square);

        this.available_moves(new_piece);
        piece.style.width = "70px";
        piece.style.zIndex = 2;
        piece.style.cursor = "grabbing";
        piece.style.position = "absolute";
        this.moves[0].forEach((allowed) => {
          squares.forEach((s) => {
            if (allowed === s.id) {
              s.classList.add("droppable");
              s.classList.add("mark");
              if (s.firstElementChild) {
                s.classList.add("target");
              }
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
          if (
            event.pageX < 150 ||
            event.pageX > 900 ||
            event.pageY < 20 ||
            event.pageY > 550
          ) {
            document.removeEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onmouseup);
            piece.style.width = "62px";
            piece.style.cursor = "grab";
            square.style.display = "flex";
            square.style.justifyContent = "center";
            square.style.position = "relative";
            piece.style.position = "absolute";
            piece.style.top = "0px";
            piece.style.left = "0px";
          }

          piece.hidden = true;
          let elemBelow = document.elementFromPoint(
            event.clientX,
            event.clientY
          );

          piece.hidden = false;
          let droppableBelow = elemBelow.closest(".droppable");

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;

            if (currentDroppable) {
              if (currentDroppable.classList.contains("droppable")) {
                piece.onmouseup = function (e) {
                  e.preventDefault();
                  if (currentDroppable) {
                    if (!currentDroppable.hasChildNodes()) {
                      this.moves = [];
                      document.removeEventListener("mousemove", onMouseMove);
                      piece.onmouseup = null;
                      piece.style.width = "62px";
                      piece.style.cursor = "grab";
                      piece.style.zIndex = 1;
                      piece.setAttribute("id", currentDroppable.id);
                      currentDroppable.appendChild(piece);
                      currentDroppable.style.position = "relative";
                      piece.style.position = "absolute";
                      piece.style.top = "0px";
                      piece.style.left = "0px";
                      piece.style.boxSizing = "border-box";
                      currentDroppable.style.borderColor = "transparent";
                      squares.forEach((s) => {
                        s.classList.remove("mark");
                        s.classList.remove("target");
                      });
                    } else {
                      currentDroppable.removeChild(currentDroppable.firstChild);
                      document.removeEventListener("mousemove", onMouseMove);
                      piece.onmouseup = null;
                      piece.style.width = "62px";
                      piece.style.cursor = "grab";
                      piece.style.zIndex = 1;
                      piece.setAttribute("id", currentDroppable.id);
                      currentDroppable.appendChild(piece);
                      currentDroppable.style.position = "relative";
                      piece.style.position = "absolute";
                      piece.style.top = "0px";
                      piece.style.left = "0px";
                      piece.style.boxSizing = "border-box";
                      currentDroppable.style.border = "none";
                      squares.forEach((s) => {
                        s.classList.remove("mark");
                        s.classList.remove("target");
                      });
                    }
                  } else {
                    document.removeEventListener("mousemove", onMouseMove);
                    piece.style.width = "62px";
                    piece.style.zIndex = 1;
                    piece.style.cursor = "grab";
                    square.style.position = "relative";
                    piece.style.position = "absolute";
                    piece.style.top = "0px";
                    piece.style.left = "0px";
                  }
                };
              }
              enterDroppable(currentDroppable);
            }
          }
        }

        document.addEventListener("mousemove", onMouseMove);

        piece.onmouseup = function () {
          this.moves = [];
          document.removeEventListener("mousemove", onMouseMove);
          piece.style.zIndex = 1;
          piece.onmouseup = null;
          piece.style.width = "62px";
          piece.style.cursor = "grab";
          square.style.position = "relative";
          piece.style.position = "absolute";
          piece.style.top = "0px";
          piece.style.left = "0px";
        };

        function enterDroppable(elem) {
          elem.style.borderColor = "white";
        }

        function leaveDroppable(elem) {
          elem.style.borderColor = "transparent";
        }

        piece.ondragstart = function () {
          return false;
        };
      }
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
              tf: twoForward.substring(1, 2) == "9" ? null : twoForward,
            };
            const finalMoves = [];
            squares.forEach((square) => {
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
                }
              }

              if (
                selectedPiece.selected_piece_position.substring(1, 2) == "2"
              ) {
                if (square.id === fields.tf) {
                  const numberMinusOne = square.id.substring(1, 2) - 1;
                  const letter = square.id.substring(0, 1);
                  const strigifiedNumber = numberMinusOne.toString();
                  const madeUpId = letter + strigifiedNumber;
                  if (square.firstElementChild) {
                    finalMoves.push(fields.of);
                  } else {
                    finalMoves.push(fields.tf);
                    squares.forEach((s) => {
                      if (s.id === madeUpId) {
                        if (s.firstElementChild) {
                          finalMoves.pop();
                        }
                      }
                    });
                  }
                }
              }
            });
            this.moves.push(finalMoves);
          }
        }
      }
      if (selectedPiece.selected_piece_initial === "bP") {
        const forward = -1;
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
              l: letterLeft.substring(1, 2) == "0" ? null : letterLeft,
              r: letterRight.substring(0, 2) == "un" ? null : letterRight,
              of: oneForward.substring(1, 2) == "0" ? null : oneForward,
              tf: twoForward.substring(1, 2) == "0" ? null : twoForward,
            };
            const finalMoves = [];
            squares.forEach((square) => {
              if (square.id === fields.r) {
                if (square.firstElementChild) {
                  if (square.firstElementChild.classList[0] === "white") {
                    finalMoves.push(fields.r);
                  }
                }
              }
              if (square.id === fields.l) {
                if (square.firstElementChild) {
                  if (square.firstElementChild.classList[0] === "white") {
                    finalMoves.push(fields.l);
                  }
                }
              }

              if (square.id === fields.of) {
                if (!square.firstElementChild) {
                  finalMoves.push(fields.of);
                }
              }

              if (
                selectedPiece.selected_piece_position.substring(1, 2) == "7"
              ) {
                if (square.id === fields.tf) {
                  const numberPlusOne = parseInt(square.id.substring(1, 2));
                  const parsedNumber = numberPlusOne + 1;
                  const letter = square.id.substring(0, 1);
                  const strigifiedNumber = parsedNumber.toString();
                  const madeUpId = letter + strigifiedNumber;
                  if (square.firstElementChild) {
                    finalMoves.push(fields.of);
                  } else {
                    finalMoves.push(fields.tf);
                    squares.forEach((s) => {
                      if (s.id === madeUpId) {
                        if (s.firstElementChild) {
                          finalMoves.pop();
                        }
                      }
                    });
                  }
                }
              }
            });
            this.moves.push(finalMoves);
          }
        }
      }
      if (
        selectedPiece.selected_piece_initial === "wN" ||
        selectedPiece.selected_piece_initial === "bN"
      ) {
        const colorClass =
          selectedPiece.selected_piece_initial === "wN" ? "black" : "white";
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
              eight: `${letters[i + 1]}${num + 2}`,
            };
            const finalMoves = [];
            const obj = Object.values(fields);
            for (let i = 0; i < obj.length; i++) {
              const element = obj[i];
              squares.forEach((square) => {
                if (square.id === element) {
                  if (square.firstElementChild) {
                    if (square.firstElementChild.classList[0] === colorClass) {
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
        "h8",
      ];
      if (
        selectedPiece.selected_piece_initial === "wB" ||
        selectedPiece.selected_piece_initial === "bB"
      ) {
        const colorClass =
          selectedPiece.selected_piece_initial === "wB" ? "black" : "white";
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
        let finalMoves = [];
        let objectNumber = 0;
        let m = 1;
        function diagonal() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const objects = {
                one: `${letters[i + m]}${num - m}`,
                two: `${letters[i + m]}${num + m}`,
                three: `${letters[i - m]}${num + m}`,
                four: `${letters[i - m]}${num - m}`,
              };
              m++;
              squares.forEach((square) => {
                const obj = objects[Object.keys(objects)[objectNumber]];

                if (obj == undefined) {
                  return obj == "undefined";
                }
                if (obj.substring(0, 1) === "u") {
                  objectNumber++;
                  objectNumber++;
                  m = 1;
                  diagonal();
                }
                if (
                  obj.substring(1, 2) === "0" ||
                  obj.substring(1, 2) === "10" ||
                  obj.substring(1, 2) === "9"
                ) {
                  objectNumber++;
                  m = 1;
                  diagonal();
                } else {
                  if (square.id === obj) {
                    if (square.firstElementChild) {
                      m = 1;
                      if (
                        square.firstElementChild.classList[0] === colorClass
                      ) {
                        finalMoves.push(obj);
                        objectNumber++;
                        diagonal();
                      } else {
                        objectNumber++;
                        diagonal();
                      }
                    } else {
                      forbiden.forEach((forbid) => {
                        if (obj === forbid) {
                          objectNumber++;
                          m = 1;
                          diagonal();
                        }
                      });
                      finalMoves.push(obj);
                      diagonal();
                    }
                  }
                }
              });
            }
          }
        }
        diagonal();
        this.moves.push(finalMoves);
      }
      if (
        selectedPiece.selected_piece_initial === "wR" ||
        selectedPiece.selected_piece_initial === "bR"
      ) {
        const colorClass =
          selectedPiece.selected_piece_initial === "wR" ? "black" : "white";
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
        let finalMoves = [];
        let objectNumber = 0;
        let m = 1;
        function straight() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const objects = {
                one: `${letters[i + m]}${num}`,
                two: `${letter}${num + m}`,
                three: `${letters[i - m]}${num}`,
                four: `${letter}${num - m}`,
              };
              m++;
              squares.forEach((square) => {
                const obj = objects[Object.keys(objects)[objectNumber]];
                if (obj == undefined) {
                  return obj == "undefined";
                }
                if (obj.substring(0, 1) === "u") {
                  objectNumber++;
                  m = 1;
                  straight();
                }

                if (
                  obj.substring(1, 2) === "0" ||
                  obj.substring(1, 2) === "10" ||
                  obj.substring(1, 2) === "9"
                ) {
                  objectNumber++;
                  m = 1;
                  straight();
                } else {
                  if (square.id === obj) {
                    if (square.firstElementChild) {
                      m = 1;
                      if (
                        square.firstElementChild.classList[0] === colorClass
                      ) {
                        finalMoves.push(obj);
                        objectNumber++;

                        straight();
                      } else {
                        objectNumber++;
                        m = 1;
                        straight();
                      }
                    } else {
                      finalMoves.push(obj);
                      straight();
                    }
                  }
                }
              });
            }
          }
        }
        straight();
        this.moves.push(finalMoves);
      }
      if (
        selectedPiece.selected_piece_initial === "wQ" ||
        selectedPiece.selected_piece_initial === "bQ"
      ) {
        const colorClass =
          selectedPiece.selected_piece_initial === "wQ" ? "black" : "white";
        this.moves = [];
        const letter = selectedPiece.selected_piece_position.charAt(0);
        const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

        let finalMoves = [];

        let objectNumber = 0;
        let m = 1;
        function diagonal() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const objects = {
                one: `${letters[i + m]}${num - m}`,
                two: `${letters[i + m]}${num + m}`,
                three: `${letters[i - m]}${num + m}`,
                four: `${letters[i - m]}${num - m}`,
              };
              m++;
              squares.forEach((square) => {
                const obj = objects[Object.keys(objects)[objectNumber]];
                if (obj == undefined) {
                  return obj == "undefined";
                }
                if (obj.substring(0, 1) === "u") {
                  objectNumber++;
                  objectNumber++;
                  m = 1;
                  diagonal();
                }
                if (
                  obj.substring(1, 2) === "0" ||
                  obj.substring(1, 2) === "10" ||
                  obj.substring(1, 2) === "9"
                ) {
                  objectNumber++;
                  m = 1;
                  diagonal();
                } else {
                  if (square.id === obj) {
                    if (square.firstElementChild) {
                      m = 1;
                      if (
                        square.firstElementChild.classList[0] === colorClass
                      ) {
                        finalMoves.push(obj);
                        objectNumber++;

                        diagonal();
                      } else {
                        objectNumber++;
                        diagonal();
                      }
                    } else {
                      forbiden.forEach((forbid) => {
                        if (obj === forbid) {
                          objectNumber++;
                          m = 1;
                          diagonal();
                        }
                      });
                      finalMoves.push(obj);
                      diagonal();
                    }
                  }
                }
              });
            }
          }
        }
        let objectNumberStraight = 0;
        let n = 1;
        function straight() {
          const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const objects = {
                one: `${letters[i + n]}${num}`,
                two: `${letter}${num + n}`,
                three: `${letters[i - n]}${num}`,
                four: `${letter}${num - n}`,
              };
              n++;
              squares.forEach((square) => {
                const obj = objects[Object.keys(objects)[objectNumberStraight]];
                if (obj == undefined) {
                  return obj == "undefined";
                }
                if (obj.substring(0, 1) === "u") {
                  objectNumberStraight++;
                  n = 1;
                  straight();
                }
                if (
                  obj.substring(1, 2) === "0" ||
                  obj.substring(1, 2) === "10" ||
                  obj.substring(1, 2) === "9"
                ) {
                  objectNumberStraight++;
                  n = 1;
                  straight();
                } else {
                  if (square.id === obj) {
                    if (square.firstElementChild) {
                      n = 1;
                      if (
                        square.firstElementChild.classList[0] === colorClass
                      ) {
                        finalMoves.push(obj);
                        objectNumberStraight++;
                        straight();
                      } else {
                        objectNumberStraight++;
                        n = 1;
                        straight();
                      }
                    } else {
                      finalMoves.push(obj);
                      straight();
                    }
                  }
                }
              });
            }
          }
        }

        diagonal();
        straight();
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
              downLeft: `${letters[i - 1]}${num - 1}`,
            };
            const objects = Object.values(fields);
            objects.forEach((obj) => {
              squares.forEach((square) => {
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
    },
  },
  computed: {},

  created() {
    this.drawChessboard();
  },
  mounted() {
    this.placePieces();
  },
};
</script>

<style>
:root {
  --square_size: 500px;
}
.chessboard {
  height: var(--square_size);
  width: var(--square_size);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.black_square {
  height: calc(var(--square_size) / 8);
  width: calc(var(--square_size) / 8);
  background-color: rgb(26, 111, 160);
}

.white_square {
  height: calc(var(--square_size) / 8);
  width: calc(var(--square_size) / 8);
  background-color: rgb(0, 195, 255);
}

img {
  width: 62px;
  cursor: grab;
  z-index: 1;
  margin-top: -1.5px;
  margin-left: -2px;
}
.whiteS {
  border: 2px transparent solid;
  box-sizing: border-box;
}
.mark::after {
  display: block;
  content: " ";
  margin: 18.5px auto;
  width: 22px;
  height: 22px;
  background: rgba(85, 85, 85, 0.5);
  border-radius: 50%;
  z-index: 0;
}
.target::after {
  display: block;
  content: " ";
  margin: 16px auto;
  width: 28px;
  height: 28px;
  background: rgba(255, 74, 74, 0.5);
  border-radius: 50%;
  z-index: 0;
}
</style>
