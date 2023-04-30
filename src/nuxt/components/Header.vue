<template>
        <header class="mb-[80px] shadow-lg shadow-gray-500">
            <div v-if="store.isAuth" class="bg-green-600 text-white text-[13px] p-2 flex justify-between">
                <div>
                    Welcome, {{store.name}}
                </div>
                <div>
                    <button @click="userLogout" class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Logout</button>
                </div>
            </div>
            <div v-else class="bg-red-600 text-white text-[13px] p-2 flex justify-between">
                <div>
                    You are not logged in
                </div>
                <div>
                    <NuxtLink to="/login" class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Login</NuxtLink>
                </div>
            </div>
            <nav class="bg-sky-800">
                <ul class="container flex items-center p-3 text-gray-200">
                    <li class="border-b-2 mx-1.5 sm:mx-6" :class="navActive('/')">
                        <NuxtLink to="/">Home</NuxtLink>
                    </li>
                    <li class="border-b-2 mx-1.5 sm:mx-6" :class="navActive('/about')">
                        <NuxtLink to="/about">About</NuxtLink>
                    </li>
                    <li v-show="store.isAuth" class="border-b-2 mx-1.5 sm:mx-6" :class="navActive('/profile')">
                        <NuxtLink to="/profile">Profile</NuxtLink>
                    </li>
                </ul>
            </nav>         
        </header>      
</template>    

<script>
    import { useAuthStore } from "@/stores/auth";
    import useLogout from "@/hooks/useLogout";

    export default defineComponent({            

        async setup() {
            const store = useAuthStore()            
            const { userLogout, a } = useLogout()
            const route = useRoute()
            const name = ref()

            const navActive = (path) => {

                return path == route.path
                    ? "border-sky-600"
                    : "border-transparent hover:border-sky-600 opacity-70 hover:opacity-100";
               
            }
  
            return { store, name, userLogout, navActive }
        }

    })

</script>