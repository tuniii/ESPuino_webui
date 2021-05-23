<template>
  <v-container>
    <v-subheader>Steuerung</v-subheader>
    <div class="form-group col-md-12">
      <div class="buttons">
        <v-btn @click="sendControl(173)" icon fab x-large>
          <v-icon>{{ icons.skipBack }}</v-icon>
        </v-btn>
        <v-btn @click="sendControl(171)" icon fab x-large>
          <v-icon>{{ icons.fastBack }}</v-icon>
        </v-btn>
        <v-btn @click="sendControl(170)" icon fab x-large>
          <v-icon>{{ icons.pause }}</v-icon>
        </v-btn>
        <v-btn @click="sendControl(172)" icon fab x-large>
          <v-icon>{{ icons.fastForward }}</v-icon>
        </v-btn>
        <v-btn @click="sendControl(174)" icon fab x-large>
          <v-icon>{{ icons.skipForward }}</v-icon>
        </v-btn>
      </div>
    </div>
    <v-subheader>Lautstärke</v-subheader>
    <v-card-text>
      <v-slider
        v-model="volume"
        prepend-icon="mdi-volume-medium"
        append-icon="mdi-volume-high"
        max="21"
        min="1"
        thumb-label
        @change="sendVolume()"
      ></v-slider>
    </v-card-text>
  </v-container>
  <!--div class="form-group col-md-12">
      <legend>Lautst&auml;rke</legend>
      <b-row>
        <b-col cols="12" md="1">
          <font-awesome-icon icon="volume-down" size="2x" />
        </b-col>
        <b-col cols="12" md="10">
          <vue-slider
            v-model="volValue"
            :min="1"
            :max="21"
            :tooltip="'always'"
          />
        </b-col>
        <b-col cols="12" md="1">
          <font-awesome-icon icon="volume-up" size="2x" />
        </b-col>
      </b-row>
      <input data-provide="slider" type="number" data-slider-min="1" data-slider-max="21" min="1" max="21" class="form-control" id="setVolume"
                data-slider-value="%CURRENT_VOLUME%" value="%CURRENT_VOLUME%" onchange="sendVolume(this.value)"-->
</template>

<script>
import {
  mdiSkipBackward,
  mdiRewind,
  mdiPause,
  mdiFastForward,
  mdiSkipForward,
} from "@mdi/js";

export default {
  name: "Control",
  props: {},
  methods: {
    sendControl: function (cmd) {
        var obj = {
            "controls": {
                action: cmd
            }
        };
        var jsonObj = JSON.stringify(obj);
        this.$emit('sendMessage', jsonObj);
    },
    sendVolume: function () {
        var obj = {
            "controls": {
                set_volume: this.$data.volume
            }
        };
        var jsonObj = JSON.stringify(obj);
        this.$emit('sendMessage', jsonObj);
    }
  },
  data() {
    return {
      volume: 1,
      icons: {
        skipBack: mdiSkipBackward,
        fastBack: mdiRewind,
        pause: mdiPause,
        fastForward: mdiFastForward,
        skipForward: mdiSkipForward,
      },
    };
  },
  mounted: function () {
    /*this.axios.get("/settings").then((response) => {
      this.value = response.data.hardware;
      this.copyOfSystem = Object.assign({}, response.data);
      this.systemSettings = response.data.system;
    });*/
  },
};
</script>
