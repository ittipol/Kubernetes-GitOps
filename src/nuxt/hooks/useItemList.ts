import { useItemStore, searchTermType, searchTermInit } from '../stores/item'

const useItemList = () => {    

    const store = useItemStore()

    const loadItem = async (page: number = 1) => {

        store.$patch({isLoading: true})

        await store.loadItem(page)

        setTimeout(() => {
            store.$patch({isLoading: false})
        },200)

    }

    const setSearhTermAndLoadItem = async (searchTerm: searchTermType = searchTermInit, page: number = 1) => {

        store.$patch({isLoading: true})
        
        await store.submitSeachTerm(page, searchTerm)
        
        setTimeout(() => {
            store.$patch({isLoading: false})
        },200)
    }

    const nextPage = () => {
        
        if(store.isLoading) {
            return
        }              

        loadItem(store.currentPage + 1)
    }

    const prevPage = () => {
        
        if(store.currentPage <= 1 || store.isLoading) {
            return
        }              

        loadItem(store.currentPage - 1)
    }

    const submitSearchTerm = (searchTerm: searchTermType) => {
        
        if(store.isLoading) {
            return
        }        

        setSearhTermAndLoadItem(searchTerm)

    }

    return {loadItem, nextPage, prevPage, submitSearchTerm}

}

export default useItemList