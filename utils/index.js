// import { format, parseISO } from 'date-fns'

export const filterNum = (value, { decimal } = { decimal: true }) => {
  const minus = false

  if (value !== 0) {
    if (isNaN(value) || !value) {
      value = ''
      return value
    }
  }

  if (typeof value === 'string') {
    value = Number(value)
  }
  let num = ''
  if (decimal) {
    num = value.toFixed(2)
  } else {
    num = value.toFixed()
  }
  const res = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return (minus ? '-' : '') + res
}

export const filterAmount = (value) => {
  if (typeof value === 'string') {
    value = Number(value)
  }
  if (value !== 0) {
    if (isNaN(value) || !value) {
      value = ''
      return value
    }
  }

  const res = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return res
}

export const normalizePhone = (phone) => {
  return phone.replace(/[^+\d]/g, '')
}

export const debounce = function (
  func,
  waitMilliseconds = 50,
  options = {
    isImmediate: false,
  }
) {
  let timeoutId

  const debouncedFunction = function (...args) {
    const context = this

    const doLater = function () {
      timeoutId = undefined
      if (!options.isImmediate) {
        func.apply(context, args)
      }
    }

    const shouldCallNow = options.isImmediate && timeoutId === undefined

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(doLater, waitMilliseconds)

    if (shouldCallNow) {
      func.apply(context, args)
    }
  }

  debouncedFunction.cancel = function () {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
  }

  return debouncedFunction
}

export const getDateString = (serverDob) => {
  if (!serverDob) return ''
  let day = new Date(serverDob).getDate()
  if (String(day).length === 1) {
    day = '0' + day
  }
  let month = new Date(serverDob).getMonth() + 1
  if (String(month).length === 1) {
    month = '0' + month
  }
  const year = new Date(serverDob).getFullYear()
  return `${day}.${month}.${year}`
}

export const getDashedDateFormat = (date) => {
  return getDateString(date).split('.').reverse().join('-')
}

export const getTimeString = (serverDob) => {
  if (!serverDob) return ''
  const date = new Date(serverDob)
  const hours = date.getHours()
  let minutes = date.getMinutes()
  if (String(minutes).length === 1) {
    minutes = '0' + minutes
  }
  return `${hours}:${minutes}`
}

export const filterDate = (dateString) => {
  return getDateString(dateString)
}

export const filterDateTime = (dateString, dateTimeSpliter = 'в') => {
  if (!dateString) return ''
  return `${getDateString(dateString)} ${dateTimeSpliter} ${getTimeString(
    dateString
  )}`
}

export const filterWordNumForm = (n, wordForms, returnOnlyWord) => {
  n = Math.abs(n) % 100
  const n1 = n % 10
  if (wordForms) {
    if (n > 10 && n < 20) {
      return !returnOnlyWord ? n + ' ' + wordForms[2] : wordForms[2]
    }
    if (n1 > 1 && n1 < 5) {
      return !returnOnlyWord ? n + ' ' + wordForms[1] : wordForms[1]
    }
    if (n1 === 1) {
      return !returnOnlyWord ? n + ' ' + wordForms[0] : wordForms[0]
    }
    return !returnOnlyWord ? n + ' ' + wordForms[2] : wordForms[2]
  } else {
    return null
  }
}

export const randomInt = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min)
  return ~~rand
}
// TODO remove in general module? dont know which
export const getDefaultPipline = (piplines) => {
  const defaultPipe = piplines.find((el) => el.default)
  return defaultPipe || piplines[0]
}

export const isEmailValid = (email) => {
  if (!email) return true
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,100})+$/
  return regex.test(email)
}

export const isPhoneValid = (phone) => {
  if (!phone) return true
  const clearPhone = phone.replace(/[^+\d]/g, '')
  return clearPhone.length > 8
}
const uploadImage = async (file, imageRepository) => {
  const image = new FormData()
  image.append('image', file)
  const { filename } = await imageRepository.create(image)
  return filename
}

export const getImageFieldValue = async (imageEntity, imageRepository) => {
  if (imageEntity.file) {
    const loadedImageName = await uploadImage(imageEntity.file, imageRepository)
    return loadedImageName
  }

  if (!imageEntity.preview) {
    return null
  }

  if (imageEntity.preview.startsWith('http')) {
    // FIXME Убрать когда поле сделают не обязательным
    const imageUrl = imageEntity.preview.split('/')
    return imageUrl[imageUrl.length - 1]
  }

  throw new Error(
    'Не удалось определить значение поля картинки для отправки на сервер'
  )
}

export const getDateFromString = (dateString) => {
  if (!dateString) return ''
  return dateString.split('.').reverse().join('/')
}

export const differenceInDays = (jsDateString1, jsDateString2) => {
  const date1 = new Date(jsDateString1)
  const date2 = new Date(jsDateString2)
  const DifferenceInTime = date2.getTime() - date1.getTime()
  const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24)
  return DifferenceInDays
}

export const isDefinedValue = (value) => {
  if (Array.isArray(value)) return value.length
  return value || typeof value === 'boolean'
}

// export const ISODateConvert = (value) => {
//   const initDateTime = parseISO(value)
//   const date = format(initDateTime, 'yyyy-MM-dd')
//   const time = format(initDateTime, 'HH:mm:ss')

//   return date + ' / ' + time
// }

export const sortByField = (property) => {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}

export const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
export const normalizeDate = ({ date, time }) => {
  /*
  { "date": { "year": 2022, "month": 5, "day": 14 }, "time": { "hour": 23, "minute": 54, "second": 1, "nano": 967969000 } } 
  */
  const newDAte = new Date(
    date.year,
    date.month,
    date.day,
    time.hour,
    time.minute,
    time.second
  )
  return newDAte.toLocaleString('Ru-ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}
