import { POSTPERPAGE } from "../config"

export const isLegalPage = (page: number, total: number) => {
  return Number(page) <= Math.ceil(total / POSTPERPAGE) && Number(page) > 0
}