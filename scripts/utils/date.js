import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export const dateFormated = days => dayjs().add(days, 'days').format('dddd, MMM D')
export const formatDate = date => dayjs(date)