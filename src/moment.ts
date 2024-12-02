import moment, { type Moment } from 'moment-timezone'
import 'moment/locale/es'
moment().tz('America/Caracas').format()

export const getDayWeek = (): string => moment().tz('America/Caracas').format('dddd')

export const getDate = (): string => moment().tz('America/Caracas').format('DD/MM/YYYY')

export const getDateFormatted = (): string => moment().tz('America/Caracas').format('YYYY-MM-DD')

export const getMoment = (): Moment => moment()

export const getMonth = (monthNumber: string): string => moment().month(parseInt(monthNumber) - 1).format('MMMM')

export const getFullDate = (): string => moment().tz('America/Caracas').format('DD/MM/YYYY HH:mm')
