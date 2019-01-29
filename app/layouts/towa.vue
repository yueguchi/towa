<template>
  <v-app>
    <toolbar :title="title" />
    <nuxt />
  </v-app>
</template>
<script>
import Toolbar from '@/components/Toolbar'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['title'])
  },
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
