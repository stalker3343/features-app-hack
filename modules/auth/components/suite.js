import { create, test, enforce, only, skipWhen } from 'vest'
import { getErrorInformation } from '@/utils/proccesErrors'

const getSuite = (validateEmailRep, notifyService) =>
  create((data = {}, currentField, suite) => {
    skipWhen(!currentField, () => only(currentField))

    test('username', 'Введите Логин', () => {
      enforce(data.username).isNotBlank()
    })

    // test('username', 'Email слишком короткий', () => {
    //   enforce(data.username).longerThanOrEquals(2)
    // })

    // skipWhen(suite.get().hasErrors('username'), () => {
    //   test.memo(
    //     'username',
    //     'username is not valid',
    //     () => doesUserExist(data.username, validateEmailRep, notifyService),
    //     [data.username]
    //   )
    // })

    test('password', 'Введите пароль', () => {
      enforce(data.password).isNotEmpty()
    })

    // test('password', 'Пароль слишком короткий', () => {
    //   enforce(data.password).longerThanOrEquals(2)
    // })
  })

export default getSuite

function doesUserExist(email, validateEmailRep, notifyService) {
  return true
  // try {
  //   await validateEmailRep.validateEmail({
  //     params: {
  //       email,
  //     },
  //   })
  // } catch (error) {
  //   const { isErrorHandlingRequire, isRequestError, errorsList } =
  //     getErrorInformation(error, [400, 409])
  //   if (!isErrorHandlingRequire) return
  //   if (isRequestError) {
  //     throw new Error(error)
  //   } else {
  //     notifyService.error({
  //       text: 'Произошла ошибка: ' + errorsList.join(';'),
  //     })
  //   }
  // }
}
