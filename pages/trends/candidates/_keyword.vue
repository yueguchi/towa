<template>
  <section class="trends-section">
    <div>
      <h2>{{ keyword }}の関連用語</h2>
      <ul>
        <li
          v-for="(candidate, index) in candidates"
          :key="index">
          <span @click="detail(candidate.title)">
            <p>{{ candidate.title }}</p>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ query }) {
    let candidates = []
    try {
      const url = `
        https://ja.wikipedia.org/w/api.php?format=json&action=query&srsearch=${encodeURIComponent(
          query['keyword']
        )}&list=search
      `
      const { data } = await axios.get(url)
      console.log(url)
      candidates = data.query.search
    } catch (err) {
      console.log(err)
    }
    return { candidates: candidates, keyword: query['keyword'] }
  },
  methods: {
    detail(keyword) {
      window.open(`https://ja.wikipedia.org/wiki/${keyword}`, '_system')
    }
  }
}
</script>
