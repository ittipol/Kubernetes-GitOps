import { defineStore } from 'pinia'
import { ResponseEntity, responseData } from '../models/type'

export enum OrderByEnum {
    POST_DATE_ASC = "post-date-asc",
    POST_DATE_DESC = "post-date-desc",
    PRICE_ASC = "price-asc",
    PRICE_DESC = "price-desc",
}

export type searchTermType = {
    keyword: string,
    category: [],
    orderBy: string
}

export const searchTermInit: searchTermType = {
    keyword: '',
    category: [],
    orderBy: OrderByEnum.POST_DATE_DESC
}

const initState = {
    itemList: [],
    isLoading: false,
    currentPage: 1,
    searchTerm: searchTermInit
}

export const useItemStore = defineStore("item", {
    state: () => {
        return initState
    },
    actions: {                       

        async loadItem(page: number) {
            
            const runtimeConfig = useRuntimeConfig();

            try {
                
                const params = {
                    page: page,   
                    keyword: this.searchTerm.keyword,
                    category: JSON.stringify(this.searchTerm.category),
                    order: this.searchTerm.orderBy
                }
    
                const response = await $fetch.raw('items/list', {
                    baseURL: runtimeConfig.public.apiBase,
                    method: 'GET',
                    query: params
                })

                if(response._data.length > 0) {
                    this.currentPage = page
                    this.itemList = response._data 
                }                            

            } catch (error) {
                throw responseData({status: error.status} as ResponseEntity)
            }

        },

        async submitSeachTerm(page: number, searchTerm: searchTermType) {

            const runtimeConfig = useRuntimeConfig();

            try {
             
                const params = {
                    page: page,   
                    keyword: searchTerm.keyword,
                    category: JSON.stringify(searchTerm.category),
                    order: searchTerm.orderBy
                }
    
                const response = await $fetch.raw('items/list', {
                    baseURL: runtimeConfig.public.apiBase,
                    method: 'GET',
                    query: params
                })

                this.itemList = response._data 
                this.currentPage = page
                this.searchTerm = searchTerm

            } catch (error) {
                throw responseData({status: error.status} as ResponseEntity)
            }            

        }

    }
})