import { useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from '../lib/slices/auth';
import { useAppDispatch } from '../lib/store'

type inputValues = {
    emailAddress: string
    password: string
}

const Login = () => {

    const appDispatch = useAppDispatch()
    // const dispatch = useDispatch();
    const router = useRouter();

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)    

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        const _emailInput = emailInput.current as HTMLInputElement
        const _passwordInput = passwordInput.current! // ! mean don't use null 

        const credentials: inputValues = {
            emailAddress: _emailInput.value,
            password: _passwordInput.value,
        }

        try
        {
            const response = await appDispatch(login(credentials))
        }
        catch(ex) {}
        finally {
            router.push('/');
        }
    }

    return (
        <>
            <div className="w-[95%] md:w-[500px] flex justify-center mx-auto">
                <div className="p-6 w-[80%]">
                
                    <form>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input ref={emailInput} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required defaultValue="test@hotmail.com" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                            <input ref={passwordInput} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required defaultValue="1111" />
                        </div>
                        <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                
                </div>
            </div>
        </>
    )

}

export default Login