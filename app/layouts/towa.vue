<template>
  <v-app>
    <toolbar />
    <nuxt />
  </v-app>
</template>
<script>
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Toolbar
  }
}
</script>
<style lang="scss">
.theme--light.application {
  background-color: lightgray;
}
</style>
