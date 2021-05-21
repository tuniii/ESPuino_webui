<template>
  <v-container>
    <v-subheader>Dateien</v-subheader>
    <v-treeview
      v-model="tree"
      :open="initiallyOpen"
      :items="items"
      activatable
      item-key="name"
      dense
    >
      <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.file">
            {{ open ? "mdi-folder-open" : "mdi-folder" }}
          </v-icon>
          <v-icon v-else>
            {{ files[item.file] }}
          </v-icon>
      </template>
      <template v-slot:label="{ item }">
      <a @contextmenu="show">{{ item.name }}</a>
    </template>
    </v-treeview>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-row>
      <v-textarea
        class="mx-2"
        rows="1"
        label="Pfad auf SD-Karte"
        no-resize
      ></v-textarea>
      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        :loading="isSelecting"
        @click="onButtonClick"
      >
        Browse
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChanged"
      />
      <v-btn color="blue-grey" class="ma-2 white--text">
        Upload
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-subheader>RFID-Karte zuweise</v-subheader>
  </v-container>
</template>

<script>

export default {
  name: "Control",
  props: {},
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    menuItems: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
    initiallyOpen: ["public"],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      audio: "mdi-music-note",
    },
    tree: [],
    items: [
      {
        name: ".git",
      },
      {
        name: "node_modules",
      },
      {
        name: "public",
        children: [
          {
            name: "static",
            children: [
              {
                name: "logo.png",
                file: "png",
              },
            ],
          },
          {
            name: "favicon.ico",
            file: "png",
          },
          {
            name: "index.html",
            file: "html",
          },
        ],
      },
      {
        name: ".gitignore",
        file: "txt",
      },
      {
        name: "babel.config.js",
        file: "js",
      },
      {
        name: "package.json",
        file: "json",
      },
      {
        name: "README.md",
        file: "md",
      },
      {
        name: "vue.config.js",
        file: "js",
      },
      {
        name: "yarn.lock",
        file: "txt",
      },
      {
        name: "test.mp3",
        file: "audio",
      },
    ],
  }),
  mounted: function () {},
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      // do something
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
  },
};
</script>

<style scoped>
.v-card-text {
  max-height: 200px;
}
</style>
