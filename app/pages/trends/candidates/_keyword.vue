<template>
  <section class="trends-section">
    <v-list two-line>
      <v-list-tile
        ripple
        v-for="(candidate, index) in candidates"
        :key="index">
        <v-list-tile-content @click="detail(candidate.title)">
          <v-list-tile-title class="related-keyword"><v-icon>link</v-icon>{{ candidate.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </section>
</template>

<script>
import axios from 'axios'
import { URL_WIKIPEDIA } from '@/libs/consts'
import { GET_RELATED_WORDS } from '@/libs/api'
import { mapMutations } from 'vuex'

export default {
  layout: 'towa',
  async asyncData({ query }) {
    let candidates = []
    try {
      const { data } = await GET_RELATED_WORDS(query['keyword'])
      candidates = data.query.search
    } catch (err) {
      console.log(err)
    }
    return { candidates: candidates, keyword: query['keyword'] }
  },
  mounted() {
    this.setTitle(`${this.keyword}関連用語`)
  },
  methods: {
    ...mapMutations(['setTitle']),
    detail(keyword) {
      window.open(URL_WIKIPEDIA.replace('%%keyword%%', keyword), '_system')
    }
  }
}
</script>
<style lang="scss" scoped>
.trends-section {
  .v-list {
    .v-list__tile {
      .v-list__tile__content {
        .related-keyword {
          font-weight: bold;
          color: #64b5f6;
        }
      }
    }
  }
}
</style>
