import axios from 'axios'
import { API_TRENDS, API_RELATED_WORDS } from '@/libs/consts'

export function GET_TRENDS() {
  return axios.get(API_TRENDS)
}

export function GET_RELATED_WORDS(keyword) {
  return axios.get(
    API_RELATED_WORDS.replace('%%keyword%%', encodeURIComponent(keyword)).trim()
  )
}
