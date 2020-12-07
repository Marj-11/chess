<template>
  <div class="d-flex justify-center">
    <div class="main">
      <h1 class=" mt-5 white--text text-center">Welcome to Marj's Chess App</h1>
      <br />
      <br />
      <v-row justify="space-around">
        <v-col md="6">
          <v-card class="mx-auto" width="300" height="400" disabled>
            <v-form ref="form" v-model="validGlobal">
              <v-list-item color="#26c6da" three-line>
                <v-list-item-title class="headline text-center">
                  Play Globally
                </v-list-item-title>
              </v-list-item>
              <div class="text-center coming">
                <h1>Coming Soon</h1>
              </div>
              <v-row justify="center">
                <v-col cols="8">
                  <v-text-field
                    v-model="GlobalPlayer"
                    :rules="nameRules"
                    :counter="10"
                    label="Player name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="6" align="center">
                  <v-img
                    src="@/assets/bKK.png"
                    alt="black king"
                    width="100"
                  ></v-img>
                </v-col>

                <v-col cols="6" align="center">
                  <v-img
                    src="@/assets/wKK.png"
                    alt="white king"
                    width="100"
                  ></v-img>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-actions class="d-flex justify-center" height="100">
                <v-btn
                  :disabled="!validGlobal"
                  color="success"
                  @click="validateGloabal"
                  text
                >
                  Available Rooms
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
        <v-col md="6">
          <v-card class="mx-auto" width="300" height="400">
            <v-form ref="form" v-model="validLocal">
              <v-list-item color="#26c6da" three-line>
                <v-list-item-title class="headline text-center">
                  Play Locally
                </v-list-item-title>
              </v-list-item>
              <v-row align="center">
                <v-col cols="5">
                  <v-img
                    src="@/assets/bKK.png"
                    alt="black king"
                    width="100"
                  ></v-img>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="playerOne"
                    :rules="nameRules"
                    :counter="10"
                    label="Player one"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="5">
                  <v-img
                    src="@/assets/wKK.png"
                    alt="white king"
                    width="100"
                  ></v-img>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="playerTwo"
                    :rules="nameRules"
                    :counter="10"
                    label="Player two"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>

              <v-card-actions class="mt-1 d-flex justify-center" center>
                <v-btn
                  :disabled="!validLocal"
                  color="success"
                  @click="validateLocal"
                  text
                >
                  Play
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// import io from 'socket.io-client';
export default {
  data() {
    return {
      playerOne: '',
      playerTwo: '',
      GlobalPlayer: '',

      validGlobal: true,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'Name must be less than 10 characters',
      ],

      validLocal: true,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      // player: null,
      // socket: '',
      // playerList: [],
      // showPlayer: false,
      // message: '',
    };
  },

  methods: {
    validateLocal() {
      this.$store.dispatch('set_players', {
        playerOne: this.playerOne,
        playerTwo: this.playerTwo,
      });
      this.$router.push('/local');
    },
    validateGloabal() {
      // console.log('Global');
    },
    // join() {
    // this.socket.emit('joinRoom', this.player);
    // this.player = '';
    // },
  },
  created() {
    // this.socket = io('http://localhost:3000/');
  },
  mounted() {
    //  this.socket.on('updateList', (data)=>{
    //    this.playerList = data;
    //  });
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
  computed: {},
};
</script>

<style>
.main {
  width: 80%;
}
.coming {
  height: 30px;
}
</style>
