<template>
  <div class="d-flex justify-center">
    <v-btn style="position: absolute; left: 0" color="error" @click="restart" text> restart server </v-btn>
    <div class="main">
      <h1 class="mt-5 white--text text-center">Welcome to Marj's Chess App</h1>
      <br />
      <br />
      <v-row justify="space-around">
        <v-col md="6">
          <v-card
            class="mx-auto"
            width="300"
            height="400"
            style="position: relative"
          >
            <v-form ref="form" v-model="validGlobal">
              <v-list-item color="#26c6da" three-line>
                <v-list-item-title class="headline text-center">
                  Play Globally
                </v-list-item-title>
              </v-list-item>
              <v-row justify="center">
                <v-col cols="8">
                  <v-text-field
                    class="pb-3"
                    v-model="global_player"
                    :rules="nameRules"
                    :counter="10"
                    label="Player name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              <v-divider></v-divider>

              <v-card-actions class="d-flex justify-center mt-1" height="100">
                <v-btn
                  :disabled="!validGlobal"
                  color="success"
                  @click="validateGloabal"
                  text
                >
                  join
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
export default {
  data() {
    return {
      playerOne: "",
      playerTwo: "",
      global_player: "",

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
    validateGloabal() {
      const player = {
        name: this.global_player,
        id: this.$socket.client.id,
      };
      this.$store.dispatch("set_global_player", {
        global_player: player,
      });
      this.$socket.client.emit("join", player);
      this.$router.push("/global_room");
    },
    restart() {
      this.$socket.client.emit("restart");
    },
  },
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
