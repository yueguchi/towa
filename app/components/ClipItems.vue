<template>
  <v-layout row justify-center>
      <v-dialog v-model="isShow" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="$emit('emitClickCloseButton')">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>My Clips</v-toolbar-title>
          </v-toolbar>
          <v-card-title
            @click="$emit('clickItem', keyword)"
            primary-title
            v-for="(keyword, index) in items" :key="index">
            <div>
              <h3
                class="headline mb-0">
                {{ keyword }} とは??
              </h3>
            </div>
          </v-card-title>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
    items: Array
  }
}
</script>