<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }"> </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Checkmate... {{ player }} Won!
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="close()">
            close
          </v-btn>
          <!-- <v-btn color="primary" text @click="newGame()">
            New Game
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    player: '',
  },

  methods: {
    // newGame() {
    //   this.$emit('newGame');
    // },
    close() {
      this.$emit('close');
    },
  },
};
</script>
