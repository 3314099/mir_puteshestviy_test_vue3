<template>
  <div class="w-full h-screen">
    <div class="sticky top-0 bg-alabaster flex justify-between py-2 px-12">
      <div class="text-2xl text-bold">
          Users
      </div>
      <div class="flex space-x-2">
        <MySelect
            v-model="selectedUsersFilterField"
            :options="filterOfUsersOptions"
        />
        <MySelect
            v-model="perPage"
            :options="usersOnPageOptions"
        />
      </div>
    </div>
    <div class="flex w-full mx-auto pb-14">
      <div class="w-full grid gap-4 p-6 ">
        <div
            v-for="user in sortedUsers" :key="user.id"
        >
          <div class="shadow-sm rounded-xl w-[400px] h-[150px] p-2 flex border rounded-xl items-center">
            <div class="">
              <img
                  class="w-auto rounded-lg"
                  :src="user.avatar"
                  alt="tailwind-card-image"
              />
            </div>
            <div class="p-2">
              <div class="font-bold">{{ user.first_name }}</div>
              <div class="font-bold">{{ user.last_name }}</div>
              <p class="opcacity-60">
                  {{user.email}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed w-full bottom-0 bg-alabaster h-14 grid grid-cols-2 items-center">
    <div class="w-full flex justify-end items-center">
      <div
          v-show="page < totalPages"
          class="h-10 w-48 px-2 mx-1 rounded border-2 border-blue-200 bg-blue-200 font-bold cursor-pointer flex items-center justify-center"
          @click="showMore"
      >
          Показать ещё
      </div>
    </div>
    <Pagination
        :pages="totalPages"
        :value="page"
        :values="loadedPages"
        @chgValue="getUsers($event, null)"
    />
  </div>
</template>

<script>
  import {ref, watch, computed, onBeforeMount} from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'

  import MySelect from './components/AppSelect.vue'
  import Pagination from './components/Pagination.vue'
  import {sortByField} from './tools/useSortByField'

  export default {
    name: 'App',
    components: {
      MySelect,
      Pagination
    },
    setup() {
      const store = useStore()
      const route = useRoute()
      const filterOfUsersOptions = [
        {value: 'id', name: 'По умолчанию'},
        {value: 'first_name', name: 'По имени'},
        {value: 'last_name', name: 'По фамилии'},
        {value: 'email', name: 'По почте'},
      ]
      const selectedUsersFilterField = ref(filterOfUsersOptions[0].value)
      const perPage = ref(null)
      const page = ref(1)

      const users = computed(() => store.getters.users)
      const sortedUsers = computed(() => {
        return sortByField(users.value, selectedUsersFilterField.value)
      })

      const loadedPages = ref([])
      const usersOnPageOptions = computed(() => store.getters.usersOnPageOptions)
      watch(perPage, () => {
        loadedPages.value = []
        getUsers(1)
      })


      const getUsers = async (pageVal) => {
        const newPage = pageVal || page.value
        const newPerPage = perPage.value
        await store.dispatch('getUsers', {page: newPage, perPage: newPerPage})
        page.value = newPage
        loadedPages.value = [newPage]
      }
      const totalPages = computed(() => store.getters.totalPages)

      const showMore = async () => {
        if(page.value < totalPages.value) {
          const newPage = page.value + 1
          await store.dispatch('getUsers', { page: newPage, perPage: perPage.value, showMore: true})
          loadedPages.value.push(newPage)
          page.value = newPage
        }
      }
      onBeforeMount(() => {
        perPage.value = usersOnPageOptions.value.find(item => item.default).value
      })
      return {
        getUsers,
        showMore,
        loadedPages,
        sortedUsers,
        page,
        perPage,
        usersOnPageOptions,
        filterOfUsersOptions,
        selectedUsersFilterField,
        totalPages,
        total: computed(() => store.getters.total),
      }
    }
  }
</script>
