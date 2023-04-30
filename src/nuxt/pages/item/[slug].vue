<template>
    
    <div v-if="item.data">
        <div class="container mx-auto">
            <div class="p-6">
                <h2 class="text-2xl lg:text-4xl">{{item.data.title}}</h2>
                <div class="my-4">                
                <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">
                    {{item.data.itemToCategory[0].category.name}}
                </span>
                </div>        
            </div>
        </div>
        <hr class="hidden lg:block my-6"/>
        <div class="flex flex-col-reverse lg:flex-row w-full lg:w-[80%] mx-auto">
            <div class="w-full lg:w-[70%] mt-6 lg:mt-0">
                <div class="p-6 pt-0" v-html="item.data.description"></div>
            </div>
            <hr class="h-[10px] bg-red-500 lg:hidden"/>
            <div class="w-full lg:w-[30%]">
                <div class="w-full">
                    <div class="pl-0 lg:pl-4">
                        <div class="flex p-3 bg-red-100 justify-center lg:justify-start">
                            <div class="text-2xl text-red-500">{{item.data.price}}฿</div>
                            <div v-show="item.data.originalPrice" class="flex flex-col items-end ml-2">
                                <div class="text-red-900 line-through" >
                                    {{item.data.originalPrice}}฿
                                </div>
                                <div class="bg-red-600">
                                    <div class="px-3 text-white">
                                    ลด {{discountPercentValue(item.data.price, item.data.originalPrice)}}%
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <div v-else>
        <div class="container mx-auto h-[500px] flex justify-center item-center">
            <h2 class="text-4xl">No item found</h2>
        </div>
    </div>

</template>    

<script setup>
    const runtimeConfig = useRuntimeConfig();    
    const route = useRoute();
    const slug = route.params.slug
    
    let apiBase = runtimeConfig.public.apiBase
    if(process.server) {
        apiBase = runtimeConfig.public.apiBaseProxy
    }

    const { data:item }  = await useAsyncData('item', () => $fetch(`${apiBase}/items/result/${slug}`))    

    const discountPercentValue = (price, originalPrice) => {
        return 100 - Math.floor((price * 100) / originalPrice)
    }

</script>