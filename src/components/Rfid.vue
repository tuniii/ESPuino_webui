<template>
  <v-container>
    <v-subheader>Dateien</v-subheader>
    <v-card height="200px" class="scroll" scrollable flat>
      <v-treeview
        v-model="tree"
        :open="initiallyOpen"
        :items="items"
        :load-children="loadChildrens"
        @update:active="onItemSelect"
        return-object
        activatable
        item-key="name"
        dense
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.dir">
            {{ open ? icons.folderOpen : icons.folder }}
          </v-icon>
          <v-icon v-else-if="isAudioFile(item.name)">
            {{ icons.audioFile }}
          </v-icon>
          <v-icon v-else>
            {{ icons.unknownFile }}
          </v-icon>
        </template>
        <!--template v-slot:label="{ item }">
          <a @contextmenu="show">{{ item.name }}</a>
        </template-->
      </v-treeview>
    </v-card>
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
        v-model="selectedPath"
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
import { mdiFolderOpen, mdiFolder, mdiMusicNote, mdiFile } from "@mdi/js";

export default {
  name: "Control",
  props: {},
  data: () => ({
    initiallyOpen: ['/'],
    selectedPath: '',
    icons: {
      folderOpen: mdiFolderOpen,
      folder: mdiFolder,
      audioFile: mdiMusicNote,
      unknownFile: mdiFile,
    },
    showMenu: false,
    x: 0,
    y: 0,
    menuItems: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      audio: mdiMusicNote,
    },
    tree: [],
    items: [
      {
        name: "/",
        path: "/",
        dir: true,
        children: [
        ]
      }
    ],
  }),
  mounted: function () {},
  methods: {
    isAudioFile: function (name) {
      var fileExt = [".mp3", ".ogg", ".wave", ".wma", ".acc", ".flac", ".m4a"];
      return fileExt.some(function (suffix) {
        return name.toLowerCase().endsWith(suffix);
    });
    },
    async loadChildrens (item) {
      const paramPath = (item.path.endsWith('/') && (item.path.length > 1)) ? item.path.slice(0, -1) : item.path
      return this.axios
      .get('http://192.168.1.126/explorer?path=' + paramPath)
      .then((response) => {
        response.data.forEach(element => {
          element.path = item.path + element.name
          if(element.dir) {
            element.path += '/'
            element.children = []
          }
        });
        item.children.push(...response.data)
        console.log(response)
        /*return fetch('/explorer?path=/' + item.path)
          .then(res => res.json())
          .then(json => (item.children.push(...json)))
          .catch(err => console.warn(err))*/
      })
    },
    onItemSelect(selection) {
      this.selectedPath = (selection.length == 1) ? selection[0].path : ''
    },
    onButtonClick() {
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
.scroll {
  overflow-y: scroll;
}
</style>
