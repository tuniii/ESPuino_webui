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
        :prepend-icon="icons.volumeMedium"
        :append-icon="icons.volumeHigh"
        max="21"
        min="1"
        thumb-label
        @change="sendVolume()"
      ></v-slider>
    </v-card-text>
  </v-container>
</template>

<script>
import {
  mdiSkipBackward,
  mdiRewind,
  mdiPause,
  mdiFastForward,
  mdiSkipForward,
  mdiVolumeMedium,
  mdiVolumeHigh,
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
        volumeMedium: mdiVolumeMedium,
        volumeHigh: mdiVolumeHigh
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
