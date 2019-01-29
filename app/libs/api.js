import axios from 'axios'
import { API_TRENDS } from '@/libs/consts'

export function GET_TRENDS() {
  return axios.get(API_TRENDS)
}
