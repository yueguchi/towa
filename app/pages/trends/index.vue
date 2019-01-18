<template>
  <section class="trends-section">
    <div>
      <ul>
        <li
          v-for="(trendsByDate, index) in trends"
          :key="index">
          <p>{{ trendsByDate.date }}</p>
          <ul>
            <li
              v-for="(keyword, index2) in trendsByDate.trendingSearches"
              :key="index2">
              <span @click="towa(keyword.title.query)">
                <img :src="keyword.image.imageUrl">{{ keyword.title.query }} とは??
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
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
      // this.$router.push(`/trends/candidates?keyword=${keyword}`)
      location.href = `${this.baseUrl}/trends/candidates?keyword=${keyword}`
    }
  }
}
</script>
