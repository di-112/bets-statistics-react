const transformDateToDb = date => date
  .replaceAll('.', '-')
  .split('-')
  .reverse()
  .join('-')

const transformDateFromDb = date => date
  .replaceAll('-', '.')
  .split('.')
  .reverse()
  .join('.')

module.exports = {
  transformDateToDb,
  transformDateFromDb,
}
