// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

//const opts = {}

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // default - only for display purposes
  },
})