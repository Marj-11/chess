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
export default {
  data() {
    return {
      // imageUrl:
      //   "https://raw.githubusercontent.com/Marj-11/chess-final/master/src/assets/",
      imageUrl:
        'https://raw.githubusercontent.com/Marj-11/chess/master/wikipedia/',
      fields: [],
      x: ['8', '7', '6', '5', '4', '3', '2', '1'],
      y: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      color: '',
      class: ['square', 'whiteS'],
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
      // entries: [
      //   {
      //     imageUrl: 'bR.png',
      //     start_position: 'a8',
      //     new_position: 'a8',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bR.png',
      //     start_position: 'h8',
      //     new_position: 'h8',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bN.png',
      //     start_position: 'b8',
      //     new_position: 'b8',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bN.png',
      //     start_position: 'g8',
      //     new_position: 'g8',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bB.png',
      //     start_position: 'c8',
      //     new_position: 'c8',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bB.png',
      //     start_position: 'f8',
      //     new_position: 'f8',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bQ.png',
      //     start_position: 'a5',
      //     new_position: 'a5',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bK.png',
      //     start_position: 'e8',
      //     new_position: 'e8',
      //     black_checkmate: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'a7',
      //     new_position: 'a7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'b7',
      //     new_position: 'b7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'c6',
      //     new_position: 'c7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'd7',
      //     new_position: 'd7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'e7',
      //     new_position: 'e7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'f7',
      //     new_position: 'f7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'g7',
      //     new_position: 'g7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'bP.png',
      //     start_position: 'h7',
      //     new_position: 'h7',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wR.png',
      //     start_position: 'a1',
      //     new_position: 'a1',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wR.png',
      //     start_position: 'c1',
      //     new_position: 'c1',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wN.png',
      //     start_position: 'b1',
      //     new_position: 'b1',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wN.png',
      //     start_position: 'g1',
      //     new_position: 'g1',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wB.png',
      //     start_position: 'c1',
      //     new_position: 'c1',
      //     captured: true,
      //   },
      //   {
      //     imageUrl: 'wB.png',
      //     start_position: 'c4',
      //     new_position: 'c4',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wQ.png',
      //     start_position: 'f3',
      //     new_position: 'f3',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wK.png',
      //     start_position: 'e1',
      //     new_position: 'e1',
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'a2',
      //     new_position: 'a2',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'b2',
      //     new_position: 'b2',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'c2',
      //     new_position: 'c2',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'd2',
      //     new_position: 'd2',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'e2',
      //     new_position: 'e2',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'f2',
      //     new_position: 'f2',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'g2',
      //     new_position: 'g2',
      //     captured: false,
      //   },
      //   {
      //     imageUrl: 'wP.png',
      //     start_position: 'h2',
      //     new_position: 'h2',
      //     captured: false,
      //   },
      // ],
      moves: [],
      white_moves: [],
      black_moves: [],
      black_dominant_without_pawns: '',
      black_dominant_straight_pawns: '',
      black_dominant_take_pawns: '',
      black_dominant_everything_straight: '',
      black_dominant_everything_take: '',

      dangerous_white_piece: '',
      dangerous_black_piece: '',
      can_take_dangerous_black_piece: false,
      can_take_dangerous_white_piece: false,
      white_dominant_without_pawns: '',
      white_dominant_straight_pawns: '',
      white_dominant_take_pawns: '',
      white_dominant_everything_straight: '',
      white_dominant_everything_take: '',
      white_protection: [],
      black_protection: [],

      wK_position: '',
      bK_position: '',

      whiteToPlay: true,

      white_checked: false,
      black_checked: false,

      white_checkmate: false,
      black_checkmate: false,

      black_king_moves: [],
      white_king_moves: [],

      black_place_to_go: true,
      white_place_to_go: true,

      protected_pieces: [],
    };
  },
  watch: {
    black_checked(n, o) {
      const squares = document.querySelectorAll('.square');
      if (n) {
        squares.forEach((s) => {
          if (s.id === this.bK_position) {
            s.classList.add('kingDanger');
          }
        });
      } else {
        const squares = document.querySelectorAll('.square');
        squares.forEach((s) => {
          if (s.id === this.bK_position) {
            s.classList.remove('kingDanger');
          }
        });
      }
    },
    white_checked(n, o) {
      const squares = document.querySelectorAll('.square');
      if (n) {
        squares.forEach((s) => {
          if (s.id === this.wK_position) {
            s.classList.add('kingDanger');
          }
        });
      } else {
        const squares = document.querySelectorAll('.square');
        squares.forEach((s) => {
          if (s.id === this.wK_position) {
            s.classList.remove('kingDanger');
          }
        });
      }
    },
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
          if (square.id === piece.start_position && !piece.captured) {
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
    get_dominant_protection() {
      this.white_dominant_everything_straight = [];
      this.white_dominant_everything_take = [];
      const arr1 = [];
      const arr2 = [];
      const arr3 = [];
      const arr4 = [];
      const arr5 = [];
      const arr6 = [];

      this.white_moves.forEach((move) => {
        arr1.push(move.finalMoves);
        arr2.push(move.fine);
        arr3.push(move.newMoves);
        arr4.push(move.finalMoves);
        arr4.push(move.fine);
        arr5.push(move.finalMoves);
        arr5.push(move.newMoves);
        arr6.push(move.protect);
      });

      this.white_dominant_without_pawns = [
        ...new Set(arr1.flat(1).filter((x) => x !== undefined)),
      ];
      this.white_dominant_straight_pawns = [
        ...new Set(arr2.flat(1).filter((x) => x !== undefined)),
      ];
      this.white_dominant_take_pawns = [
        ...new Set(arr3.flat(1).filter((x) => x !== undefined)),
      ];
      this.white_dominant_everything_straight = [
        ...new Set(arr4.flat(1).filter((x) => x !== undefined)),
      ];
      this.white_dominant_everything_take = [
        ...new Set(arr5.flat(1).filter((x) => x !== undefined)),
      ];
      this.white_protection = [...new Set(arr6.flat(1))];

      ///////

      this.black_dominant_everything_straight = [];
      this.black_dominant_everything_take = [];
      const arr10 = [];
      const arr20 = [];
      const arr30 = [];
      const arr40 = [];
      const arr50 = [];
      const arr60 = [];
      // const arr70 = [];
      this.black_moves.forEach((move) => {
        arr10.push(move.finalMoves);
        arr20.push(move.fine);
        arr30.push(move.newMoves);
        arr40.push(move.finalMoves);
        arr40.push(move.fine);
        arr50.push(move.finalMoves);
        arr50.push(move.newMoves);
        arr60.push(move.protect);
        // arr70.push(move.protect);
      });

      this.black_dominant_without_pawns = [
        ...new Set(arr10.flat(1).filter((x) => x !== undefined)),
      ];
      this.black_dominant_straight_pawns = [
        ...new Set(arr20.flat(1).filter((x) => x !== undefined)),
      ];
      this.black_dominant_take_pawns = [
        ...new Set(arr30.flat(1).filter((x) => x !== undefined)),
      ];
      this.black_dominant_everything_straight = [
        ...new Set(arr40.flat(1).filter((x) => x !== undefined)),
      ];
      this.black_dominant_everything_take = [
        ...new Set(arr50.flat(1).filter((x) => x !== undefined)),
      ];
      this.black_protection = [...new Set(arr60.flat(1))];
      // this.black_dominant_everything_take_without_king = [
      //   ...new Set(arr70.flat(1).filter((x) => x !== undefined)),
      // ];
    },
    get_dangerous_piece() {
      this.white_moves.forEach((obj) => {
        if (obj.finalMoves) {
          if (obj.finalMoves.length > 0) {
            obj.finalMoves.forEach((e) => {
              if (e === this.bK_position) {
                this.dangerous_white_piece = obj;
              }
            });
          }
        }
      });
      //  else fine or take pawns
      this.black_moves.forEach((obj) => {
        if (obj.finalMoves) {
          if (obj.finalMoves.length > 0) {
            obj.finalMoves.forEach((e) => {
              if (e === this.wK_position) {
                this.dangerous_black_piece = obj;
              }
            });
          }
        }
        //  else fine or take pawns
      });
    },
    protect_pieces() {
      const squares = document.querySelectorAll('.square');

      this.black_protection.forEach((p) => {
        if (p !== undefined) {
          squares.forEach((e) => {
            if (
              e.firstChild !== null &&
              e.firstChild.classList == 'black' &&
              p === e.firstChild.id
            ) {
              e.firstChild.classList.add('protected');
            }
          });
        }
      });
      this.white_protection.forEach((p) => {
        if (p !== undefined) {
          squares.forEach((e) => {
            if (
              e.firstChild !== null &&
              e.firstChild.classList == 'white' &&
              p === e.firstChild.id
            ) {
              e.firstChild.classList.add('protected');
            }
          });
        }
      });
    },
    check_kings() {
      let r = '';
      const squares = document.querySelectorAll('.square');
      this.white_dominant_everything_straight.forEach((e) => {
        if (e === this.bK_position) {
          r = e;
          squares.forEach((sq) => {
            if (sq.firstChild !== null && sq.firstChild.id === e) {
              this.black_checked = true;
            }
          });
        }
      });
      if (r === this.bK_position) {
        return;
      } else {
        this.black_checked = false;
      }
      let l = '';
      this.black_dominant_everything_straight.forEach((e) => {
        if (e === this.wK_position) {
          l = e;
          squares.forEach((sq) => {
            if (sq.firstChild !== null && sq.firstChild.id === e) {
              this.white_checked = true;
            }
          });
        }
      });
      if (l === this.wK_position) {
        return;
      } else {
        this.white_checked = false;
      }
    },
    track_kings_position() {
      const squares = document.querySelectorAll('.square');
      squares.forEach((square) => {
        if (square.firstChild !== null && square.firstChild.alt === 'wK') {
          this.wK_position = square.id;
        } else if (
          square.firstChild !== null &&
          square.firstChild.alt === 'bK'
        ) {
          this.bK_position = square.id;
        }
      });
    },
    check_if_king_can_take_unprotected_piece(piece) {
      let originalPiece = piece;
      let vario =
        piece == 'white' ? this.white_king_moves : this.black_king_moves;
      let vario2 =
        piece == 'white'
          ? this.white_dominant_everything_take
          : this.black_dominant_everything_take;
      let arr = [];
      const squares = document.querySelectorAll('.square');
      let h = [...new Set(vario.flat(2))];
      h.forEach((e) => {
        squares.forEach((s) => {
          if (
            e === s.id &&
            s.firstChild !== null &&
            s.firstChild.classList.contains('protected')
          ) {
            arr.push(s.firstChild.id);
          }
        });
      });

      let alternative =
        originalPiece == 'white'
          ? this.black_dominant_everything_take
          : this.white_dominant_everything_take;

      let difference = h.filter((x) => !arr.includes(x));
      let final = difference.filter((x) => !alternative.includes(x));

      if (originalPiece === 'black' && final.length === 0) {
        this.black_place_to_go = false;
      } else {
        this.black_place_to_go = true;
      }

      if (originalPiece === 'white' && final.length === 0) {
        this.white_place_to_go = false;
      } else {
        this.white_place_to_go = true;
      }
      if (originalPiece === 'black') {
        let b = vario2.filter((x) => x === this.dangerous_white_piece.piece);
        if (b.length >= 1) {
          this.can_take_dangerous_white_piece = true;
        } else {
          this.can_take_dangerous_white_piece = false;
        }
      }
      if (originalPiece === 'white') {
        let b = vario2.filter((x) => x === this.dangerous_black_piece.piece);
        if (b.length >= 1) {
          this.can_take_dangerous_black_piece = true;
        } else {
          this.can_take_dangerous_black_piece = false;
        }
      }
    },

    //######################################################
    //######################################################
    //###################### mouse down ####################
    //######################################################
    //######################################################
    //######################################################

    mouseDown(event) {
      let entries = this.entries;
      let render = this.render_new_position; // function

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
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                piece.onmouseup = function(e) {
                  e.preventDefault();

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
                    Object.values(entries).forEach((entryPiece) => {
                      if (
                        takenPiece !== null &&
                        takenPiece.id === entryPiece.new_position
                      ) {
                        entryPiece.captured = true;
                        render();
                      } else if (piece.id === entryPiece.new_position) {
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

                    get_moves();

                    self.get_dominant_protection();

                    self.protect_pieces();
                    // track wK & bK
                    self.track_kings_position();

                    // checking kings
                    self.check_kings();

                    // check if king can take unprotected piece

                    if (self.black_checked) {
                      self.get_dangerous_piece();
                      get_moves();
                      self.get_dominant_protection();

                      self.black_dominant_everything_straight.forEach((s2) => {
                        let div = document.createElement('div');
                        div.classList.add('black');
                        squares.forEach((s) => {
                          if (s2 === s.id) {
                            s.appendChild(div);
                          }
                        });
                      });
                      get_moves();
                      self.get_dominant_protection();
                      self.check_if_king_can_take_unprotected_piece('black');

                      self.white_dominant_everything_straight.forEach((e) => {
                        if (
                          e === self.bK_position &&
                          !self.black_place_to_go &&
                          !self.can_take_dangerous_white_piece
                        ) {
                          console.log('checkmate white win!');
                        }
                      });

                      squares.forEach((s) => {
                        if (
                          s.hasChildNodes() &&
                          s.firstChild.tagName === 'DIV'
                        ) {
                          s.innerHTML = '';
                        }
                      });
                    }
                    if (self.white_checked) {
                      self.get_dangerous_piece();
                      get_moves();
                      self.get_dominant_protection();

                      self.check_if_king_can_take_unprotected_piece('white');
                      self.white_dominant_everything_straight.forEach((s2) => {
                        let div = document.createElement('div');
                        div.classList.add('white');
                        squares.forEach((s) => {
                          if (s2 === s.id) {
                            s.appendChild(div);
                          }
                        });
                      });
                      self.check_if_king_can_take_unprotected_piece('white');
                      get_moves();
                      self.get_dominant_protection();
                      self.check_if_king_can_take_unprotected_piece('white');

                      self.black_dominant_everything_straight.forEach((e) => {
                        if (
                          e === self.wK_position &&
                          !self.white_place_to_go &&
                          !self.can_take_dangerous_black_piece
                        ) {
                          console.log('checkmate black win!');
                        }
                      });

                      squares.forEach((s) => {
                        if (
                          s.hasChildNodes() &&
                          s.firstChild.tagName === 'DIV'
                        ) {
                          s.innerHTML = '';
                        }
                      });
                    }
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
    //##################end mouse down######################
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
          const newMoves = [];
          const fine = [];

          squares.forEach((square) => {
            if (square.id === fields.r) {
              newMoves.push(fields.r);
              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'black') {
                  fine.push(fields.r);
                }
              }
            }

            if (square.id === fields.l) {
              newMoves.push(fields.l);

              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'black') {
                  fine.push(fields.l);
                }
              }
            }

            if (square.id === fields.of) {
              if (!square.firstElementChild) {
                fine.push(fields.of);
              }
            }

            if (selectedPiece.selected_piece_position.substring(1, 2) == '2') {
              if (square.id === fields.tf) {
                const numberMinusOne = square.id.substring(1, 2) - 1;
                const letter = square.id.substring(0, 1);
                const strigifiedNumber = numberMinusOne.toString();
                const madeUpId = letter + strigifiedNumber;
                if (!square.firstElementChild) {
                  fine.push(fields.tf);
                  squares.forEach((s) => {
                    if (s.id === madeUpId) {
                      if (s.firstElementChild) {
                        fine.pop();
                      }
                    }
                  });
                }
              }
            }
          });

          if (!check) {
            this.moves.push(fine);
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.white_moves.push({ piece, newMoves, fine });
            this.moves.push(fine);
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
          const newMoves = [];
          const fine = [];
          squares.forEach((square) => {
            if (square.id === fields.r) {
              newMoves.push(fields.r);
              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'white') {
                  fine.push(fields.r);
                }
              }
            }
            if (square.id === fields.l) {
              newMoves.push(fields.l);
              if (square.firstElementChild) {
                if (square.firstElementChild.classList[0] === 'white') {
                  fine.push(fields.l);
                }
              }
            }

            if (square.id === fields.of) {
              if (!square.firstElementChild) {
                fine.push(fields.of);
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
                  newMoves.push(fields.of);
                } else {
                  fine.push(fields.tf);
                  squares.forEach((s) => {
                    if (s.id === madeUpId) {
                      if (s.firstElementChild) {
                        fine.pop();
                      }
                    }
                  });
                }
              }
            }
          });
          if (!check) {
            this.moves.push(fine);
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.black_moves.push({ piece, newMoves, fine });
            this.moves.push(fine);
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
          const protect = [];
          const obj = Object.values(fields);
          for (let i = 0; i < obj.length; i++) {
            const element = obj[i];
            squares.forEach((square) => {
              if (square.id === element) {
                protect.push(element);
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
            this.black_moves.push({ piece, finalMoves, protect });
            this.moves.push(finalMoves);
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.white_moves.push({ piece, finalMoves, protect });
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
      let protect = [];
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
                  protect.push(obj);
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
        this.black_moves.push({ piece, finalMoves, protect });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves, protect });
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
      let protect = [];
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
                  protect.push(obj);
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
        this.black_moves.push({ piece, finalMoves, protect });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves, protect });
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
      let protect = [];

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
                  protect.push(obj);
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
                  protect.push(obj);
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
        this.black_moves.push({ piece, finalMoves, protect });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves, protect });
        this.moves.push(finalMoves);
      }
    },
    get_white_king_moves(selectedPiece, check) {
      const squares = document.querySelectorAll('.square');
      this.moves = [];
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

      let finalMoves = [];
      let protect = [];

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
                protect.push(obj);
                if (square.firstElementChild) {
                  if (
                    square.firstElementChild.classList[0] === 'black' ||
                    square.firstElementChild.tagName === 'DIV'
                  ) {
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
      this.white_king_moves = [];
      this.white_king_moves = finalMoves;
      // might create a problem with defence!

      if (!this.white_checked) {
        this.white_moves.push({ finalMoves, protect });
      }
    },
    get_black_king_moves(selectedPiece, check) {
      const squares = document.querySelectorAll('.square');
      this.moves = [];
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));

      let finalMoves = [];
      let protect = [];

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
                protect.push(obj);
                if (square.firstElementChild) {
                  if (
                    square.firstElementChild.classList[0] === 'white' ||
                    square.firstElementChild.tagName === 'DIV'
                  ) {
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

      this.black_king_moves = [];
      this.black_king_moves = finalMoves;

      //  might create a problem with defence!
      if (!this.black_checked) {
        this.black_moves.push({ finalMoves, protect });
      }
    },
  },

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
  background-color: rgb(231, 85, 0);
}

.white_square {
  height: calc(var(--square_size) / 8);
  width: calc(var(--square_size) / 8);
  background-color: rgb(240, 169, 122);
}

img {
  width: 62px;
  cursor: grab;
  z-index: 1;
  margin-top: -1.5px;
  margin-left: -1px;
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
  margin: 2px auto;
  width: 55px;
  height: 55px;
  background: rgba(29, 29, 29, 0.4);
  border-radius: 50%;
  z-index: 0;
}
.kingDanger {
  background-color: red;
}
</style>
