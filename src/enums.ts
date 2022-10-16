export const LEAGUES = [
  2, // Лига Чемпионов
  39, // Английская Премьер Лига
  78, // Бундес Лига
  135, // Серия А
  140, // Ла Лига
  61, // Лига 1
  235, // Российская Премьер Лига
]

export const DATE_FORMAT = 'DD.MM.YYYY'

export const BETS = [
  'П1',
  'П2',
  'X',
  'ТБ2.5',
  'ТМ2.5',
  'ОЗ',
  'ОЗ - нет',
  'ИТ1Б1.5',
  'ИТ1М1.5',
  'ИТ2Б1.5',
  'ИТ2М1.5',
  'Ф1(-1)',
  'Ф2(-1)',
]

export enum COLUMNS {
  date = 'date',
  home = 'home',
  visit = 'visit',
  bet = 'bet',
  quotient = 'quotient',
  sum = 'sum',
  result = 'result',
}

export enum RESULTS {
  win = 'Выигрыш',
  loose = 'Проигрыш',
}
