<template>
  <section class="trends-section">
    <div>
      <ul>
        <li
          v-for="(trendsByDate, index) in trends"
          :key="index">
          <div class="date-label">
              <v-alert
                :value="true"
                color="pink"
              >
                {{ trendsByDate.formattedDate }}
              </v-alert>
          </div>
          <ul class="trend-items-wrapper">
            <li
              v-for="(keyword, index2) in trendsByDate.trendingSearches"
              :key="index2"
              class="trend-items">
              <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                  <v-card>
                    <v-img
                      :src="keyword.image.imageUrl"
                      aspect-ratio="2.75"
                    ></v-img>
                    <v-card-title primary-title>
                      <div @click="towa(keyword.title.query)">
                        <h3
                          class="headline mb-0">
                          {{ keyword.title.query }} とは??
                        </h3>
                        <v-divider />
                        <small>概要...</small>
                        <div
                          v-html="keyword.articles.map(article => { if (article.title) return `◆ ${article.title}` }).join('<br>').substring(0, 100) + '...'"
                          class="small-info" />
                      </div>
                    </v-card-title>

                    <v-card-actions>
                      <v-btn
                        class="clip-button"
                        color="accent"
                        @click="clip(keyword.title.query)">CLIP</v-btn>
                      <v-btn
                        flat
                        color="secondary">
                        {{ keyword.formattedTraffic }}
                        <v-icon>trending_up</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <clip-button @emitClickButton="handleClickClipsButton"/>
  </section>
</template>

<script>
import ClipButton from '@/components/ClipButton'
import { GET_TRENDS } from '@/libs/api'

export default {
  layout: 'towa',
  components: {
    ClipButton
  },
  async asyncData() {
    let trends = []
    try {
      const { data } = await GET_TRENDS()
      // 上記で取得したJSONファイル(DL)の先頭に「)]}」が混じっている。これは公式でもこの通りだった
      trends = JSON.parse(data.replace(`)]}',`, '')).default
        .trendingSearchesDays
    } catch (err) {
      console.err(err)
    }
    // サーバサイドからbaseUrlをクライアントにも渡す
    return {
      trends: trends,
      baseUrl: process.env.BASE_URL || ''
    }
  },
  methods: {
    towa(keyword) {
      console.log('[client]baseUrl: ', this.baseUrl)
      location.href = `${this.baseUrl}/trends/candidates?keyword=${keyword}`
    },
    clip(keyword) {
      if (this.isCliped(keyword)) return this.unclip(keyword)
      const trends = localStorage.getItem('trends')
      localStorage.setItem('trends', trends ? trends + ',' + keyword : keyword)
      alert(`${keyword}をCLIPしました`)
    },
    unclip(keyword) {
      const trends = localStorage.getItem('trends')
      localStorage.removeItem('trends')
      const clipedArr = trends.split(',')
      clipedArr.splice(clipedArr.indexOf(keyword), 1)
      localStorage.setItem('trends', clipedArr.join(','))
      alert(`${keyword}をUNCLIPしました`)
    },
    handleClickClipsButton() {
      const trends = localStorage.getItem('trends')
      if (!trends) alert('クリップは空っぽです')
    },
    isCliped(keyword) {
      const trends = localStorage.getItem('trends')
      return trends && trends.split(',').indexOf(keyword) > -1
    }
  }
}
</script>
<style scoped lang="scss">
.trends-section {
  ul {
    li {
      list-style: none;
      .date-label {
        font-weight: bold;
      }
    }
  }
  ul, ol /deep/ {
    padding-left: 0;
  }
  .trend-items-wrapper {
    .trend-items {
      margin: 1rem;
      .small-info {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
