<template>
  <div class="clip-btn-area">
    <v-btn
      @click="handleCliclButton"
      absolute
      dark
      fab
      top
      right
      color="pink"
    >
      <v-icon>attach_file</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    handleCliclButton() {
      this.$emit('emitClickButton')
    }
  }
}
</script>
<style lang="scss" scoped>
.clip-btn-area {
    height: 50px;
    position: sticky;
    bottom: 0;
    button {
      transform: rotate(50deg);
    }
  }
</style>