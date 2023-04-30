// import { useDispatch } from "react-redux";
import { useAppDispatch, AppDispatch } from '../lib/store'
import { logout } from '../lib/slices/auth';
import { useRouter } from "next/router";

const UseLogout = () => {

    // const dispatch = useDispatch<AppDispatch>() 
    const appDispatch = useAppDispatch()
    const router = useRouter()         

    const userLogout = async () => {        
        await appDispatch(logout())
        
        router.push('/');
      }

    return [userLogout]
}

export default UseLogout