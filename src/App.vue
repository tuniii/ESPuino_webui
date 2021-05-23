<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn color="blue-grey" class="ma-2 white--text" href="/restart">
        Restart
        <v-icon right dark> mdi-restart </v-icon>
      </v-btn>
      <v-btn color="blue-grey" class="ma-2 white--text" href="/restart">
        Standby
        <v-icon right dark> mdi-power-standby </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-card width="800" class="mx-auto">
        <v-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <component :is="item.content" @sendMessage="sendMessage"></component>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Control from "./components/Control";
import Rfid from "./components/Rfid";

export default {
  name: "App",

  components: {
    Control,
    Rfid,
  },

  data() {
    return {
      connection: null,
      tab: null,
      items: [
        { tab: "Steuerung", content: Control },
        { tab: "RFID", content: Rfid },
      ],
    };
  },
  methods: {
    sendMessage: function(message) {
      console.log("Hello")
      console.log(this.connection)
      this.connection.send(message)
    },
    sendMessageFromChild(message) {
      this.sendMessage(message)
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    //this.connection = new WebSocket("wss://echo.websocket.org")
    this.connection = new WebSocket("ws://" + location.host + "/ws")

    this.connection.onmessage = function(event) {
      console.log(event)
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
  }
};
</script>
