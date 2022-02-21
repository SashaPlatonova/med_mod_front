export default function dateFormater (stringDate, withTime) {
  var date = new Date(stringDate)
  var month = date.getMonth() + 1
  var day = date.getDate()
  var year = date.getFullYear()
  month = (month < 10) ? '0' + month : month
  day = (day < 10) ? '0' + day : day
  if (withTime) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    minutes = (minutes < 10) ? '0' + minutes : minutes
    hours = (hours < 10) ? '0' + hours : hours
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
  }
  return year + '-' + month + '-' + day
}
