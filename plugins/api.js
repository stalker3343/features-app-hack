import createRepository from '@/api/repository'
import { numberWithSpaces } from '@/utils'

export default function ({ $axios }, inject) {
  const repositoryWithAxios = createRepository($axios)
  inject('bidsRepository', {
    // ...repositoryWithAxios('/api/users'),
    create(params) {
      return $axios.$post('/api/createApplication', params)
    },
    async index(params) {
      const res = await $axios.$get(`/api/getApplicationsForType`, params)
      return res.list
    },

    update(id, payload) {
      return $axios.$post(`/api/updateApplication`, { ...payload, id })
    },

    delete(id) {
      return $axios.$get(`/api/removeApplication`, {
        params: {
          id,
        },
      })
    },
    show(id, params) {
      return $axios.$get(`/api/getApplicationById`, {
        params: {
          idApplication: id,
        },
      })
    },

    // index({ filters } = {}) {
    //   const list = [
    //     {
    //       id: '0',
    //       date: '21.06.2000 21:00',
    //       user: '1',
    //       value: '100',
    //       price: '17000',
    //       type: 'buy', //, sell)
    //     },
    //     {
    //       id: '1',
    //       date: '21.06.2000 21:00',
    //       user: '1',
    //       value: '10000',
    //       price: '17000',
    //       type: 'sell', //, sell)
    //     },
    //   ]

    //   if (filters) {
    //     return list.filter((el) => el.type === filters.type)
    //   }

    //   return list
    // },
  })

  inject('obligationRepository', {
    // ...repositoryWithAxios('/api/users'),
    index(params) {
      return $axios.$get(`/api/getObligationsForUser`, params)
    },
    create(params) {
      return $axios.$post('/api/createObligation', params)
    },
    // index() {
    //   return {
    //     list: [
    //       {
    //         id: '0',
    //         date: '21.06.2000 21:00',
    //         buyer: '00123',
    //         seller: '00123',
    //         value: '100',
    //         price: '18 500',
    //       },
    //     ],
    //   }
    // },
  })

  inject('resultsRepository', {
    ...repositoryWithAxios('/api/users'),
    async index(params) {
      const res = await $axios.$get(`/api/getResultsForUser`, params)
      return res.list.map((el) => ({
        ...el,
        value: numberWithSpaces(el.value),
      }))
    },

    // index() {
    //   return [
    //     {
    //       id: '0',
    //       date: '21.06.2000 21:00',
    //       buyer: '00123',
    //       seller: '00123',
    //       value: '100',
    //       price: '18 500',
    //     },
    //   ]
    // },
  })

  inject('usersRepository', {
    // ...repositoryWithAxios('/api/users'),
    async index() {
      const res = await $axios.$get(`/api/getUsers`)
      return res.list
      // return [
      //   {
      //     name: 'ООО Рога копытfh 34',
      //     role: 'seller', // seller , admin buyer
      //     identificator: '00012',
      //     id: '1',
      //     login: '1',
      //   },
      // ]
    },
    create(params) {
      return $axios.$post('/api/createUser', params)
    },

    checkUser(params) {
      return $axios.$post('/api/checkUser', params)
    },
  })

  // inject('questionsRepository', {
  //   ...repositoryWithAxios('/api/api/questions/'),
  // })

  // inject('usersRepository', {
  //   ...repositoryWithAxios('/api/accounts/profiles/'),
  // })

  // inject('answersRepository', {
  //   ...repositoryWithAxios('/api/api/answers/'),
  // })

  // inject('testAddUserRepository', {
  //   ...repositoryWithAxios('/api/api/test_add_user/'),
  // })

  // ...repositoryWithAxios('/api/api/tests/'),
}
