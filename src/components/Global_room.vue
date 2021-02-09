<template>
  <div class="d-flex justify-center">
    <v-alert v-if="alert" color="success">
      <v-row align="center">
        <v-col class="grow white--text">
          <h1>You have an invitation from {{ opponentName }}!</h1>
        </v-col>
        <v-col class="shrink">
          <v-btn @click="accept" class="mb-4 success--text">Accept</v-btn>
          <v-btn @click="reject" class="error--text">Reject</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <div class="main">
      <h1 class="mt-5 white--text text-center">
        Welcome {{ global_player_name }}
      </h1>
      <br />
      <v-row justify="center">
        <v-col
          v-if="playerList.length > 0"
          class="d-flex flex-wrap justify-center"
        >
          <v-card
            v-for="player in playerList"
            :key="player.id"
            class="ma-5"
            width="300"
            height="170"
          >
            <div class="head">
              <div class="online"></div>
              <p class="para">Online</p>
            </div>
            <v-list-item color="#26c6da">
              <v-list-item-title class="headline text-center">
                {{ player.name }}
              </v-list-item-title>
            </v-list-item>

            <div class="pl-3" v-if="waiting && opponentId === player.id">
              Waiting for {{ player.name }} to join!
              <v-progress-circular
                class="ml-7"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>

            <v-card-actions
              class="mt-1 d-flex justify-center"
              style="position: absolute; bottom: 0"
            >
              <v-btn
                :disabled="!validLocal"
                color="success"
                @click="play(player)"
                text
              >
                Play
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <h2 v-else class="mt-5 red--text text-center">
          No player is available
        </h2>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerOne: "",
      playerTwo: "",
      waiting: false,
      opponentId: "",
      alert: false,
      opponentName: "",

      global_player_name: this.$store.state.global_player.name,
      global_player_id: this.$store.state.global_player.id,

      validGlobal: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],

      validLocal: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      player: null,
      // socket: '',
      playerList: [],
      // showPlayer: false,
      // message: '',
    };
  },

  methods: {
    validateLocal() {
      this.$store.dispatch("set_players", {
        playerOne: this.playerOne,
        playerTwo: this.playerTwo,
      });
      this.$router.push("/local");
    },
    play(opponent) {
      this.waiting = true;
      this.opponentId = opponent.id;
      this.$socket.client.emit("invitation", {
        player: this.player,
        opponent: opponent,
      });
      // this.player = "";
      // this.$router.push("/global");
    },
    accept() {
      this.alert = false;
      this.$socket.client.emit("accept", this.$socket.client.id);
      this.$socket.client.emit("getNames");
    },
    reject() {
      this.alert = false;
      this.$socket.client.emit("reject");
    },
  },

  mounted() {
    this.$socket.client.on("updateList", (data) => {
      this.playerList = data.filter(
        (e) => e.name !== this.$store.state.global_player.name
      );
      this.player = "";
      this.player = data.filter(
        (e) => e.name === this.$store.state.global_player.name
      )[0];
    });
    this.$socket.client.on("invited", (data) => {
      this.alert = true;
      this.opponentName = data;
    });
    this.$socket.client.on("second_reject", () => {
      this.waiting = false;
    });
    this.$socket.client.on("second_accept", (id) => {
      this.$store.dispatch("set_black_player", id);
      this.waiting = false;
      this.$router.push("/global");
    });
    //   this.socket.on('message', (data)=>{
    //    this.message = data;
    //    setTimeout(() => {
    //      this.message = '';
    //    }, 3000);
    //  }),
    //  this.socket.on('startGame', ()=>{
    //    this.$router.push('/game')
    //  })
  },
  beforeDestroy() {
    this.waiting = false;
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    customEmit(val) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
  },
  computed: {},
};
</script>

<style>
.main {
  width: 100%;
}
h1 {
  font-size: 25px;
}
.coming {
  height: 30px;
}
.head {
  display: flex;
  align-items: center;
  width: 100px;
}
.online {
  margin-left: 5px;
  width: 20px;
  height: 20px;
  background-color: rgb(105, 255, 45);
  border-radius: 50%;
}
.v-application p {
  margin-bottom: 0;
}
.para {
  padding: 5px;
  margin-bottom: 0;
  color: grey;
  font-size: 12px;
}
.v-sheet.v-alert {
  position: absolute;
  transition: ease 0.5s;
  animation: alert 1s;
  top: 0;
  z-index: 1000000;
}
@keyframes alert {
  from {
    top: -150px;
  }
  to {
    top: 0;
  }
}
</style>
