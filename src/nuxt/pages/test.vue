<template>
        <div>
            <button @click="show">Show</button>
        </div>
        <div>
            <button @click="reset">Reset</button>
        </div>
        <button @click="login">Login</button>
        <button @click="profile" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Load Profile</button>
    </template>     
    
    <script>
        import { useAuthStore } from "../stores/auth";
    
        export default defineComponent({
            setup() {
                const store = useAuthStore()
    
                return { store }
            },
            methods: {
                async login() {
                
                    const email = "test@hotmail.com"
                    const password = "1111"
    
                    try {
                        const res = await this.store.login(email, password)
    
                        await this.store.profile()

                    } catch (error) {
                        
                    }
    
                    // update store
                    // this.store.$patch({ name: ' update' })
                },
                profile() {
                    this.store.profile()
                },
                show() {
                    this.store.$patch({ name: 'for test reset state', accessToken: '---------' })
                    console.log(this.store.name)
                },
                reset() {
                    this.store.$reset()
                }
            },
            
        })
    
            
    </script>
        