import { useAuthStore } from "@/stores/auth";

const useLogout = () => {

    const store = useAuthStore()

    const userLogout = async () => {
        await store.logout()
        return navigateTo('/')
    }

    return {userLogout}

}

export default useLogout