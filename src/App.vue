<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-icon class="mr-10" size="32">{{ icons.speaker }}</v-icon>

        <v-btn v-for="item in items" :key="item.name" @click="changeComponent(item)" text>
          {{ item.name }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-sheet min-height="70vh" rounded="lg">
          <component
              :is="this.selectedComponent"
              @sendMessage="sendMessage"
            ></component>
        </v-sheet>
      </v-container>
    </v-main>

    <!--v-main>
      <v-card class="mx-auto">
        <v-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <component
              :is="item.content"
              @sendMessage="sendMessage"
            ></component>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-main-->
  </v-app>
</template>

<script>
import Control from "./components/Control";
import Rfid from "./components/Rfid";
import { mdiSpeaker } from "@mdi/js";

export default {
  name: "App",

  components: {
    Control,
    Rfid
  },

  data() {
    return {
      connection: null,
      tab: null,
      items: [
        { name: "Steuerung", component: Control },
        { name: "RFID", component: Rfid },
      ],
      selectedComponent: Control,
      icons: {
        speaker: mdiSpeaker,
      },
    };
  },
  computed: {
  },
  methods: {
    sendMessage: function (message) {
      console.log("Hello");
      console.log(this.connection);
      this.connection.send(message);
    },
    sendMessageFromChild(message) {
      this.sendMessage(message);
    },
    changeComponent: function (item) {
      this.selectedComponent = item.component
    },
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    //this.connection = new WebSocket("wss://echo.websocket.org")
    this.connection = new WebSocket("ws://" + location.host + "/ws");

    this.connection.onmessage = function (event) {
      console.log(event);
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };
  },
};
</script>
