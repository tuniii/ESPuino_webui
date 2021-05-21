<template>
  <v-container>
      <v-subheader>Steuerung</v-subheader>
      <div class="form-group col-md-12">
        <div class="buttons">
          <v-btn onclick="sendControl(173)" icon fab x-large>
            <v-icon>mdi-skip-backward</v-icon>
          </v-btn>
          <v-btn onclick="sendControl(171)" icon fab x-large>
            <v-icon>mdi-rewind</v-icon>
          </v-btn>
          <v-btn onclick="sendControl(170)" icon fab x-large>
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn onclick="sendControl(172)" icon fab x-large>
            <v-icon>mdi-fast-forward</v-icon>
          </v-btn>
          <v-btn onclick="sendControl(174)" icon fab x-large>
            <v-icon>mdi-skip-forward</v-icon>
          </v-btn>
        </div>
      </div>
      <v-subheader>Lautstärke</v-subheader>
    <v-card-text>
      <v-slider
        v-model="volValue"
        prepend-icon="mdi-volume-medium"
        append-icon="mdi-volume-high"
        max="21"
        min="1"
        thumb-label
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

export default {
  name: "Control",
  props: {},
  data() {
    return {
      volValue: 1,
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
