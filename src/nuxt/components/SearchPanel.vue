<template>
    
    <div ref="searhPanelRef" id="searchPanel" class="transition-[left_opacity] duration-500 ease-in-out w-full md:w-[440px] h-screen bg-white fixed left-[-100%] top-0 z-[1000] opacity-0 bg-opacity-80 md:bg-opacity-100">
        <div class="container mx-auto">
            <div class="p-9">
                <div class="flex justify-end">
                    <div @click="toggleSearchPanel" class="flex items-center justify-center w-[40px] h-[40px] bg-red-600 rounded-full" role="button">
                        <font-awesome-icon :icon="['fas', 'close']" class="text-white text-xl" />
                    </div>
                </div>

                <div>
                    <h4 class="text-lg mb-4">ค้นหา</h4>
                    <input 
                        v-model="keywordInput"
                        type="text" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <div class="grid grid-cols-2 px-2 py-4">
                        <div v-for="category in categories" :key="category.id" class="py-2 px-0 md:px-2">  
                            <SearchPanelCategoryCheckbox
                                @set-selected-category="setSelectedCategory"
                                :name="category.name"
                                :id="category.id"                                
                                :checked="checkSelectedCategory(category.id)"
                            />
                        </div>
                    </div>
                </div>
                <div class="my-4">

                    <h4 class="text-md mb-4">จัดเรียงโดย</h4>

                    <div class="grid grid-cols-2 gap-2">
                        <SearchPanelOrderByRadioButton 
                            @set-selected-order-by="setSelectedOrderBy"
                            :id="OrderByEnum.POST_DATE_DESC"
                            message="โพสต์ใหม่สุด - เก่าสุด"
                            :value="OrderByEnum.POST_DATE_DESC"
                            :checked="OrderByEnum.POST_DATE_DESC == selectedOrder"
                        />

                        <SearchPanelOrderByRadioButton 
                            @set-selected-order-by="setSelectedOrderBy"
                            :id="OrderByEnum.POST_DATE_ASC"
                            message="โพสต์เก่าสุด - ใหม่สุด"
                            :value="OrderByEnum.POST_DATE_ASC"
                            :checked="OrderByEnum.POST_DATE_ASC == selectedOrder"
                        />

                        <SearchPanelOrderByRadioButton 
                            @set-selected-order-by="setSelectedOrderBy"
                            :id="OrderByEnum.PRICE_DESC"
                            message="ราคาสูง - ต่ำ"
                            :value="OrderByEnum.PRICE_DESC"
                            :checked="OrderByEnum.PRICE_DESC == selectedOrder"
                        />

                        <SearchPanelOrderByRadioButton 
                            @set-selected-order-by="setSelectedOrderBy"
                            :id="OrderByEnum.PRICE_ASC"
                            message="ราคาต่ำ - สูง"
                            :value="OrderByEnum.PRICE_ASC"
                            :checked="OrderByEnum.PRICE_ASC == selectedOrder"
                        />
                    </div>
                </div>

                <button @click="submit" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ค้นหา</button>
            </div>            
        </div>
    </div>

    <div ref="backDropRef" class="transition-[opacity] duration-300 ease-in-out bg-black bg-opacity-70 w-[100%] h-screen fixed top-0 left-0 opacity-0 z-[-100]"></div>

</template>

<script setup lang="ts">
    const runtimeConfig = useRuntimeConfig();    
    import { useItemStore, OrderByEnum } from '../stores/item'
    import useItemList from '@/hooks/useItemList'

    const store = useItemStore()
    const { loadItem, nextPage, prevPage, submitSearchTerm } = useItemList()

    const isSearchPanelOpen = ref(false)
    const searhPanelRef = ref(null)
    const backDropRef = ref(null)

    const keywordInput = ref(store.searchTerm.keyword)
    const selectedCategories = ref(store.searchTerm.category)
    const selectedOrder = ref(store.searchTerm.orderBy)

    let apiBase = runtimeConfig.public.apiBase
    if(process.server) {
        apiBase = runtimeConfig.public.apiBaseProxy
    }

    const { data:categories }  = await useAsyncData('categories', () => $fetch(`${apiBase}/categories`))

    const toggleSearchPanel = () => {
        
        if(isSearchPanelOpen.value) {
            searhPanelRef.value.style.left = "-100%"
            searhPanelRef.value.style.opacity = "0"

            backDropRef.value.style.opacity = "0"
            backDropRef.value.style.zIndex = "-100"

            setTimeout(() => {     
                document.body.style.overflow = ""
            }, 500)
        }else {    

            document.body.style.overflow = "hidden"

            searhPanelRef.value.style.opacity = "1"
            searhPanelRef.value.style.left = "0px"

            backDropRef.value.style.opacity = "1"
            backDropRef.value.style.zIndex = "999"
        }

        isSearchPanelOpen.value = !isSearchPanelOpen.value; 
    }

    const setSelectedCategory = (e) => {

        if(e.target.checked) {
            // add category
            selectedCategories.value = [...selectedCategories.value, e.target.value]
        } else {
            // remove category
            const index = selectedCategories.value.indexOf(e.target.value)  
            selectedCategories.value.splice(index, 1)      
        }
        console.log(selectedCategories.value)
    }

    const checkSelectedCategory = (value) => {        
        if(selectedCategories.value.indexOf(value.toString()) > -1) {
            return true
        }
        return false
    }

    const setSelectedOrderBy = (e) => {     
        selectedOrder.value = e.target.value
    }

    const submit = () => {

        const _searchTerm = {
            keyword: keywordInput.value,
            category: selectedCategories.value,
            orderBy: selectedOrder.value            
        }

        console.log(selectedCategories.value)
        
        submitSearchTerm(_searchTerm)
    }

    defineExpose({
        toggleSearchPanel
    })
</script>

<style scoped>
    #searchPanel {
        color: #000;
    }
</style>