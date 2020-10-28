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
// import pieces from '@/services/pieces.js';

export default {
  data() {
    return {
      entries: [
        {
          imageUrl: 'bR.png',
          start_position: 'a8',
          new_position: 'a8',
          captured: false,
        },
        {
          imageUrl: 'bR.png',
          start_position: 'h8',
          new_position: 'h8',
          captured: false,
        },
        {
          imageUrl: 'bN.png',
          start_position: 'b8',
          new_position: 'b8',
          captured: false,
        },
        {
          imageUrl: 'bN.png',
          start_position: 'g8',
          new_position: 'g8',
          captured: false,
        },
        {
          imageUrl: 'bB.png',
          start_position: 'c8',
          new_position: 'c8',
          captured: false,
        },
        {
          imageUrl: 'bB.png',
          start_position: 'f8',
          new_position: 'f8',
          captured: false,
        },
        {
          imageUrl: 'bQ.png',
          start_position: 'd8',
          new_position: 'd8',
          captured: false,
        },
        {
          imageUrl: 'bK.png',
          start_position: 'e8',
          new_position: 'e8',
          black_checkmate: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'a7',
          new_position: 'a7',
          captured: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'b7',
          new_position: 'b7',
          captured: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'c7',
          new_position: 'c7',
          captured: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'd7',
          new_position: 'd7',
          captured: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'e7',
          new_position: 'e7',
          captured: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'f7',
          new_position: 'f7',
          captured: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'g7',
          new_position: 'g7',
          captured: false,
        },
        {
          imageUrl: 'bP.png',
          start_position: 'h7',
          new_position: 'h7',
          captured: false,
        },
        {
          imageUrl: 'wR.png',
          start_position: 'a1',
          new_position: 'a1',
          captured: false,
        },
        {
          imageUrl: 'wR.png',
          start_position: 'h1',
          new_position: 'h1',
          captured: false,
        },
        {
          imageUrl: 'wN.png',
          start_position: 'b1',
          new_position: 'b1',
          captured: false,
        },
        {
          imageUrl: 'wN.png',
          start_position: 'g1',
          new_position: 'g1',
          captured: false,
        },
        {
          imageUrl: 'wB.png',
          start_position: 'c1',
          new_position: 'c1',
          captured: false,
        },
        {
          imageUrl: 'wB.png',
          start_position: 'f1',
          new_position: 'f1',
          captured: false,
        },
        {
          imageUrl: 'wQ.png',
          start_position: 'd1',
          new_position: 'd1',
          captured: false,
        },
        {
          imageUrl: 'wK.png',
          start_position: 'e1',
          new_position: 'e1',
          white_checkmate: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'a2',
          new_position: 'a2',
          captured: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'b2',
          new_position: 'b2',
          captured: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'c2',
          new_position: 'c2',
          captured: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'd2',
          new_position: 'd2',
          captured: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'e2',
          new_position: 'e2',
          captured: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'f2',
          new_position: 'f2',
          captured: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'g2',
          new_position: 'g2',
          captured: false,
        },
        {
          imageUrl: 'wP.png',
          start_position: 'h2',
          new_position: 'h2',
          captured: false,
        },
      ],
      // imageUrl:
      //   "https://raw.githubusercontent.com/Marj-11/chess-final/master/src/assets/",
      imageUrl:
        'https://raw.githubusercontent.com/Marj-11/chess/master/wikipedia/',
      fields: [],
      x: ['8', '7', '6', '5', '4', '3', '2', '1'],
      y: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      color: '',
      class: ['square', 'whiteS'],
      moves: [],
      count: 0,
      similar: [],
      recorded_moves: [],
      white_moves: [],
      black_moves: [],
      whiteToPlay: true,
      checkmate_moves: [],
      white_king_checked: false,
      black_king_checked: false,
      white_checkmate: false,
      black_checkmate: false,
    };
  },
  methods: {
    drawChessboard() {
      for (let row = 0; row < this.x.length; row++) {
        this.color = row % 2 === 0 ? 'black_square' : 'white_square';
        for (let field = 1; field < 9; field++) {
          this.color =
            this.color === 'black_square' ? 'white_square' : 'black_square';
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
      const squares = document.querySelectorAll('.square');
      squares.forEach((square) => {
        square.onmousedown = this.mouseDown;
        let img = new Image();
        Object.values(this.entries).forEach((piece) => {
          if (square.id === piece.start_position) {
            img.src = this.imageUrl + piece.imageUrl;
            img.alt = piece.imageUrl.substring(0, 2);
            img.id = square.id;
            img.draggable = true;
            img.style.position = 'absolute';
            img.classList =
              img.src.charAt(img.src.length - 6) == 'b' ? 'black' : 'white';
            square.appendChild(img);
          }
        });
      });
    },
    render_new_position() {
      const squares = document.querySelectorAll('.square');
      squares.forEach((child) => {
        child.innerHTML = '';
      });
      squares.forEach((square) => {
        square.onmousedown = this.mouseDown;
        let img = new Image();
        Object.values(this.entries).forEach((piece) => {
          if (square.id === piece.new_position && !piece.captured) {
            img.src = this.imageUrl + piece.imageUrl;
            img.alt = piece.imageUrl.substring(0, 2);
            img.id = square.id;
            img.draggable = true;
            img.style.position = 'absolute';
            img.classList =
              img.src.charAt(img.src.length - 6) == 'b' ? 'black' : 'white';
            square.appendChild(img);
          }
        });
      });
    },

    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //###################### mouse down ####################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    mouseDown(event) {
      let entries = this.entries;
      let func = this.render_new_position;
      function render() {
        func();
      }

      const chess = document.querySelector('.chessboard');
      chess.addEventListener('contextmenu', (event) => event.preventDefault());
      event.preventDefault();
      const squares = document.querySelectorAll('.square');
      squares.forEach((s) => {
        s.classList.remove('droppable');
        s.classList.remove('mark');
        s.classList.remove('target');
      });

      const square = event.path[1];
      let piece = square.firstElementChild;

      if (piece.tagName == 'DIV') {
        return;
      }
      if (event.button == 0) {
        let new_piece = this.selected_piece(piece, square);
        this.available_moves(new_piece);
        piece.style.width = '70px';
        piece.style.zIndex = 2;
        piece.style.cursor = 'grabbing';
        piece.style.position = 'absolute';
        this.moves[0].forEach((allowed) => {
          squares.forEach((s) => {
            if (piece.classList[0] === 'white' && this.whiteToPlay) {
              if (allowed === s.id) {
                s.classList.add('droppable');
                s.classList.add('mark');
                if (s.firstElementChild) {
                  s.classList.add('target');
                }
              }
            }
            if (piece.classList[0] === 'black' && !this.whiteToPlay) {
              if (allowed === s.id) {
                s.classList.add('droppable');
                s.classList.add('mark');
                if (s.firstElementChild) {
                  s.classList.add('target');
                }
              }
            }
          });
        });

        //######################################################
        //######################################################
        //###################### mouse event ###################
        //######################################################
        //######################################################
        //######################################################
        let self = this;
        let currentDroppable = null;
        let shiftX = event.clientX - piece.getBoundingClientRect().left;
        let shiftY = event.clientY - piece.getBoundingClientRect().top;

        moveAt(event.pageX, event.pageY);
        function moveAt(pageX, pageY) {
          square.style.position = null;
          piece.style.left = pageX - shiftX + 'px';
          piece.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
          if (
            event.pageX < 150 ||
            event.pageX > 900 ||
            event.pageY < 20 ||
            event.pageY > 550
          ) {
            document.removeEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onmouseup);
            piece.style.width = '62px';
            piece.style.cursor = 'grab';
            square.style.display = 'flex';
            piece.setAttribute('id', square.id);
            square.appendChild(piece);
            square.style.justifyContent = 'center';
            square.style.position = 'relative';
            piece.style.position = 'absolute';
            piece.style.top = '0px';
            piece.style.left = '0px';
          }
          piece.hidden = true;
          let elemBelow = document.elementFromPoint(
            event.clientX,
            event.clientY
          );
          piece.hidden = false;
          //######################################################
          //######################################################
          //######################################################
          //################# mouse event ends ###################
          //######################################################
          //######################################################
          //######################################################
          let droppableBelow = elemBelow.closest('.droppable');

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
              if (
                (piece.classList[0] === 'white' && self.whiteToPlay) ||
                (piece.classList[0] === 'black' && !self.whiteToPlay)
              ) {
                get_moves();

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                if (!self.white_king_checked || !self.black_king_checked) {
                  piece.onmouseup = function(e) {
                    e.preventDefault();
                    self.white_king_checked = false;
                    self.black_king_checked = false;
                    if (currentDroppable) {
                      if (piece.alt.charAt(0) === 'b') {
                        self.whiteToPlay = true;
                      } else {
                        self.whiteToPlay = false;
                      }

                      document.removeEventListener('mousemove', onMouseMove);
                      piece.onmouseup = null;
                      piece.style.width = '62px';
                      piece.style.cursor = 'grab';
                      piece.style.zIndex = 1;
                      const takenPiece = currentDroppable.firstChild;
                      Object.values(entries).forEach((entryPiece1) => {
                        if (
                          takenPiece !== null &&
                          takenPiece.id === entryPiece1.new_position
                        ) {
                          entryPiece1.captured = true;
                          render();
                        }
                      });
                      Object.values(entries).forEach((entryPiece) => {
                        if (piece.id === entryPiece.new_position) {
                          entryPiece.new_position = currentDroppable.id;
                          render();
                        }
                      });
                      currentDroppable.style.position = 'relative';
                      piece.style.position = 'absolute';
                      piece.style.top = '0px';
                      piece.style.left = '0px';
                      currentDroppable.style.boxSizing = 'border-box';
                      currentDroppable.style.borderColor = 'transparent';

                      // let currentSquare = currentDroppable;
                      // let currentPiece = currentDroppable.firstElementChild;
                      // let new_piece = self.selected_piece(
                      //   currentPiece,
                      //   currentSquare
                      // );

                      self.available_moves(new_piece);

                      squares.forEach((s) => {
                        if (s.firstElementChild === null) {
                          return;
                        }
                        self.moves[0].forEach((e) => {
                          if (
                            s.firstElementChild.alt === 'bK' &&
                            s.firstElementChild.id === e
                          ) {
                            self.black_king_checked = true;
                          }
                          if (
                            s.firstElementChild.alt === 'wK' &&
                            s.firstElementChild.id === e
                          ) {
                            self.white_king_checked = true;
                          }
                        });
                      });
                    } else {
                      document.removeEventListener('mousemove', onMouseMove);
                      piece.style.width = '62px';
                      piece.style.zIndex = 1;
                      piece.style.cursor = 'grab';
                      square.style.position = 'relative';
                      piece.style.position = 'absolute';
                      piece.style.top = '0px';
                      piece.style.left = '0px';
                    }
                  };
                }
              }
            }
            enterDroppable(currentDroppable);
          }
        }

        document.addEventListener('mousemove', onMouseMove);
        piece.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          piece.style.zIndex = 1;
          piece.onmouseup = null;
          piece.style.width = '62px';
          piece.style.cursor = 'grab';
          square.style.position = 'relative';
          piece.style.position = 'absolute';
          piece.style.top = '0px';
          piece.style.left = '0px';
        };

        //######################################################
        //######################################################
        //######################################################
        //############## internal functions ####################
        //######################################################
        //######################################################
        //######################################################
        function enterDroppable(elem) {
          if (elem == null) {
            return;
          }
          // enterMethod();

          elem.style.borderColor = 'white';
        }

        function leaveDroppable(elem) {
          // if (elem == null) {
          //   return;
          // }

          elem.style.borderColor = 'transparent';
        }

        piece.ondragstart = function() {
          return false;
        };
      }
      let self = this;
      function get_moves() {
        self.white_moves = [];
        self.black_moves = [];
        let check = true;
        const forbiden = [
          'a1',
          'a2',
          'a3',
          'a4',
          'a5',
          'a6',
          'a7',
          'a8',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'h7',
          'h8',
          'a1',
          'b1',
          'c1',
          'd1',
          'e1',
          'f1',
          'g1',
          'h1',
          'a8',
          'b8',
          'c8',
          'd8',
          'e8',
          'f8',
          'g8',
          'h8',
        ];
        squares.forEach((square) => {
          if (square.firstElementChild === null) {
            return;
          }

          let selected_piece_position = square.firstElementChild.id;
          let selected_piece_initial = square.firstElementChild.alt;
          let selectedPiece = {
            selected_piece_initial,
            selected_piece_position,
          };
          if (selectedPiece.selected_piece_initial === 'wP') {
            self.get_white_pawn_moves(selectedPiece, check);
          }
          if (selectedPiece.selected_piece_initial === 'wN') {
            self.get_knight_moves(selectedPiece, check, 'w');
          }
          if (selectedPiece.selected_piece_initial === 'wB') {
            self.get_bishop_moves(selectedPiece, forbiden, check, 'w');
          }
          if (selectedPiece.selected_piece_initial === 'wR') {
            self.get_rook_moves(selectedPiece, forbiden, check, 'w');
          }
          if (selectedPiece.selected_piece_initial === 'wQ') {
            self.get_queen_moves(selectedPiece, forbiden, check, 'w');
          }
          if (selectedPiece.selected_piece_initial === 'wK') {
            self.get_white_king_moves(selectedPiece, check);
          }
          if (selectedPiece.selected_piece_initial === 'bP') {
            self.get_black_pawn_moves(selectedPiece, check);
          }
          if (selectedPiece.selected_piece_initial === 'bN') {
            self.get_knight_moves(selectedPiece, check, 'b');
          }
          if (selectedPiece.selected_piece_initial === 'bB') {
            self.get_bishop_moves(selectedPiece, forbiden, check, 'b');
          }
          if (selectedPiece.selected_piece_initial === 'bR') {
            self.get_rook_moves(selectedPiece, forbiden, check, 'b');
          }
          if (selectedPiece.selected_piece_initial === 'bQ') {
            self.get_queen_moves(selectedPiece, forbiden, check, 'b');
          }
          if (selectedPiece.selected_piece_initial === 'bK') {
            self.get_black_king_moves(selectedPiece, check, 'b');
          }
        });
      }
    },
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //##################end mouse down######################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################
    //######################################################

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////METHODS/////////////////////////////////////////////////////////

    selected_piece(new_piece, position_square) {
      let selected_piece_position = position_square.id;
      let selected_piece_initial = new_piece.alt;
      return {
        selected_piece_initial,
        selected_piece_position,
      };
    },

    available_moves(selectedPiece) {
      let check = false;
      const squares = document.querySelectorAll('.square');

      const forbiden = [
        'a1',
        'a2',
        'a3',
        'a4',
        'a5',
        'a6',
        'a7',
        'a8',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h7',
        'h8',
        'a1',
        'b1',
        'c1',
        'd1',
        'e1',
        'f1',
        'g1',
        'h1',
        'a8',
        'b8',
        'c8',
        'd8',
        'e8',
        'f8',
        'g8',
        'h8',
      ];
      if (selectedPiece.selected_piece_initial === 'wP') {
        this.get_white_pawn_moves(selectedPiece, check);
      }
      if (selectedPiece.selected_piece_initial === 'bP') {
        this.get_black_pawn_moves(selectedPiece, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wN' ||
        selectedPiece.selected_piece_initial === 'bN'
      ) {
        this.get_knight_moves(selectedPiece, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wB' ||
        selectedPiece.selected_piece_initial === 'bB'
      ) {
        this.get_bishop_moves(selectedPiece, forbiden, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wR' ||
        selectedPiece.selected_piece_initial === 'bR'
      ) {
        this.get_rook_moves(selectedPiece, forbiden, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wQ' ||
        selectedPiece.selected_piece_initial === 'bQ'
      ) {
        this.get_queen_moves(selectedPiece, forbiden, check);
      }
      if (selectedPiece.selected_piece_initial === 'wK') {
        this.get_white_king_moves(selectedPiece, check, check);
      }
      if (selectedPiece.selected_piece_initial === 'bK') {
        this.get_black_king_moves(selectedPiece, check);
      }
    },
    get_white_pawn_moves(selectedPiece, check) {
      if (!check) {
        this.moves = [];
      }
      const squares = document.querySelectorAll('.square');
      const forward = +1;
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
      const oneForward = `${letter}${num + forward}`;
      const twoForward = `${letter}${num + forward + forward}`;

      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      for (let i = 0; i < letters.length; i++) {
        const element = letters[i];
        if (element === letter) {
          const letterLeft = `${letters[i - 1]}${num + forward}`;
          const letterRight = `${letters[i + 1]}${num + forward}`;
          const fields = {
            l: letterLeft.substring(1, 2) == '9' ? null : letterLeft,
            r: letterRight.substring(0, 2) == 'un' ? null : letterRight,
            of: oneForward.substring(1, 2) == '9' ? null : oneForward,
            tf: twoForward.substring(1, 2) == '9' ? null : twoForward,
          };

          const finalMoves = [];

          squares.forEach((square) => {
            if (square.id === fields.r) {
              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'black') {
                  finalMoves.push(fields.r);
                }
              }
            }
            if (square.id === fields.l) {
              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'black') {
                  finalMoves.push(fields.l);
                }
              }
            }

            if (square.id === fields.of) {
              if (!square.firstElementChild) {
                finalMoves.push(fields.of);
              }
            }

            if (selectedPiece.selected_piece_position.substring(1, 2) == '2') {
              if (square.id === fields.tf) {
                const numberMinusOne = square.id.substring(1, 2) - 1;
                const letter = square.id.substring(0, 1);
                const strigifiedNumber = numberMinusOne.toString();
                const madeUpId = letter + strigifiedNumber;
                if (!square.firstElementChild) {
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
          if (!check) {
            this.moves.push(finalMoves);
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.white_moves.push({ piece, finalMoves });
            this.moves.push(finalMoves);
          }
        }
      }
    },
    get_black_pawn_moves(selectedPiece, check) {
      if (!check) {
        this.moves = [];
      }
      const squares = document.querySelectorAll('.square');
      const forward = -1;
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
      const oneForward = `${letter}${num + forward}`;
      const twoForward = `${letter}${num + forward + forward}`;

      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      for (let i = 0; i < letters.length; i++) {
        const element = letters[i];
        if (element === letter) {
          const letterLeft = `${letters[i - 1]}${num + forward}`;
          const letterRight = `${letters[i + 1]}${num + forward}`;
          const fields = {
            l: letterLeft.substring(1, 2) == '0' ? null : letterLeft,
            r: letterRight.substring(0, 2) == 'un' ? null : letterRight,
            of: oneForward.substring(1, 2) == '0' ? null : oneForward,
            tf: twoForward.substring(1, 2) == '0' ? null : twoForward,
          };
          const finalMoves = [];
          squares.forEach((square) => {
            if (square.id === fields.r) {
              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'white') {
                  finalMoves.push(fields.r);
                }
              }
            }
            if (square.id === fields.l) {
              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'white') {
                  finalMoves.push(fields.l);
                }
              }
            }

            if (square.id === fields.of) {
              if (!square.firstElementChild) {
                finalMoves.push(fields.of);
              }
            }

            if (selectedPiece.selected_piece_position.substring(1, 2) == '7') {
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
          if (!check) {
            this.moves.push(finalMoves);
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.black_moves.push({ piece, finalMoves });
            this.moves.push(finalMoves);
          }
        }
      }
    },
    get_knight_moves(selectedPiece, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wN' ? 'black' : 'white';
      if (!check) {
        this.moves = [];
      }
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
          if (!check) {
            this.moves.push(finalMoves);
          } else if (color === 'b') {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.black_moves.push({ piece, finalMoves });
            this.moves.push(finalMoves);
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.white_moves.push({ piece, finalMoves });
            this.moves.push(finalMoves);
          }
        }
      }
    },
    get_bishop_moves(selectedPiece, forbiden, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wB' ? 'black' : 'white';
      if (!check) {
        this.moves = [];
      }
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
      let finalMoves = [];
      let objectNumber = 0;
      let m = 1;
      function diagonal() {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
                return obj == 'undefined';
              }
              if (obj.substring(0, 1) === 'u') {
                objectNumber++;
                objectNumber++;
                m = 1;
                diagonal();
              }
              if (
                obj.substring(1, 2) === '0' ||
                obj.substring(1, 2) === '10' ||
                obj.substring(1, 2) === '9'
              ) {
                objectNumber++;
                m = 1;
                diagonal();
              } else {
                if (square.id === obj) {
                  if (square.firstElementChild) {
                    m = 1;
                    if (square.firstElementChild.classList[0] === colorClass) {
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
      if (!check) {
        this.moves.push(finalMoves);
      } else if (color === 'b') {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.black_moves.push({ piece, finalMoves });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves });
        this.moves.push(finalMoves);
      }
    },
    get_rook_moves(selectedPiece, forbiden, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wR' ? 'black' : 'white';
      if (!check) {
        this.moves = [];
      }
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
      let finalMoves = [];
      let objectNumber = 0;
      let m = 1;
      function straight() {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
                return obj == 'undefined';
              }
              if (obj.substring(0, 1) === 'u') {
                objectNumber++;
                m = 1;
                straight();
              }

              if (
                obj.substring(1, 2) === '0' ||
                obj.substring(1, 2) === '10' ||
                obj.substring(1, 2) === '9'
              ) {
                objectNumber++;
                m = 1;
                straight();
              } else {
                if (square.id === obj) {
                  if (square.firstElementChild) {
                    m = 1;
                    if (square.firstElementChild.classList[0] === colorClass) {
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
      if (!check) {
        this.moves.push(finalMoves);
      } else if (color === 'b') {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.black_moves.push({ piece, finalMoves });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves });
        this.moves.push(finalMoves);
      }
    },
    get_queen_moves(selectedPiece, forbiden, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wQ' ? 'black' : 'white';
      if (!check) {
        this.moves = [];
      }
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

      let finalMoves = [];

      let objectNumber = 0;
      let m = 1;
      function diagonal() {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
                return obj == 'undefined';
              }
              if (obj.substring(0, 1) === 'u') {
                objectNumber++;
                objectNumber++;
                m = 1;
                diagonal();
              }
              if (
                obj.substring(1, 2) === '0' ||
                obj.substring(1, 2) === '10' ||
                obj.substring(1, 2) === '9'
              ) {
                objectNumber++;
                m = 1;
                diagonal();
              } else {
                if (square.id === obj) {
                  if (square.firstElementChild) {
                    m = 1;
                    if (square.firstElementChild.classList[0] === colorClass) {
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
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
                return obj == 'undefined';
              }
              if (obj.substring(0, 1) === 'u') {
                objectNumberStraight++;
                n = 1;
                straight();
              }
              if (
                obj.substring(1, 2) === '0' ||
                obj.substring(1, 2) === '10' ||
                obj.substring(1, 2) === '9'
              ) {
                objectNumberStraight++;
                n = 1;
                straight();
              } else {
                if (square.id === obj) {
                  if (square.firstElementChild) {
                    n = 1;
                    if (square.firstElementChild.classList[0] === colorClass) {
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
      if (!check) {
        this.moves.push(finalMoves);
      } else if (color === 'b') {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.black_moves.push({ piece, finalMoves });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves });
        this.moves.push(finalMoves);
      }
    },
    get_white_king_moves(selectedPiece, check) {
      const squares = document.querySelectorAll('.square');
      this.moves = [];
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

      let finalMoves = [];

      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
                  if (square.firstElementChild.classList[0] === 'black') {
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
      if (!check) {
        this.moves.push(finalMoves);
      }
    },
    get_black_king_moves(selectedPiece, check) {
      const squares = document.querySelectorAll('.square');
      this.moves = [];
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

      let finalMoves = [];

      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
                  if (square.firstElementChild.classList[0] === 'white') {
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
      if (!check) {
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
  background-color: rgb(26, 160, 77);
}

.white_square {
  height: calc(var(--square_size) / 8);
  width: calc(var(--square_size) / 8);
  background-color: rgb(0, 255, 115);
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
  content: ' ';
  margin: 18.5px auto;
  width: 22px;
  height: 22px;
  background: rgba(85, 85, 85, 0.5);
  border-radius: 50%;
  z-index: 0;
}
.target::after {
  display: block;
  content: ' ';
  margin: 16px auto;
  width: 28px;
  height: 28px;
  background: rgba(255, 74, 74, 0.5);
  border-radius: 50%;
  z-index: 0;
}
.kingDanger {
  background-color: red;
}
</style>
