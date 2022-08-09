import axios from 'axios'
import { createStore, createLogger } from 'vuex'

const plugins = []
if (import.meta.env.DEV) {
	plugins.push(createLogger())
}

export default createStore({
	plugins,
	state () {
		return {
			users: [],
			// По ТЗ дефолтное per_page = 5, на reqres.in = 6, поэтому заменил 5 на 6.
			// иначе условие проверки на дефолтный параметр не отработает
			usersOnPageOptions: [
				{value: 2, name: '2', default: false},
				{value: 6, name: '6', default: true},
				{value: 10, name: '10', default: false},
				{value: 20, name: '20', default: false},
			],
			page: 1,
			total: 0,
			totalPages: 0
		}
	},
	mutations: {
		SET_USER (state, payload = {}) { state.user = payload},
		SET_USERS (state, payload) { state.users = payload },
		ADD_USERS (state, payload) { state.users = state.users.concat(payload) },
		CHG_PAGE (state, payload = []) {state.page = payload},
		CHG_TOTAL (state, payload = []) {state.total = payload},
		CHG_TOTAL_PAGES (state, payload = []) {state.totalPages = payload},
	},

	actions: {
		async resource (_, payload) {
			try{
				const SERVER = 'https://reqres.in/api/'
				const response = await axios({
					headers: {
						Accept: 'application/json',
					},
					method: payload.method,
					url: SERVER + payload.url,
					params: payload.params || {},
					data: payload.data || {},
				})
				return response.data
			}catch(e){
				console.log(e)
			}
		},
		async getUsers ({ state, dispatch, commit }, payloadData) {
			try {
				const defaultPerPage = state.usersOnPageOptions.find(item => item.default).value
				let params = {}
				if (payloadData.page !== 1) {
					params['page'] = payloadData.page
				}
				// если в справочнике дефолтный per_page = 5, проверку закомментировать и всегда отправлять per_page
				if (payloadData.perPage !== defaultPerPage) { // закомментировать
					params['per_page'] = payloadData.perPage  // не удалять
				} 											  // закомментировать

				const payload = {url: 'users', method: 'get', params}
				const { data, page, total, total_pages } = await dispatch('resource', payload, { root: true})

				if (payloadData.showMore) {
					commit('ADD_USERS', data)
				} else {
					commit('SET_USERS', data)
				}
				commit('CHG_PAGE', page)
				commit('CHG_TOTAL', total)
				commit('CHG_TOTAL_PAGES', total_pages)
			} catch (e) {
				console.log(e)
			}
		},
	},
	getters: {
		usersOnPageOptions: (state) => state.usersOnPageOptions,
		users: (state) => state.users,
		user: (state) => state.user,
		page: (state) => state.page,
		total: (state) => state.total,
		totalPages: (state) => state.totalPages,
	}
})
