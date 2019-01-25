<template>
  <div>
    <v-toolbar tabs>
      <v-btn icon @click="goBack">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title>「〇〇とは？？」</v-toolbar-title>
      <v-tabs
        slot="extension"
        fixed-tabs
        color="transparent"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#mobile-tabs-5-1" class="primary--text">
          <v-icon>trending_up</v-icon>Googleトレンド
        </v-tab>
        <v-tab href="#mobile-tabs-5-2" class="primary--text" @click="$emit('handleClickClip')">
          <v-icon>attachment</v-icon>クリップ
        </v-tab>
      </v-tabs>
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