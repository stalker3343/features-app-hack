import fetch from 'node-fetch'
const YOO_KASSA_SHOP_ID = 909038
const YOO_KASSA_SECRET_KEY = 'test_Uu1-NQUWzOyZ2GP2P1Aq9dMuCvsKMDLNJ_BQ45ng9EE'
const REQ_HEADERS = {
  'Content-Type': 'application/json',
  Authorization:
    'Basic ' +
    Buffer.from(YOO_KASSA_SHOP_ID + ':' + YOO_KASSA_SECRET_KEY).toString(
      'base64'
    ),
}

const init = async () => {
  const payments = []
  let response = null
  let cursor = null
  do {
    const searchParams = new URLSearchParams({ limit: 100 })
    if (cursor) {
      searchParams.append('cursor', cursor)
    }

    const rawResponse = await fetch(
      `https://api.yookassa.ru/v3/payments?${searchParams.toString()}`,
      {
        headers: {
          ...REQ_HEADERS,
        },
      }
    )
    response = await rawResponse.json()
    payments.push(...response.items)
    cursor = response.next_cursor
  } while (cursor)
}
// const init = async () => {
//   const response = await fetch('https://api.yookassa.ru/v3/payments', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Idempotence-Key': 10,
//       Authorization:
//         'Basic ' +
//         Buffer.from(YOO_KASSA_SHOP_ID + ':' + YOO_KASSA_SECRET_KEY).toString(
//           'base64'
//         ),
//     },

//     body: JSON.stringify({
//       amount: {
//         value: '100.00',
//         currency: 'RUB',
//       },
//       capture: true,
//       confirmation: {
//         type: 'redirect',
//         return_url: 'http://localhost:3000/',
//       },
//       description: 'Заказ №1',
//     }),
//   })
//   const json = await response.json()
//   console.log(json)
// }

init()
