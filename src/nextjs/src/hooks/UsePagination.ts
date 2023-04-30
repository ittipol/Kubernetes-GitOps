import { useEffect, useReducer } from 'react'
// import axios from 'axios'
import { store } from '../lib/store'
import { loadData, searchData } from '../lib/slices/search'

export type Item = {
    id: number,
    title: string,
    slug: string,
    description: string,
    price: number,
    originalPrice: number,
    itemToCategory: Array<{}>
}

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

export const initialSearchTerm: searchTermType = {
    keyword: "",
    category: [],
    orderBy: OrderByEnum.POST_DATE_DESC
}

const initStateValue = {
    currentPage: 1,
    itemList: [],
    searchTerm: initialSearchTerm,
    isItemListLoading: true
}

const ACTION = {
    SET_ITEM_LIST: 'SET_ITEM_LIST',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_ITEM_LIST_AND_CURRENT_PAGE: 'SET_ITEM_LIST_AND_CURRENT_PAGE',
    RESET: 'RESET',
}

// const reducer = (state:any, action:any) => {
    
//     switch(action.type) {
//         case ACTION.SET_ITEM_LIST:
//                 return {...state, itemList: action.payload}            

//         case ACTION.SET_IS_LOADING:
//                 return {...state, isItemListLoading: action.payload}            

//         case ACTION.SET_CURRENT_PAGE:
//                 return {...state, currentPage: action.payload}            

//         case ACTION.SET_SEARCH_TERM:
//                 return {...state, searchTerm: action.payload}

//         case ACTION.SET_ITEM_LIST_AND_CURRENT_PAGE:
//                 return {
//                     ...state,
//                     itemList: action.payload.data,
//                     currentPage: action.payload.page
//                 }            

//         case ACTION.RESET:
//                 return initStateValue

//         default:
//             throw new Error()
//     }

// }

const UsePagination = () => {

    // const [state, dispatch] = useReducer(reducer, initStateValue)

    const searchStore = store.getState().searchReducer;

    useEffect(() => {
        // console.log('init page load...')
        // console.log(state)
        // loadItemList(state.currentPage)
        loadItemList2(searchStore.currentPage) // => search reducer

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const loadItemList = async (page: number, searchTerm: searchTermType = initialSearchTerm) => {

    //     try {

    //         console.log('[-- loadItemList --]') 
    //         console.log(state.searchTerm.keyword)                       

    //         const { data } = await axios.get('http://localhost:4040/items/list', {
    //             params: {
    //                 page: page,
    //                 keyword: searchTerm.keyword,
    //                 category: JSON.stringify(searchTerm.category),
    //                 order: searchTerm.orderBy 
    //             }
    //         })

    //         console.log(data)

    //         // resolved
    //         if(data.length > 0) {                

    //             dispatch({
    //                 type: ACTION.SET_ITEM_LIST_AND_CURRENT_PAGE,
    //                 payload: {
    //                     data: data,
    //                     page: page
    //                 }
    //             })

    //             dispatch({
    //                 type: ACTION.SET_SEARCH_TERM,
    //                 payload: searchTerm
    //             })
            
    //         }else {
                
    //             // call action reset
    //             // dispatch({
    //             //     type: ACTION.SET_ITEM_LIST_AND_CURRENT_PAGE,
    //             //     payload: {
    //             //         data: [],
    //             //         page: 1
    //             //     }
    //             // })

    //             dispatch({type: ACTION.RESET})

    //             console.log('..... no more item to display')
    //         }

            
    //     } 
    //     catch {
    //         // rejected
    //     }
    //     finally {
    //         setTimeout(() => {
    //             dispatch({
    //                 type: ACTION.SET_IS_LOADING,
    //                 payload: false
    //             })
    //         },1500)
    //     }

    // }

    const loadItemList2 = async (page: number) => {

        if(page < 1) {
            page = 1
        }

        store.dispatch(loadData({page}))        

    }

    const searchItemList = async (page: number, searchTerm: searchTermType = initialSearchTerm) => {

        // let credentials = {page: page, ...searchTerm}

        store.dispatch(searchData({
            page,
            searchTerm
        }))
    }

    const prevPage = async () => {    
        
        if(searchStore.currentPage <= 1 || searchStore.isLoading) {
            return
        }

        // dispatch({
        //     type: ACTION.SET_IS_LOADING,
        //     payload: true
        // })

        loadItemList2(searchStore.currentPage-1)
    }

    const nextPage = async () => {        
    
        if(searchStore.isLoading) {
            return
        }

        // dispatch({
        //     type: ACTION.SET_IS_LOADING,
        //     payload: true
        // })

        loadItemList2(searchStore.currentPage+1)
    }

    const submitSearchTerm = async (searchTerm: searchTermType) => {
        
        if(searchStore.isLoading) {
            return
        }                    

        // dispatch({
        //     type: ACTION.SET_IS_LOADING,
        //     payload: true
        // })            
        
        // loadItemList(1, searchTerm)

        searchItemList(1, searchTerm)

    }

    return {prevPage ,nextPage, submitSearchTerm}
}

export default UsePagination