import { defineStore } from 'pinia'
import { ResponseEntity, responseData } from '../models/type'

const { requestWithAttempt } = useCustomFetch()

type initStateType = {
  accessToken: string,
  name: string
}

const initState:initStateType = {
  accessToken: "",
  name: ""
}

export const useAuthStore = defineStore("auth", {
    state: () => {
      return initState
    },
    getters: {
      isAuth: (state) => state.accessToken !== "" ? true : false
    },
    actions: {                       
      async login(emailAddress: string, password: string) {

        try {

          const response = await $fetch.raw('api/login', {
            method: 'POST',                
            headers: {
                'content-type': 'application/json'
            },
            body: {
              emailAddress: emailAddress,
              password: password
            }
          })

          this.accessToken = response._data.accessToken

          return responseData({
            status: response.status
          } as ResponseEntity)

        } catch(error) {
          throw responseData({
            status: error.status
          } as ResponseEntity)
        }
      },

      async logout() {

        try {

          const response = await $fetch.raw('api/logout', {method: 'POST'})                  
 
          // reset state        
          this.$reset()
          console.log('[Logout] reset..... state')

          return responseData({
            status: response.status
          } as ResponseEntity)

        } catch(error) {
          throw {
            status: error.status
          } as ResponseEntity
        }
        
      },

      async refreshToken() {

        try {

          const response = await $fetch.raw('api/refreshToken', {method: 'GET'})        

          this.accessToken = response._data.accessToken

          return responseData({
            status: response.status
          } as ResponseEntity)

        } catch(error) {          
          throw responseData({
            status: error.status
          } as ResponseEntity)
        }

      },

      async profile() {        

        try {

          // Use custom fetch
          const response = await requestWithAttempt('api/me')        

          this.name = response.name

          return responseData({
            status: response.status
          } as ResponseEntity)

        } catch(error) {
          throw responseData({
            status: error.status
          } as ResponseEntity)
        }

      },

      async validate() {

        try {

          const response = await $fetch.raw('/api/validate', {method: 'GET'})        

          return responseData({
            status: response.status
          } as ResponseEntity)

        } catch(error) {        
          throw responseData({
            status: error.status
          } as ResponseEntity)
        }        

      }
    }
  
})