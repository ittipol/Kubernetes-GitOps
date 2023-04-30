<template>
    <div class="md:w-[400px] mx-auto">  
        <form class="p-6">
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mail@mail.com" required>
            </div>
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <button @click.prevent="login" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>            
    </div>
</template>

<script>
    import { useAuthStore } from "../stores/auth";
    
    definePageMeta({
        middleware: ["guest"]
    });

    export default defineComponent({

        async setup() {
            const store = useAuthStore()            

            const email = ref('test@hotmail.com')
            const password = ref('1111')

            onServerPrefetch(async () => {
                // component is rendered as part of the initial request
                // pre-fetch data on server as it is faster than on the client
                // data.value = await fetchOnServer(/* ... */)

                // data.value = "This hook is only called during server-side rendering can be used to perform server-only data fetching."

                console.log('This hook is only called during server-side rendering can be used to perform server-only data fetching.')
            })

            onMounted(async () => {
                // if (!data.value) {
                //     // if data is null on mount, it means the component
                //     // is dynamically rendered on the client. Perform a
                //     // client-side fetch instead.
                //     // data.value = await fetchOnClient(/* ... */)
                // }
            })

            return {store, email, password}
        },        
        methods: {
            async login() {
                
                try {
                    const res = await this.store.login(email.value, password.value)

                    await this.store.profile()
                    
                    navigateTo('/')
                } catch (error) {
                    
                }
            }
        }

    })

</script>