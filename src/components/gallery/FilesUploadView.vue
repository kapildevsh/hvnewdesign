<template>
  <div class="files-upload-view mt-2 w-100 position-relative" v-if="files && files.length">
    <v-sheet elevation="1" class="w-100 pb-2">
      <h1 class="primary px-2 py-1 text-body-1 white--text">Upload {{ files.length }} Files</h1>
      <v-list two-line max-height="400px" class="overflow-auto">
        <v-list-item-group>
          <v-list-item v-for="file in files" :key="file.name">
            <v-list-item-avatar :rounded="false" size="100px">
              <img v-set-img="file" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ file.name }}</v-list-item-title>
              <v-list-item-subtitle><v-progress-linear></v-progress-linear></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-tooltip color="primary" top>
                <template v-slot:activator="{ on }">
                  <v-btn x-small fab dark color="error" @click="removeFile(file)" v-on="on">
                    <v-icon>fa-times</v-icon>
                  </v-btn>
                </template>
                <span>Remove this image from upload list</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="d-flex align-end mx-5 mt-2 mb-1 gap-2 justify-end">
        <v-tooltip color="primary" top>
          <template v-slot:activator="{ on }">
            <v-btn rounded dark @click="files = undefined" v-on="on"> Cancel </v-btn>
          </template>
          <span>Cancel File Uploading</span>
        </v-tooltip>
        <v-tooltip color="primary" top>
          <template v-slot:activator="{ on }">
            <v-btn dark rounded color="primary" @click="upload()" v-on="on"> OK </v-btn>
          </template>
          <span>Upload given files</span>
        </v-tooltip>
      </div>
    </v-sheet>
    <v-dialog
      v-if="invalidFiles && invalidFiles.length"
      :value="invalidFiles && invalidFiles.length"
      @input="invalidFiles = undefined"
      close
      width="600"
      max-width="100%"
    >
      <v-card>
        <v-card-title class="font-weight-medium error white--text text-center pa-2">
          <v-icon class="v-icon--left white--text mr-2">fa-exclamation-triangle</v-icon> These Files are Invalid
          <v-spacer /> <v-btn icon @click="invalidFiles = undefined"><v-icon color="white">fa-times</v-icon></v-btn>
        </v-card-title>

        <v-card-text class="pa-4">
          <span class="error--text">Only Image Files are Allowed</span>
          <ol class="invalid-files-list">
            <li v-for="file in invalidFiles" :key="file.name">{{ file.name }}</li>
          </ol>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { isValidImg } from '@/data/common-data';
import axios from 'axios';

class FilesUploadViewData {
  files: File[] = null;
  invalidFiles: File[];
}

export default Vue.extend({
  name: 'FilesUploadView',
  data: () => new FilesUploadViewData(),
  methods: {
    setFiles(files: FileList) {
      if (!files?.length) return;

      const [validFiles, invalidFiles] = Array.from(files).reduce(
        (acc, file) => {
          acc[isValidImg(file.name) ? 0 : 1].push(file);
          return acc;
        },
        [[], []] as File[][]
      );

      this.invalidFiles = invalidFiles;
      this.files = [...validFiles, ...(this.files || [])];
    },
    removeFile(file: File) {
      this.files.splice(this.files.indexOf(file), 1);
    },
    upload() {
      const form = this.files.reduce((form: FormData, f: File) => {
        form.append('photos[]', f, f.name);
        return form;
      }, new FormData());

      axios
        .post('/gallery/upload', form, {
          onUploadProgress(...args) {
            console.log(args);
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.files = undefined;
            this.$emit('openSnackbar');
            this.$emit('refresh');
          }
        });
    },
  },
});
</script>

<style></style>
