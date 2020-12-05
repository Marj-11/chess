<template>
  <div class="chessboard">
    <div
      v-for="field in fields"
      :key="field.id"
      :class="[field.class, field.color]"
      :id="field.id"
    ></div>
    <div v-show="whiteGroup === true" class="wrappingWhite">
      <div class="promotWhitePawn">
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'wQQ.png'"
          alt="Wqueen"
        />
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'wRr.png'"
          alt="Wrook"
        />
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'wNN.png'"
          alt="Wknight"
        />
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'wBB.png'"
          alt="Wbishop"
        />
      </div>
    </div>
    <div v-show="blackGroup === true" class="wrappingBlack">
      <div class="promotBlackPawn">
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'bQQ.png'"
          alt="Bqueen"
        />
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'bRr.png'"
          alt="Brook"
        />
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'bNN.png'"
          alt="Bknight"
        />
        <img
          @click="replacePiece"
          v-bind:src="imageUrl + 'bBB.png'"
          alt="Bbishop"
        />
      </div>
    </div>
    <audio ref="moving" src="@/assets/knock.mp3"></audio>
    <audio ref="capture" src="@/assets/capture1.mp3"></audio>
    <audio ref="castle" src="@/assets/castle.mp3"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      white_kingside_castling: false,
      white_queenside_castling: false,
      black_kingside_castling: false,
      black_queenside_castling: false,
      imageUrl:
        'https://raw.githubusercontent.com/Marj-11/chess-figures/master/',
      fields: [],
      x: ['8', '7', '6', '5', '4', '3', '2', '1'],
      y: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      color: '',
      class: ['square', 'whiteS'],
      entries: [
        {
          imageUrl: 'bRl.png',
          start_position: 'a8',
          new_position: 'a8',
          captured: false,
        },
        {
          imageUrl: 'bRr.png',
          start_position: 'h8',
          new_position: 'h8',
          captured: false,
        },
        {
          imageUrl: 'bNN.png',
          start_position: 'b8',
          new_position: 'b8',
          captured: false,
        },
        {
          imageUrl: 'bNN.png',
          start_position: 'g8',
          new_position: 'g8',
          captured: false,
        },
        {
          imageUrl: 'bBB.png',
          start_position: 'c8',
          new_position: 'c8',
          captured: false,
        },
        {
          imageUrl: 'bBB.png',
          start_position: 'f8',
          new_position: 'f8',
          captured: false,
        },
        {
          imageUrl: 'bQQ.png',
          start_position: 'd8',
          new_position: 'd8',
          captured: false,
        },
        {
          imageUrl: 'bKK.png',
          start_position: 'e8',
          new_position: 'e8',
          black_checkmate: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'a7',
          new_position: 'a7',
          captured: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'b7',
          new_position: 'b7',
          captured: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'c7',
          new_position: 'c7',
          captured: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'd7',
          new_position: 'd7',
          captured: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'e7',
          new_position: 'e7',
          captured: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'f7',
          new_position: 'f7',
          captured: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'g7',
          new_position: 'g7',
          captured: false,
        },
        {
          imageUrl: 'bPP.png',
          start_position: 'h7',
          new_position: 'h7',
          captured: false,
        },
        {
          imageUrl: 'wRl.png',
          start_position: 'a1',
          new_position: 'a1',
          captured: false,
        },
        {
          imageUrl: 'wRr.png',
          start_position: 'h1',
          new_position: 'h1',
          captured: false,
        },
        {
          imageUrl: 'wNN.png',
          start_position: 'b1',
          new_position: 'b1',
          captured: false,
        },
        {
          imageUrl: 'wNN.png',
          start_position: 'g1',
          new_position: 'g1',
          captured: false,
        },
        {
          imageUrl: 'wBB.png',
          start_position: 'c1',
          new_position: 'c1',
          captured: false,
        },
        {
          imageUrl: 'wBB.png',
          start_position: 'f1',
          new_position: 'f1',
          captured: false,
        },
        {
          imageUrl: 'wQQ.png',
          start_position: 'd1',
          new_position: 'd1',
          captured: false,
        },
        {
          imageUrl: 'wKK.png',
          start_position: 'e1',
          new_position: 'e1',
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'a2',
          new_position: 'a2',
          captured: false,
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'b2',
          new_position: 'b2',
          captured: false,
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'c2',
          new_position: 'c2',
          captured: false,
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'd2',
          new_position: 'd2',
          captured: false,
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'e2',
          new_position: 'e2',
          captured: false,
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'f2',
          new_position: 'f2',
          captured: false,
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'g2',
          new_position: 'g2',
          captured: false,
        },
        {
          imageUrl: 'wPP.png',
          start_position: 'h2',
          new_position: 'h2',
          captured: false,
        },
      ],
      recorded_entries: [],
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
      white_kingside_castling_king_or_rook: false,
      white_queenside_castling_king_or_rook: false,
      black_kingside_castling_king_or_rook: false,
      black_queenside_castling_king_or_rook: false,
      white_newPosition: [],
      black_newPosition: [],
      black_defence: [],
      white_defence: [],
      black_figures: [],
      black_pawns: [],
      white_figures: [],
      white_pawns: [],
      secretAgentFinal: [],
      blackSecretMoves: [],
      whiteSecretMoves: [],
      whiteGroup: false,
      blackGroup: false,
      currentDroppable: '',
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
          s.classList.remove('kingDanger');
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
          s.classList.remove('kingDanger');
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
            img.alt = piece.imageUrl.substring(0, 3);
            img.id = square.id;
            img.draggable = true;
            img.style.position = 'absolute';
            img.classList =
              img.src.charAt(img.src.length - 7) == 'b' ? 'black' : 'white';
            square.appendChild(img);
          }
        });
      });
    },
    replacePiece(e) {
      const newPiece =
        e.path[0].alt === 'Wqueen'
          ? 'wQQ.png'
          : e.path[0].alt === 'Wrook'
          ? 'wRr.png'
          : e.path[0].alt === 'Wknight'
          ? 'wNN.png'
          : e.path[0].alt === 'Wbishop'
          ? 'wBB.png'
          : e.path[0].alt === 'Bqueen'
          ? 'bQQ.png'
          : e.path[0].alt === 'Brook'
          ? 'bRr.png'
          : e.path[0].alt === 'Bknight'
          ? 'bNN.png'
          : e.path[0].alt === 'Bbishop'
          ? 'bBB.png'
          : '';
      // const whiteGroup = document.querySelector('.wrapping');
      this.get_moves();
      this.get_dominant_protection();
      this.render_new_position();
      this.protect_pieces();
      this.track_kings_position();
      this.check_kings();
      let piece;
      Object.values(this.entries).forEach((entryPiece) => {
        if (
          newPiece.substring(0, 1) === 'w' &&
          entryPiece.new_position.substring(1) === '7' &&
          entryPiece.imageUrl === 'wPP.png'
        ) {
          entryPiece.imageUrl = newPiece;
          entryPiece.new_position = this.currentDroppable.id;
          entryPiece.start_position = this.currentDroppable.id;
          entryPiece.captured = false;
          piece = this.currentDroppable.id;
        } else if (
          newPiece.substring(0, 1) === 'b' &&
          entryPiece.new_position.substring(1) === '2' &&
          entryPiece.imageUrl === 'bPP.png'
        ) {
          entryPiece.imageUrl = newPiece;
          entryPiece.new_position = this.currentDroppable.id;
          entryPiece.start_position = this.currentDroppable.id;
          entryPiece.captured = false;
          piece = this.currentDroppable.id;
        }
      });
      const takenPiece = this.currentDroppable.firstChild;
      this.get_moves();
      this.get_dominant_protection();
      this.protect_pieces();
      // check if king can take unprotected piece
      Object.values(this.entries).forEach((entryPiece) => {
        if (
          takenPiece !== null &&
          takenPiece.alt === entryPiece.imageUrl.substring(0, 3) &&
          takenPiece.id === entryPiece.new_position
        ) {
          entryPiece.captured = true;
          this.get_moves();
          this.get_dominant_protection();
          this.render_new_position('capture');
        } else if (piece === entryPiece.new_position) {
          entryPiece.new_position = this.currentDroppable.id;
          this.get_moves();
          this.get_dominant_protection();
          this.render_new_position('move');
        }
      });
      // console.log(this.currentDroppable);
      this.get_moves();
      this.get_dominant_protection();
      this.protect_pieces();
      // track wK & bK
      this.track_kings_position();
      // checking kings
      this.check_kings();
      if (this.black_checked) {
        this.get_hidden_moves(this.currentDroppable.firstChild);
        this.check_for_black_checkmate();
      }
      if (this.white_checked) {
        this.get_hidden_moves(this.currentDroppable.firstChild);
        this.check_for_white_checkmate();
      }
      this.whiteGroup = false;
      this.blackGroup = false;
    },
    render_new_position(sound) {
      if (sound === 'move') {
        this.moving();
      }
      if (sound === 'capture') {
        this.capture();
      }
      if (sound === 'castle') {
        this.castlingSound();
      }
      if (sound === 'replace') {
        // this.replaceSound();
      }
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
            img.alt = piece.imageUrl.substring(0, 3);
            img.id = square.id;
            img.draggable = true;
            img.style.position = 'absolute';
            img.classList =
              img.src.charAt(img.src.length - 7) == 'b' ? 'black' : 'white';
            square.appendChild(img);
          }
        });
      });
      // console.log(this.black_dominant_everything_take);
    },
    castling(entryPiece) {
      // white kingside
      // console.log(entryPiece);
      this.get_moves();
      this.get_dominant_protection();
      this.check_kings();
      if (
        (entryPiece.imageUrl === 'wRr.png' &&
          entryPiece.new_position !== 'h1') ||
        (entryPiece.imageUrl === 'wKK.png' &&
          entryPiece.new_position !== 'e1' &&
          entryPiece.new_position !== 'g1')
      ) {
        this.white_kingside_castling_king_or_rook = true;
      }
      const occupied1 = Boolean(
        this.black_dominant_everything_take.find((val) => {
          return val === 'f1' || val === 'g1';
        })
      );
      const whitePieces = Boolean(
        this.entries.find((val) => {
          return val.new_position === 'f1' || val.new_position === 'g1';
        })
      );
      const whitePieces1 = Boolean(
        this.entries.find((val) => {
          return (
            val.new_position === 'd1' ||
            val.new_position === 'b1' ||
            val.new_position === 'c1'
          );
        })
      );
      if (
        this.white_kingside_castling_king_or_rook ||
        occupied1 ||
        this.white_checked ||
        whitePieces
      ) {
        this.white_kingside_castling = false;
      } else if (!occupied1) {
        this.white_kingside_castling = true;
      }
      // white queenside
      if (
        (entryPiece.imageUrl === 'wRl.png' &&
          entryPiece.new_position !== 'a1') ||
        (entryPiece.imageUrl === 'wKK.png' &&
          entryPiece.new_position !== 'e1' &&
          entryPiece.new_position !== 'c1')
      ) {
        this.white_queenside_castling_king_or_rook = true;
      }
      const occupied2 = Boolean(
        this.black_dominant_everything_take.find((val) => {
          return val === 'b1' || val === 'c1' || val === 'd1';
        })
      );
      if (
        this.white_queenside_castling_king_or_rook ||
        occupied2 ||
        this.white_checked ||
        whitePieces1
      ) {
        this.white_queenside_castling = false;
      } else if (!occupied2) {
        this.white_queenside_castling = true;
      }
      // other side
      // black kingside
      if (
        (entryPiece.imageUrl === 'bRr.png' &&
          entryPiece.new_position !== 'h8') ||
        (entryPiece.imageUrl === 'bKK.png' &&
          entryPiece.new_position !== 'e8' &&
          entryPiece.new_position !== 'g8')
      ) {
        this.black_kingside_castling_king_or_rook = true;
      }
      const occupied3 = Boolean(
        this.white_dominant_everything_take.find((val) => {
          return val == 'f8' || val === 'g8';
        })
      );
      const blackPieces = Boolean(
        this.entries.find((val) => {
          return val.new_position === 'f8' || val.new_position === 'g8';
        })
      );
      const blackPieces1 = Boolean(
        this.entries.find((val) => {
          return (
            val.new_position === 'd8' ||
            val.new_position === 'b8' ||
            val.new_position === 'c8'
          );
        })
      );
      if (
        this.black_kingside_castling_king_or_rook ||
        occupied3 ||
        blackPieces ||
        this.black_checked
      ) {
        this.black_kingside_castling = false;
      } else if (!occupied3) {
        this.black_kingside_castling = true;
      }
      // black queenside
      if (
        (entryPiece.imageUrl === 'bRl.png' &&
          entryPiece.new_position !== 'a8') ||
        (entryPiece.imageUrl === 'bKK.png' &&
          entryPiece.new_position !== 'e8' &&
          entryPiece.new_position !== 'c8')
      ) {
        this.black_queenside_castling_king_or_rook = true;
      }
      const occupied4 = Boolean(
        this.white_dominant_everything_take.find((val) => {
          return val == 'b8' || val === 'c8' || val === 'd8';
        })
      );
      if (
        this.black_queenside_castling_king_or_rook ||
        occupied4 ||
        this.black_checked ||
        blackPieces1
      ) {
        this.black_queenside_castling = false;
      } else if (!occupied4) {
        this.black_queenside_castling = true;
      }
    },
    castle(castleType) {
      if (castleType === 'wKK') {
        const found = this.entries.find((e) => e.imageUrl === 'wRr.png');
        found.new_position = 'f1';
        this.render_new_position('castle');
      }
      if (castleType === 'wKQ') {
        const found = this.entries.find((e) => e.imageUrl === 'wRl.png');
        found.new_position = 'd1';
        this.render_new_position('castle');
      }
      if (castleType === 'bKK') {
        const found = this.entries.find((e) => e.imageUrl === 'bRr.png');
        found.new_position = 'f8';
        this.render_new_position('castle');
      }
      if (castleType === 'bKQ') {
        const found = this.entries.find((e) => e.imageUrl === 'bRl.png');
        found.new_position = 'd8';
        this.render_new_position('castle');
      }
    },
    moving() {
      let audio = this.$refs.moving;
      audio.play();
    },
    capture() {
      let audio = this.$refs.capture;
      audio.play();
    },
    castlingSound() {
      let audio = this.$refs.castle;
      audio.play();
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
      const arr7 = [];
      const arr8 = [];
      const arr9 = [];
      this.white_moves.forEach((move) => {
        arr1.push(move.finalMoves);
        arr2.push(move.fine);
        arr3.push(move.newMoves);
        arr4.push(move.finalMoves);
        arr4.push(move.fine);
        arr5.push(move.finalMoves);
        arr5.push(move.newMoves);
        arr6.push(move.protect);
        if (Object.keys(move).includes('fine')) {
          arr8.push(move);
        }
        if (Object.keys(move).includes('finalMoves')) {
          arr9.push(move);
        }
      });
      this.entries.forEach((entry) => {
        if (entry.imageUrl.substring(0, 1) === 'w') {
          arr7.push(entry.new_position);
        }
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
      this.white_newPosition = [...new Set(arr7.flat(1))];
      this.white_pawns = arr8;
      this.white_figures = arr9;
      ///////
      this.black_dominant_everything_straight = [];
      this.black_dominant_everything_take = [];
      const arr10 = [];
      const arr20 = [];
      const arr30 = [];
      const arr40 = [];
      const arr50 = [];
      const arr60 = [];
      const arr70 = [];
      const arr80 = [];
      const arr90 = [];
      this.black_moves.forEach((move) => {
        arr10.push(move.finalMoves);
        arr20.push(move.fine);
        arr30.push(move.newMoves);
        arr40.push(move.finalMoves);
        arr40.push(move.fine);
        arr50.push(move.finalMoves);
        arr50.push(move.newMoves);
        arr60.push(move.protect);
        if (Object.keys(move).includes('fine')) {
          arr80.push(move);
        }
        if (Object.keys(move).includes('finalMoves')) {
          arr90.push(move);
        }
      });
      this.entries.forEach((entry) => {
        if (entry.imageUrl.substring(0, 1) === 'b') {
          arr70.push(entry.new_position);
        }
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
      this.black_newPosition = [...new Set(arr70.flat(1))];
      this.black_pawns = arr80;
      this.black_figures = arr90;
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
        } else {
          if (obj.newMoves && obj.newMoves.length > 0) {
            obj.newMoves.forEach((e) => {
              if (e === this.wK_position) {
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
        } else {
          if (obj.newMoves && obj.newMoves.length > 0) {
            obj.newMoves.forEach((e) => {
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
      let r = null;
      this.white_dominant_everything_straight.forEach((val) => {
        if (val === this.bK_position) {
          r = val;
        }
      });
      if (r) {
        this.black_checked = true;
      } else {
        this.black_checked = false;
      }
      let l = null;
      this.black_dominant_everything_straight.forEach((val) => {
        if (val === this.wK_position) {
          l = val;
        }
      });
      if (l) {
        this.white_checked = true;
      } else {
        this.white_checked = false;
      }
    },
    track_kings_position() {
      const squares = document.querySelectorAll('.square');
      squares.forEach((square) => {
        if (square.firstChild !== null && square.firstChild.alt === 'wKK') {
          this.wK_position = square.id;
        } else if (
          square.firstChild !== null &&
          square.firstChild.alt === 'bKK'
        ) {
          this.bK_position = square.id;
        }
      });
    },
    check_if_king_can_take_unprotected_piece(piece) {
      this.final_black_king_moves = [];
      this.final_white_king_moves = [];
      let originalPiece = piece;
      let king_moves =
        piece == 'white' ? this.white_king_moves : this.black_king_moves;
      let dominant_take =
        piece == 'white'
          ? this.white_dominant_everything_take
          : this.black_dominant_everything_take;
      let arr = [];
      const squares = document.querySelectorAll('.square');
      let h = [...new Set(king_moves.flat(2))];
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
      const bb = final.filter((b) => {
        return !this.whiteSecretMoves.includes(b);
      });
      const ww = final.filter((w) => {
        return !this.blackSecretMoves.includes(w);
      });
      this.last_black_kings_moves = bb;
      this.last_white_kings_moves = ww;
      if (originalPiece === 'black' && bb.length === 0) {
        this.black_place_to_go = false;
      } else {
        this.black_place_to_go = true;
      }
      if (originalPiece === 'white' && ww.length === 0) {
        this.white_place_to_go = false;
      } else {
        this.white_place_to_go = true;
      }
      if (originalPiece === 'black') {
        let b = dominant_take.filter(
          (x) => x === this.dangerous_white_piece.piece
        );
        if (b.length >= 1) {
          this.can_take_dangerous_white_piece = true;
        } else {
          this.can_take_dangerous_white_piece = false;
        }
      }
      if (originalPiece === 'white') {
        let b = dominant_take.filter(
          (x) => x === this.dangerous_black_piece.piece
        );
        if (b.length >= 1) {
          this.can_take_dangerous_black_piece = true;
        } else {
          this.can_take_dangerous_black_piece = false;
        }
      }
    },
    check_for_black_checkmate() {
      const squares = document.querySelectorAll('.square');
      this.get_moves();
      this.get_dangerous_piece();
      this.get_dominant_protection();
      this.check_if_king_can_take_unprotected_piece('black');
      this.black_defence = [];
      const blockers_black_pawns = [];
      const blockers_black_figures = [];
      const output_black_pawns_attackers = [];
      let output_black_pawns_blockers = [];
      let output_black_figures_blockers = [];
      const output_black_figures_attackers = [];

      this.black_pawns.forEach((pawn) => {
        if (this.dangerous_white_piece.finalMoves) {
          this.dangerous_white_piece.finalMoves.forEach((s) => {
            if (pawn.fine.includes(s)) {
              blockers_black_pawns.push(pawn);
            }
          });
          if (pawn.newMoves.includes(this.dangerous_white_piece.piece)) {
            output_black_pawns_attackers.push([
              pawn.piece,
              this.dangerous_white_piece.piece,
            ]);
          }
        } else if (this.dangerous_white_piece) {
          this.dangerous_white_piece.newMoves.forEach((s) => {
            if (pawn.fine.includes(s)) {
              blockers_black_pawns.push(pawn);
            }
          });
          if (pawn.newMoves.includes(this.dangerous_white_piece.piece)) {
            output_black_pawns_attackers.push([
              pawn.piece,
              this.dangerous_white_piece.piece,
            ]);
          }
        }
      });
      blockers_black_pawns.forEach((r) => {
        r.fine.forEach((e) => {
          squares.forEach((square) => {
            let div = document.createElement('div');
            div.classList.add('black');
            if (e === square.id) {
              square.appendChild(div);
              this.get_moves();
              this.get_dominant_protection();
              this.check_kings();
              if (!this.black_checked) {
                output_black_pawns_blockers.push([r.piece, e]);
              }
              squares.forEach((s) => {
                if (s.hasChildNodes() && s.firstChild.tagName === 'DIV') {
                  s.innerHTML = '';
                }
              });
            }
          });
        });
      });
      ///////////////////////////////////////////////////////
      this.get_moves();
      this.get_dangerous_piece();
      this.get_dominant_protection();
      this.check_if_king_can_take_unprotected_piece('black');
      this.black_figures.forEach((figure) => {
        if (this.dangerous_white_piece.finalMoves) {
          this.dangerous_white_piece.finalMoves.forEach((s) => {
            if (figure.finalMoves.includes(s)) {
              blockers_black_figures.push(figure);
            }
          });
          if (figure.finalMoves.includes(this.dangerous_white_piece.piece)) {
            output_black_figures_attackers.push([
              figure.piece,
              this.dangerous_white_piece.piece,
            ]);
          }
        } else if (this.dangerous_white_piece) {
          this.dangerous_white_piece.newMoves.forEach((s) => {
            if (figure.finalMoves.includes(s)) {
              blockers_black_figures.push(figure);
            }
          });
          if (figure.finalMoves.includes(this.dangerous_white_piece.piece)) {
            output_black_figures_attackers.push([
              figure.piece,
              this.dangerous_white_piece.piece,
            ]);
          }
        }
      });
      blockers_black_figures.forEach((r) => {
        r.finalMoves.forEach((e) => {
          squares.forEach((square) => {
            let div = document.createElement('div');
            div.classList.add('black');
            if (e === square.id) {
              square.appendChild(div);
              this.get_moves();
              this.get_dominant_protection();
              this.check_kings();
              if (!this.black_checked) {
                output_black_figures_blockers.push([r.piece, e]);
              }
              squares.forEach((s) => {
                if (s.hasChildNodes() && s.firstChild.tagName === 'DIV') {
                  s.innerHTML = '';
                }
              });
            }
          });
        });
      });
      this.black_defence.push(
        output_black_pawns_attackers,
        output_black_pawns_blockers,
        output_black_figures_blockers,
        output_black_figures_attackers
      );
      const output = [];
      this.black_defence.forEach((e) => {
        if (typeof e[0] === 'string') {
          output.push(e);
        }
        e.forEach((d) => {
          if (typeof d === 'object') {
            output.push(d);
          }
        });
      });
      const black_no_defence = Boolean(
        this.black_defence.find((val) => {
          return val.length > 0;
        })
      );
      this.get_moves();
      this.get_dominant_protection();
      this.check_if_king_can_take_unprotected_piece('black');
      this.check_kings();
      this.black_defence = output;
      this.white_dominant_everything_straight.forEach((e) => {
        if (
          !black_no_defence &&
          !this.black_place_to_go &&
          !this.can_take_dangerous_white_piece
        ) {
          console.log('checkmate white win!');
        }
      });
    },
    check_for_white_checkmate() {
      const squares = document.querySelectorAll('.square');
      this.get_dangerous_piece();
      this.get_moves();
      this.get_dominant_protection();
      this.check_if_king_can_take_unprotected_piece('white');
      this.white_defence = [];
      const blockers_white_pawns = [];
      const blockers_white_figures = [];
      const output_white_pawns_attackers = [];
      let output_white_pawns_blockers = [];
      let output_white_figures_blockers = [];
      const output_white_figures_attackers = [];
      this.white_pawns.forEach((pawn) => {
        if (this.dangerous_black_piece.finalMoves) {
          this.dangerous_black_piece.finalMoves.forEach((s) => {
            if (pawn.fine.includes(s)) {
              blockers_white_pawns.push(pawn);
            }
          });
          if (pawn.newMoves.includes(this.dangerous_black_piece.piece)) {
            output_white_pawns_attackers.push([
              pawn.piece,
              this.dangerous_black_piece.piece,
            ]);
          }
        } else {
          this.dangerous_black_piece.newMoves.forEach((s) => {
            if (pawn.fine.includes(s)) {
              blockers_white_pawns.push(pawn);
            }
          });
          if (pawn.newMoves.includes(this.dangerous_black_piece.piece)) {
            output_white_pawns_attackers.push([
              pawn.piece,
              this.dangerous_black_piece.piece,
            ]);
          }
        }
      });
      blockers_white_pawns.forEach((r) => {
        r.fine.forEach((e) => {
          squares.forEach((square) => {
            let div = document.createElement('div');
            div.classList.add('black');
            if (e === square.id) {
              square.appendChild(div);
              this.get_moves();
              this.get_dominant_protection();
              this.check_kings();
              if (!this.white_checked) {
                output_white_pawns_blockers = [r.piece, e];
              }
              squares.forEach((s) => {
                if (s.hasChildNodes() && s.firstChild.tagName === 'DIV') {
                  s.innerHTML = '';
                }
              });
            }
          });
        });
      });
      ///////////////////////////////////////////////////////
      this.get_moves();
      this.get_dangerous_piece();
      this.get_dominant_protection();
      this.check_if_king_can_take_unprotected_piece('white');
      this.white_figures.forEach((figure) => {
        if (this.dangerous_black_piece.finalMoves) {
          this.dangerous_black_piece.finalMoves.forEach((s) => {
            if (figure.finalMoves.includes(s)) {
              blockers_white_figures.push(figure);
            }
          });
          if (figure.finalMoves.includes(this.dangerous_black_piece.piece)) {
            output_white_figures_attackers.push([
              figure.piece,
              this.dangerous_black_piece.piece,
            ]);
          }
        } else {
          this.dangerous_black_piece.newMoves.forEach((s) => {
            if (figure.finalMoves.includes(s)) {
              blockers_white_figures.push(figure);
            }
          });
          if (figure.finalMoves.includes(this.dangerous_black_piece.piece)) {
            output_white_figures_attackers.push([
              figure.piece,
              this.dangerous_black_piece.piece,
            ]);
          }
        }
      });
      blockers_white_figures.forEach((r) => {
        r.finalMoves.forEach((e) => {
          squares.forEach((square) => {
            let div = document.createElement('div');
            div.classList.add('black');
            if (e === square.id) {
              square.appendChild(div);
              this.get_moves();
              this.get_dominant_protection();
              this.check_kings();
              if (!this.white_checked) {
                output_white_figures_blockers.push([r.piece, e]);
              }
              squares.forEach((s) => {
                if (s.hasChildNodes() && s.firstChild.tagName === 'DIV') {
                  s.innerHTML = '';
                }
              });
            }
          });
        });
      });
      ///////////////////////////////////////////////////////
      this.white_defence.push(
        output_white_pawns_attackers,
        output_white_pawns_blockers,
        output_white_figures_blockers,
        output_white_figures_attackers
        // [this.wK_position, this.last_kings_moves]
      );
      const output = [];
      this.white_defence.forEach((e) => {
        if (typeof e[0] === 'string') {
          output.push(e);
        }
        e.forEach((d) => {
          if (typeof d === 'object') {
            output.push(d);
          }
        });
      });

      const white_no_defence = Boolean(
        this.white_defence.find((val) => {
          return val.length > 0;
        })
      );
      this.get_moves();
      this.get_dominant_protection();
      this.check_if_king_can_take_unprotected_piece('white');
      this.check_kings();
      this.white_defence = output;
      this.black_dominant_everything_straight.forEach((e) => {
        if (
          !white_no_defence &&
          !this.white_place_to_go &&
          !this.can_take_dangerous_black_piece
        ) {
          console.log('checkmate black win!');
        }
      });
    },
    mouseDown(event) {
      if (!this.whiteGroup && !this.blackGroup) {
        const chess = document.querySelector('.chessboard');
        chess.addEventListener('contextmenu', (event) =>
          event.preventDefault()
        );
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
          piece.style.width = 'calc(var(--square_size) / 7)';
          piece.style.zIndex = 2;
          piece.style.cursor = 'grabbing';
          // piece.style.position = 'absolute';
          // piece.style.top = event.clientX + 'px';
          // piece.style.left = event.clientY + 'px';
          let black_only_defence = [];
          this.black_defence.forEach((e) => {
            if (e.length > 0) {
              if (piece.id === e[0]) {
                black_only_defence.push(e[1]);
              }
            }
          });
          if (piece.alt === 'bKK') {
            black_only_defence = this.last_black_kings_moves;
          }
          let white_only_defence = [];
          this.white_defence.forEach((e) => {
            if (e.length > 0) {
              e.forEach((t) => {
                if (piece.id === e[0]) {
                  white_only_defence.push(e[1]);
                }
              });
            }
          });
          if (piece.alt === 'wKK') {
            white_only_defence = this.last_white_kings_moves;
          }
          if (this.black_checked) {
            black_only_defence.forEach((allowed) => {
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
          } else if (this.white_checked) {
            white_only_defence.forEach((allowed) => {
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
          } else {
            this.moves.forEach((allowed) => {
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
          }
          //######################################################
          //######################################################
          //###################### mouse event ###################
          //######################################################
          //######################################################
          //######################################################
          let self = this;
          let currentDroppable = null;
          let currentDroppable1 = null;
          let shiftX = event.clientX - piece.getBoundingClientRect().left;
          let shiftY = event.clientY - piece.getBoundingClientRect().top;
          moveAt(event.pageX, event.pageY);
          function moveAt(pageX, pageY) {
            square.style.position = null;
            piece.style.left = pageX - shiftX + 'px';
            piece.style.top = pageY - shiftY + 'px';
            // whiteGroup.style.display = 'none';
          }
          function onMouseMove(event) {
            const element = document.querySelector('.chessboard');
            var rect = element.getBoundingClientRect();
            moveAt(event.pageX, event.pageY);
            if (event.pageX < rect.left - 8) {
              piece.style.left = rect.left - 34 + 'px';
            }
            if (event.pageY < rect.top - 8) {
              piece.style.top = rect.top - 34 + 'px';
            }
            if (event.pageY > rect.bottom - 10) {
              piece.style.top = rect.bottom - 40 + 'px';
            }
            if (event.pageX > rect.right + 2) {
              piece.style.left = rect.right - 34 + 'px';
            }
            piece.hidden = true;
            let elemBelow = document.elementFromPoint(event.pageX, event.pageY);
            piece.hidden = false;
            //######################################################
            //######################################################
            //######################################################
            //################# mouse event ends ###################
            //######################################################
            //######################################################
            //######################################################
            if (!elemBelow) {
              elemBelow = document.createElement('div');
            }
            let droppableBelow = elemBelow.closest('.droppable');
            let normalSquare = elemBelow.closest('.square');
            if (currentDroppable1 != normalSquare) {
              if (currentDroppable1) {
                leave(currentDroppable1);
              }
              currentDroppable1 = normalSquare;
              enter(currentDroppable1);
            }
            function enter(elem) {
              if (elem == null) {
                return;
              }
              elem.style.borderColor = 'white';
            }
            function leave(elem) {
              if (elem == null) {
                return;
              }
              elem.style.borderColor = 'transparent';
            }
            if (currentDroppable != droppableBelow) {
              if (currentDroppable) {
                leaveDroppable(currentDroppable);
              }
              currentDroppable = droppableBelow;
              self.currentDroppable = currentDroppable;
              if (currentDroppable) {
                if (
                  (piece.classList[0] === 'white' && self.whiteToPlay) ||
                  (piece.classList[0] === 'black' && !self.whiteToPlay)
                ) {
                  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  window.onmouseup = function(e) {
                    e.preventDefault();
                    squares.forEach((s) => {
                      s.classList.remove('droppable');
                      s.classList.remove('mark');
                      s.classList.remove('target');
                      s.style.borderColor = 'transparent';
                    });
                    if (currentDroppable) {
                      if (piece.alt.charAt(0) === 'b') {
                        self.whiteToPlay = true;
                      } else {
                        self.whiteToPlay = false;
                      }
                      // castling
                      if (
                        !self.white_kingside_castling_king_or_rook &&
                        currentDroppable.id === 'g1' &&
                        piece.id === 'e1' &&
                        piece.alt === 'wKK'
                      ) {
                        self.castle('wKK');
                      }
                      if (
                        !self.white_queenside_castling_king_or_rook &&
                        currentDroppable.id === 'c1' &&
                        piece.id === 'e1' &&
                        piece.alt === 'wKK'
                      ) {
                        self.castle('wKQ');
                      }
                      if (
                        !self.black_kingside_castling_king_or_rook &&
                        currentDroppable.id === 'g8' &&
                        piece.id === 'e8' &&
                        piece.alt === 'bKK'
                      ) {
                        self.castle('bKK');
                      }
                      if (
                        !self.black_queenside_castling_king_or_rook &&
                        currentDroppable.id === 'c8' &&
                        piece.id === 'e8' &&
                        piece.alt === 'bKK'
                      ) {
                        self.castle('bKQ');
                      }
                      // promoting pawns
                      if (
                        currentDroppable.id.substring('1') === '8' &&
                        piece.alt === 'wPP'
                      ) {
                        self.whiteGroup = true;
                        const whiteGroup = document.querySelector(
                          '.wrappingWhite'
                        );
                        currentDroppable.appendChild(whiteGroup);
                        whiteGroup.style.zIndex = 100000;
                        document.removeEventListener('mousemove', onMouseMove);
                        window.onmouseup = null;
                        piece.style.display = 'none';
                        // square.style.position = 'relative';
                        // const takenPiece = currentDroppable.firstChild;
                        // currentDroppable.style.position = 'relative';
                        // currentDroppable.style.boxSizing = 'border-box';
                        // currentDroppable.style.borderColor = 'transparent';
                      } else if (
                        currentDroppable.id.substring('1') === '1' &&
                        piece.alt === 'bPP'
                      ) {
                        self.blackGroup = true;
                        const blackGroup = document.querySelector(
                          '.wrappingBlack'
                        );
                        currentDroppable.appendChild(blackGroup);
                        blackGroup.style.zIndex = 100000;
                        document.removeEventListener('mousemove', onMouseMove);
                        window.onmouseup = null;
                        piece.style.display = 'none';
                        // square.style.position = 'relative';
                        // const takenPiece = currentDroppable.firstChild;
                        // currentDroppable.style.position = 'relative';
                        // currentDroppable.style.boxSizing = 'border-box';
                        // currentDroppable.style.borderColor = 'transparent';
                      } else {
                        document.removeEventListener('mousemove', onMouseMove);
                        window.onmouseup = null;
                        piece.style.width = 'calc(var(--square_size) / 8)';
                        piece.style.cursor = 'grab';
                        piece.style.zIndex = 1;
                        square.style.position = 'relative';
                        piece.style.position = 'absolute';
                        piece.style.top = '0px';
                        piece.style.left = '0px';
                        const takenPiece = currentDroppable.firstChild;
                        currentDroppable.style.position = 'relative';
                        currentDroppable.style.boxSizing = 'border-box';
                        currentDroppable.style.borderColor = 'transparent';
                        self.get_moves();
                        self.get_dominant_protection();
                        self.protect_pieces();
                        self.track_kings_position();
                        self.check_kings();
                        // check if king can take unprotected piece
                        Object.values(self.entries).forEach((entryPiece) => {
                          if (
                            takenPiece !== null &&
                            takenPiece.id === entryPiece.new_position
                          ) {
                            entryPiece.captured = true;
                            self.get_moves();
                            self.get_dominant_protection();
                            self.render_new_position('capture');
                            self.castling(entryPiece);
                          } else if (piece.id === entryPiece.new_position) {
                            entryPiece.new_position = currentDroppable.id;
                            self.get_moves();
                            self.get_dominant_protection();
                            self.render_new_position('move');
                            self.castling(entryPiece);
                          }
                        });
                        self.get_moves();
                        self.get_dominant_protection();
                        self.protect_pieces();
                        // track wK & bK
                        self.track_kings_position();
                        // checking kings
                        self.check_kings();
                        self.get_dangerous_piece();
                        if (self.black_checked) {
                          self.get_hidden_moves(currentDroppable.firstChild);
                          self.check_for_black_checkmate();
                        }
                        if (self.white_checked) {
                          self.get_hidden_moves(currentDroppable.firstChild);
                          self.check_for_white_checkmate();
                        }
                      }
                    } else {
                      document.removeEventListener('mousemove', onMouseMove);
                      piece.style.width = 'calc(var(--square_size) / 8)';
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
          }
          document.addEventListener('mousemove', onMouseMove);
          window.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            piece.style.zIndex = 1;
            piece.onmouseup = null;
            piece.style.width = 'calc(var(--square_size) / 8)';
            piece.style.cursor = 'grab';
            square.style.position = 'relative';
            piece.style.position = 'absolute';
            piece.style.top = '0px';
            piece.style.left = '0px';
            squares.forEach((s) => {
              s.style.borderColor = 'transparent';
            });
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
            elem.style.borderColor = 'white';
          }
          function leaveDroppable(elem) {
            if (elem == null) {
              return;
            }
            elem.style.borderColor = 'transparent';
          }
          piece.ondragstart = function() {
            return false;
          };
        }
        let self = this;
      }
    },
    get_moves() {
      const squares = document.querySelectorAll('.square');
      this.white_moves = [];
      this.black_moves = [];
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
        if (selectedPiece.selected_piece_initial === 'wPP') {
          this.get_white_pawn_moves(selectedPiece, check);
        }
        if (selectedPiece.selected_piece_initial === 'wNN') {
          this.get_knight_moves(selectedPiece, check, 'w');
        }
        if (selectedPiece.selected_piece_initial === 'wBB') {
          this.get_bishop_moves(selectedPiece, forbiden, check, 'w');
        }
        if (
          selectedPiece.selected_piece_initial === 'wRr' ||
          selectedPiece.selected_piece_initial === 'wRl'
        ) {
          this.get_rook_moves(selectedPiece, forbiden, check, 'w');
        }
        if (selectedPiece.selected_piece_initial === 'wQQ') {
          this.get_queen_moves(selectedPiece, forbiden, check, 'w');
        }
        if (selectedPiece.selected_piece_initial === 'wKK') {
          this.get_white_king_moves(selectedPiece, check);
        }
        if (selectedPiece.selected_piece_initial === 'bPP') {
          this.get_black_pawn_moves(selectedPiece, check);
        }
        if (selectedPiece.selected_piece_initial === 'bNN') {
          this.get_knight_moves(selectedPiece, check, 'b');
        }
        if (selectedPiece.selected_piece_initial === 'bBB') {
          this.get_bishop_moves(selectedPiece, forbiden, check, 'b');
        }
        if (
          selectedPiece.selected_piece_initial === 'bRr' ||
          selectedPiece.selected_piece_initial === 'bRl'
        ) {
          this.get_rook_moves(selectedPiece, forbiden, check, 'b');
        }
        if (selectedPiece.selected_piece_initial === 'bQQ') {
          this.get_queen_moves(selectedPiece, forbiden, check, 'b');
        }
        if (selectedPiece.selected_piece_initial === 'bKK') {
          this.get_black_king_moves(selectedPiece, check, 'b');
        }
      });
    },
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
      if (selectedPiece.selected_piece_initial === 'wPP') {
        this.get_white_pawn_moves(selectedPiece, check);
      }
      if (selectedPiece.selected_piece_initial === 'bPP') {
        this.get_black_pawn_moves(selectedPiece, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wNN' ||
        selectedPiece.selected_piece_initial === 'bNN'
      ) {
        this.get_knight_moves(selectedPiece, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wBB' ||
        selectedPiece.selected_piece_initial === 'bBB'
      ) {
        this.get_bishop_moves(selectedPiece, forbiden, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wRr' ||
        selectedPiece.selected_piece_initial === 'bRr' ||
        selectedPiece.selected_piece_initial === 'wRl' ||
        selectedPiece.selected_piece_initial === 'bRl'
      ) {
        this.get_rook_moves(selectedPiece, forbiden, check);
      }
      if (
        selectedPiece.selected_piece_initial === 'wQQ' ||
        selectedPiece.selected_piece_initial === 'bQQ'
      ) {
        this.get_queen_moves(selectedPiece, forbiden, check);
      }
      if (selectedPiece.selected_piece_initial === 'wKK') {
        this.get_white_king_moves(selectedPiece, check);
      }
      if (selectedPiece.selected_piece_initial === 'bKK') {
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
          const id = selectedPiece.selected_piece_position;
          const alt = selectedPiece.selected_piece_initial;
          if (!check) {
            this.moves = fine;
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.white_moves.push({ piece, newMoves, fine, id, alt });
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
          const id = selectedPiece.selected_piece_position;
          const alt = selectedPiece.selected_piece_initial;
          if (!check) {
            this.moves = fine;
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.black_moves.push({ piece, newMoves, fine, id, alt });
            this.moves.push(fine);
          }
        }
      }
    },
    get_knight_moves(selectedPiece, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wNN' ? 'black' : 'white';
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
          const id = selectedPiece.selected_piece_position;
          const alt = selectedPiece.selected_piece_initial;
          if (!check) {
            this.moves = finalMoves;
          } else if (color === 'b') {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.black_moves.push({ piece, finalMoves, protect, id, alt });
            this.moves.push(finalMoves);
          } else {
            this.moves = [];
            const piece = selectedPiece.selected_piece_position;
            this.white_moves.push({ piece, finalMoves, protect, id, alt });
            this.moves.push(finalMoves);
          }
        }
      }
    },
    get_bishop_moves(selectedPiece, forbiden, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wBB' ? 'black' : 'white';
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
      const initial = selectedPiece.selected_piece_initial;
      const id = selectedPiece.selected_piece_position;
      const alt = selectedPiece.selected_piece_initial;
      if (!check) {
        this.moves = finalMoves;
      } else if (color === 'b') {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.black_moves.push({ piece, finalMoves, protect, initial, id, alt });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves, protect, initial, id, alt });
        this.moves.push(finalMoves);
      }
    },
    get_rook_moves(selectedPiece, forbiden, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wRr' ||
        selectedPiece.selected_piece_initial === 'wRl'
          ? 'black'
          : 'white';
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
      const initial = selectedPiece.selected_piece_initial;
      const id = selectedPiece.selected_piece_position;
      const alt = selectedPiece.selected_piece_initial;
      if (!check) {
        this.moves = finalMoves;
      } else if (color === 'b') {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.black_moves.push({ piece, finalMoves, protect, initial, id, alt });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves, protect, initial, id, alt });
        this.moves.push(finalMoves);
      }
    },
    get_queen_moves(selectedPiece, forbiden, check, color) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        selectedPiece.selected_piece_initial === 'wQQ' ? 'black' : 'white';
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
      const initial = selectedPiece.selected_piece_initial;
      const id = selectedPiece.selected_piece_position;
      const alt = selectedPiece.selected_piece_initial;
      if (!check) {
        this.moves = finalMoves;
      } else if (color === 'b') {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.black_moves.push({ piece, finalMoves, protect, initial, id, alt });
        this.moves.push(finalMoves);
      } else {
        this.moves = [];
        const piece = selectedPiece.selected_piece_position;
        this.white_moves.push({ piece, finalMoves, protect, initial, id, alt });
        this.moves.push(finalMoves);
      }
    },
    get_white_king_moves(selectedPiece, check) {
      const squares = document.querySelectorAll('.square');
      this.moves = [];
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
      let finalMoves1 = [];
      let protect = [];
      const magic = [];
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      for (let i = 0; i < letters.length; i++) {
        const element = letters[i];
        if (element === letter) {
          const fields = {
            forward: `${letter}${num + 1}`,
            backward: `${letter}${num - 1}`,
            left: `${letters[i - 1]}${num}`,
            right: `${letters[i + 1]}${num}`,
            castleLeft: `${
              this.white_queenside_castling ? letters[i - 2] + num : null
            }`,
            castleRight: `${
              this.white_kingside_castling ? letters[i + 2] + num : null
            }`,
            upRight: `${letters[i + 1]}${num + 1}`,
            upLeft: `${letters[i - 1]}${num + 1}`,
            downRight: `${letters[i + 1]}${num - 1}`,
            downLeft: `${letters[i - 1]}${num - 1}`,
          };
          const objects = Object.entries(fields);
          objects.forEach((obj) => {
            squares.forEach((square) => {
              if (square.id === obj[1]) {
                protect.push(obj[1]);
                if (square.firstElementChild) {
                  if (
                    square.firstElementChild.classList[0] === 'black' ||
                    square.firstElementChild.tagName === 'DIV'
                  ) {
                    finalMoves1.push(obj[1]);
                  }
                } else if (this.white_kingside_castling) {
                  finalMoves1.push(obj[1]);
                } else {
                  if (obj[0] === 'castleRight') {
                    return;
                  } else {
                    finalMoves1.push(obj[1]);
                  }
                }
                /////
                if (square.firstElementChild) {
                  if (
                    square.firstElementChild.tagName === 'DIV' ||
                    (square.firstElementChild.classList[0] === 'black' &&
                      square.firstElementChild.classList[1] !== 'protected')
                  ) {
                    magic.push(obj[1]);
                  }
                } else if (this.white_queenside_castling) {
                  magic.push(obj[1]);
                } else {
                  if (obj[0] === 'castleLeft') {
                    return;
                  } else {
                    magic.push(obj[1]);
                  }
                }
              }
            });
          });
        }
      }
      // let output = magic.filter((e) => {
      //   return !this.black_dominant_everything_take.includes(e);
      // });
      let output = magic.filter((e) => {
        return (
          !this.black_protection.includes(e) &&
          !this.black_dominant_everything_take.includes(e)
        );
      });

      if (!check) {
        this.moves = output;
      }
      this.white_king_moves = [];
      const finalMoves = output;
      this.white_king_moves = output;
      const alt = selectedPiece.selected_piece_initial;
      this.white_moves.push({ finalMoves, output, protect, alt });
      // this.white_only_defence = output;
    },
    get_black_king_moves(selectedPiece, check) {
      const squares = document.querySelectorAll('.square');
      this.moves = [];
      const letter = selectedPiece.selected_piece_position.charAt(0);
      const num = parseInt(selectedPiece.selected_piece_position.charAt(1));
      let finalMoves1 = [];
      let protect = [];
      const magic = [];
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      for (let i = 0; i < letters.length; i++) {
        const element = letters[i];
        if (element === letter) {
          const fields = {
            forward: `${letter}${num + 1}`,
            backward: `${letter}${num - 1}`,
            left: `${letters[i - 1]}${num}`,
            right: `${letters[i + 1]}${num}`,
            castleLeft: `${
              this.black_queenside_castling ? letters[i - 2] + num : null
            }`,
            castleRight: `${
              this.black_kingside_castling ? letters[i + 2] + num : null
            }`,
            upRight: `${letters[i + 1]}${num + 1}`,
            upLeft: `${letters[i - 1]}${num + 1}`,
            downRight: `${letters[i + 1]}${num - 1}`,
            downLeft: `${letters[i - 1]}${num - 1}`,
          };
          const objects = Object.entries(fields);
          objects.forEach((obj) => {
            squares.forEach((square) => {
              if (square.id === obj[1]) {
                protect.push(obj[1]);
                if (square.firstElementChild) {
                  if (
                    square.firstElementChild.classList[0] === 'white' ||
                    (square.firstElementChild.tagName === 'DIV' &&
                      square.firstElementChild.classList[1] !== 'protected')
                  ) {
                    finalMoves1.push(obj[1]);
                  }
                } else if (this.black_kingside_castling) {
                  finalMoves1.push(obj[1]);
                } else {
                  if (obj[0] === 'castleRight') {
                    return;
                  } else {
                    finalMoves1.push(obj[1]);
                  }
                }
                /////
                if (square.firstElementChild) {
                  if (
                    square.firstElementChild.classList[0] === 'white' ||
                    square.firstElementChild.tagName === 'DIV'
                  ) {
                    magic.push(obj[1]);
                  }
                } else if (this.black_queenside_castling) {
                  magic.push(obj[1]);
                } else {
                  if (obj[0] === 'castleLeft') {
                    return;
                  } else {
                    magic.push(obj[1]);
                  }
                }
              }
            });
          });
        }
      }
      // console.log(this.white_king_moves);
      // let output = magic.filter((e) => {
      //   return !this.white_dominant_everything_take.includes(e);
      // });
      let output = magic.filter((e) => {
        return (
          !this.white_protection.includes(e) &&
          !this.white_dominant_everything_take.includes(e)
        );
      });
      if (!check) {
        this.moves = output;
      }
      // console.log(output);
      const finalMoves = output;
      const alt = selectedPiece.selected_piece_initial;
      this.black_king_moves = [];
      this.black_king_moves = output;
      this.black_moves.push({ finalMoves, output, protect, alt });
      // this.black_only_defence = output;
    },
    get_hidden_moves(dangerousDrop) {
      const squares = document.querySelectorAll('.square');
      const colorClass =
        dangerousDrop.alt.substring(0, 1) === 'b' ? 'black' : 'white';
      let dangerousMain =
        colorClass === 'white'
          ? this.dangerous_white_piece
          : this.dangerous_black_piece;
      let letter;
      let num;
      if (!dangerousMain) {
        dangerousMain = dangerousDrop;
      }
      let arr = [dangerousDrop, dangerousMain];
      let secretAgent = [];

      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        letter = ele.id.charAt(0);
        num = parseInt(ele.id.charAt(1));
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
        let objectNumberSecret = 0;
        let j = 1;
        function diagonalSecret() {
          const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const objects = {
                one: `${letters[i + j]}${num - j}`,
                two: `${letters[i + j]}${num + j}`,
                three: `${letters[i - j]}${num + j}`,
                four: `${letters[i - j]}${num - j}`,
              };
              j++;
              squares.forEach((square) => {
                const obj = objects[Object.keys(objects)[objectNumberSecret]];
                if (obj == undefined) {
                  return obj == 'undefined';
                }
                if (obj.substring(0, 1) === 'u') {
                  objectNumberSecret++;
                  objectNumberSecret++;
                  j = 1;
                  diagonalSecret();
                }
                if (
                  obj.substring(1, 2) === '0' ||
                  obj.substring(1, 2) === '10' ||
                  obj.substring(1, 2) === '9'
                ) {
                  objectNumberSecret++;
                  j = 1;
                  diagonalSecret();
                } else {
                  let ss =
                    square.firstElementChild === null
                      ? square.firstElementChild
                      : square.firstElementChild.alt;
                  if (square.id === obj) {
                    if (
                      square.firstElementChild &&
                      ss !== 'wKK' &&
                      square.firstElementChild &&
                      ss !== 'bKK'
                    ) {
                      j = 1;
                      if (
                        square.firstElementChild.classList[0] === colorClass
                      ) {
                        secretAgent.push(obj);
                        objectNumberSecret++;
                        diagonalSecret();
                      } else {
                        objectNumberSecret++;
                        diagonalSecret();
                      }
                    } else {
                      forbiden.forEach((forbid) => {
                        if (obj === forbid) {
                          objectNumberSecret++;
                          j = 1;
                          diagonalSecret();
                        }
                      });
                      secretAgent.push(obj);
                      diagonalSecret();
                    }
                  }
                }
              });
            }
          }
        }
        let objectNumberStraightSecret = 0;
        let q = 1;
        function secretStraight() {
          const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if (element === letter) {
              const objects = {
                one: `${letters[i + q]}${num}`,
                two: `${letter}${num + q}`,
                three: `${letters[i - q]}${num}`,
                four: `${letter}${num - q}`,
              };
              q++;
              squares.forEach((square) => {
                const obj =
                  objects[Object.keys(objects)[objectNumberStraightSecret]];
                if (obj == undefined) {
                  return obj == 'undefined';
                }
                if (obj.substring(0, 1) === 'u') {
                  objectNumberStraightSecret++;
                  q = 1;
                  secretStraight();
                }
                if (
                  obj.substring(1, 2) === '0' ||
                  obj.substring(1, 2) === '10' ||
                  obj.substring(1, 2) === '9'
                ) {
                  objectNumberStraightSecret++;
                  q = 1;
                  secretStraight();
                } else {
                  let ss =
                    square.firstElementChild === null
                      ? square.firstElementChild
                      : square.firstElementChild.alt;
                  if (square.id === obj) {
                    if (
                      square.firstElementChild &&
                      ss !== 'wKK' &&
                      square.firstElementChild &&
                      ss !== 'bKK'
                    ) {
                      q = 1;
                      if (
                        square.firstElementChild.classList[0] === colorClass
                      ) {
                        secretAgent.push(obj);
                        objectNumberStraightSecret++;
                        secretStraight();
                      } else {
                        objectNumberStraightSecret++;
                        q = 1;
                        secretStraight();
                      }
                    } else {
                      secretAgent.push(obj);
                      secretStraight();
                    }
                  }
                }
              });
            }
          }
        }
        if (ele.alt.substring(2, 3) === 'B') {
          diagonalSecret();
        }
        if (
          ele.alt.substring(2, 3) === 'l' ||
          ele.alt.substring(2, 3) === 'r'
        ) {
          secretStraight();
        }
        if (ele.alt.substring(2, 3) === 'Q') {
          diagonalSecret();
          secretStraight();
        }
      }
      if (colorClass === 'white') {
        this.whiteSecretMoves = [];
        this.whiteSecretMoves.push(...new Set(secretAgent));
      } else {
        this.blackSecretMoves = [];
        this.blackSecretMoves.push(...new Set(secretAgent));
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
/*  */
.wrappingWhite {
  display: block;
  position: absolute;
}
.wrappingBlack {
  display: block;
  position: absolute;
}
.promotWhitePawn {
  display: flex;
  flex-direction: column;
}
.promotWhitePawn img {
  background-color: rgb(255, 169, 41);
}
.promotWhitePawn img:hover {
  background-color: rgb(221, 107, 0);
}
.promotBlackPawn {
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  bottom: -60px;
}
.promotBlackPawn img {
  background-color: rgb(255, 169, 41);
}
.promotBlackPawn img:hover {
  background-color: rgb(221, 107, 0);
}
/*  */
.black_square {
  height: calc(var(--square_size) / 8);
  width: calc(var(--square_size) / 8);
  background-color: rgb(34, 128, 190);
}
.white_square {
  height: calc(var(--square_size) / 8);
  width: calc(var(--square_size) / 8);
  background-color: rgb(162, 210, 255);
}
img {
  width: calc(var(--square_size) / 8);
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
  margin: calc(var(--square_size) / 30) auto;
  width: calc(var(--square_size) / 20);
  height: calc(var(--square_size) / 20);
  background: rgba(29, 29, 29, 0.8);
  border-radius: 50%;
  z-index: 0;
}
.target::after {
  display: block;
  content: ' ';
  margin: calc(var(--square_size) / 200) auto;
  width: calc(var(--square_size) / 10);
  height: calc(var(--square_size) / 10);
  background: rgba(29, 29, 29, 0.8);
  border-radius: 50%;
  z-index: 0;
}
.kingDanger {
  background-color: red;
}
@media (max-width: 600px) {
  :root {
    --square_size: 300px;
  }
}
@media (max-width: 400px) {
  :root {
    --square_size: 280px;
  }
}
</style>
