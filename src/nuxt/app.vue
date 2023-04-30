<template>
  <div class="flex flex-row justify-center bg-gray-900 py-3">
    <div>{{runtimeConfig.public.mode}}</div>
    <div v-show="runtimeConfig.public.mode == 'PRODUCTION'" class="ml-4">
       <a href="http://nextjs" class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 m-0">Switch to Next.js</a>
    </div>
 </div>
  <div v-show="render" class="dark">
    <NuxtLayout :name="layout">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'

  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig();    

  const store = useAuthStore()  
  const render = ref(false)

  // You might choose this based on an API call or logged-in status
  const layout = "main";

  onMounted(async () => {
      console.log('App: on mount')

      try {
        await store.refreshToken()
        await store.profile()

      } catch (error) {
        
      } finally {
        render.value = true
      }
      
  })
</script>