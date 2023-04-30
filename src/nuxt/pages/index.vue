<template>
    
    <div>
        <div class="flex container mx-auto justify-center mb-9">
            <button @click="toggleSearchPanel" class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white block">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <span class="text-white text-md mr-2">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                        </span>
                        <span>ค้นหา</span>
                    </span>
            </button>
        </div>
        <div v-if="!store.isLoading">
            <div v-if="store.itemList.length > 0" class="flex flex-col">
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-[20px] lg:px-[100px] xl:px-[200px] mx-auto">
                    <div v-for="item in store.itemList" :key="item.id">
                        <Card 
                            :title="item.title" 
                            :slug="item.slug"
                            :desc="item.desc"
                            :price="item.price"
                            :originalPrice="item.originalPrice"
                            :itemToCategory="item.itemToCategory"
                            :link="'item/'+item.slug"
                        />
                    </div>
                </div>

                <div class="mx-auto mt-[70px] shadow-xl">
                    <div class="flex justify-between bg-blue-600 rounded-[20px] overflow-hidden">
                        <button @click="prevPage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Prev
                        </button>
                        <div class="mx-6">
                            <div class="flex justify-center items-center w-[40px] h-[40px] rounded-[50%] text-xl text-white">{{store.currentPage}}</div>
                        </div>
                        <button @click="nextPage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
                </div>
    
            </div>

            <div v-else class="flex justify-center items-center h-[400px]">
                <div class="py-6 px-6 md:px-[240px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No item found</h5>                                        
                </div>
            </div>
        </div>
        <div v-else>
            <Loading />
        </div>
    </div>
    <SearchPanel ref="searhPanelComponentRef" />

</template>     

<script setup>
    import { useItemStore } from '../stores/item'
    import useItemList from '@/hooks/useItemList'

    const store = useItemStore()
    const { loadItem, nextPage, prevPage } = useItemList()
    const searhPanelComponentRef = ref()        

    onMounted(async () => {
        await loadItem()        
    })

    const toggleSearchPanel = () => {        
        searhPanelComponentRef.value.toggleSearchPanel()
    }
    
</script>
    