<template>
  <div>
    <v-toolbar tabs>
      <v-btn icon @click="goBack">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>「〇〇とは？？」</v-toolbar-title>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>