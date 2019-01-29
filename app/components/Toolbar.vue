<template>
  <div>
    <v-toolbar tabs>
      <v-btn icon @click="goBack">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>