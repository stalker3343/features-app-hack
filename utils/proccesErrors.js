export const getErrorInformation = (error, requestErrorsList) => {
  if (!error.isAxiosError) {
    throw error
  }
  const errorCode = Number(error.response.data.statusCode)
  const message = error.response.data.message
  let errorsList = []

  if (errorCode === 400) {
    errorsList = message.map((el) => {
      let singleErrMsg = ``
      const propertyMeseges = []
      for (const [key, value] of Object.entries(el.constraints)) {
        propertyMeseges.push(value)
      }
      singleErrMsg += propertyMeseges.join(', ')
      return singleErrMsg
    })
  } else {
    errorsList = [message]
  }

  let isErrorHandlingRequire = true
  let isRequestError = false

  if (error.wasProcessed) {
    isErrorHandlingRequire = false
  }

  if (requestErrorsList) {
    isRequestError = true // requestErrorsList.includes(errorCode)
  }

  return {
    isErrorHandlingRequire,
    isRequestError,
    errorsList,
    errorCode,
  }
}
