<template>
  <v-app>
    <section class="trends-section">
      <div>
        <ul>
          <li
            v-for="(trendsByDate, index) in trends"
            :key="index">
            <div>
                <v-alert
                  :value="true"
                  color="error"
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
                        <v-btn color="info" @click="save(keyword.title.query)">クリップ</v-btn>
                        <v-btn flat color="secondary">{{ keyword.formattedTraffic }}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData() {
    let trends = []
    try {
      const { data } = await axios.get(`
        https://trends.google.com/trends/api/dailytrends?hl=ja&tz=-540&geo=JP&ns=15
      `)
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
    save(keyword) {
      alert(`${keyword}をsaveします`)
    }
  }
}
</script>
<style scoped lang="scss">
.trends-section {
  ul {
    li {
      list-style: none;
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
