import Link from 'next/link'
import Head from 'next/head'
import { useSelector } from "react-redux";
// import styles from '@/styles/Home.module.css'
import { useEffect, useState, useRef, useCallback } from "react";
import { RootState } from '../lib/store';
import useLogout from '../hooks/UseLogout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function MainLayout(
  { children }:
  {
    children: React.ReactNode
  }
) {

    console.log('>>>> Main Layout render.............ms')

    const storeCommon = useSelector((state: RootState) => state.commonReducer) 
    const authReducer = useSelector((state: RootState) => state.authReducer)    
    const timeoutRef = useRef(0);    
    // const dispatch = useDispatch()
    const [showBackdrop, setShowBackdrop] = useState(false)
    const [message, setMessage] = useState('')
  
    const [userLogout] = useLogout()

    const timeCount = useCallback(async () => {      
      setMessage(() => {return 'Session timeout'})
      setShowBackdrop(() => true)
      userLogout()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const clearTimer = () => {
      const id = timeoutRef.current;
      clearTimeout(id)
    }

    // ================================================
    const checkTokenExpire = useCallback((expiredTime:number) => {
      const currentTime = Math.floor(Date.now() / 1000)
      const msec = 1000 * (currentTime - expiredTime)
      
      const id:any = setTimeout(timeCount,msec)      

      timeoutRef.current = id

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ================================================
    useEffect(() => {

      clearTimer()
      if(authReducer.expire != null) {
        checkTokenExpire(authReducer.expire)
      }

    },[authReducer.expire, checkTokenExpire])

    // if(store.loading == 'loading') {
    //   return (
    //     <>
    //       <h2>Loading...</h2>
    //     </>
    //   )
    // }

    return (
      <>     
        <div>
          <Head>
            <title>Nextjs - App Project</title>
          </Head>
        </div>   
        <div className="h-screen md:h-auto min-h-screen">
          {storeCommon.render && 
            <>
              <Header />

              <div className="pb-[200px]">
                  {children}
              </div>          

              <Footer />     
            </>
          }
        </div>

        {showBackdrop && <Backdrop message={message} setShowBackdrop={setShowBackdrop}/>}
      </>
    )
  }

  const Header = () => {

    const store = useSelector((state: RootState) => state.authReducer)    
    const [userLogout] = useLogout()

    return (
      <>
        <header className="mb-[80px] shadow-lg shadow-gray-500">
          <div className="flex flex-row justify-between bg-gray-800 p-8">     
            <div className="w-[80%]">
              <div className="h-full flex items-center">
                <h2 className="text-lg md:text-2xl text-white">
                { store.isAuth ? `Welcome ${store.me.name}` : 'You are not logged in'}
              </h2>              
              </div>
            </div>       
            <div className="w-[20%]">
              <div className="flex justify-end">
                {!store.isAuth && 
                  <Link className="bg-gray-600 hover:bg-gray-700 shadow-lg shadow-gray-600/50 px-6 py-2 rounded-lg block text-white flex" href="/login">
                    <span>
                      <span className="hidden md:inline mr-2"><FontAwesomeIcon icon={faRightToBracket} className="text-white text-sm"/></span>
                      Login
                    </span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </Link>}
                {store.isAuth && 
                  <button className="bg-red-500 shadow-lg shadow-red-500/50 px-6 py-2 rounded-lg text-white" onClick={userLogout} >
                    <span className="hidden md:inline mr-2"><FontAwesomeIcon icon={faArrowRightFromBracket} className="text-white text-sm"/></span>
                    Logout
                  </button>}
              </div>
            </div>       
          </div>

          <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-end mx-auto">              
              <div className="w-full md:block md:w-auto">
                <ul className="flex flex-col p-4 mt-0 md:mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link href="/" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <FontAwesomeIcon icon={faHome} className="text-white text-sm mr-2"/> Home
                    </Link>
                  </li>
                  <li>
                    {store.isAuth && 
                      <Link href="/profile" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <FontAwesomeIcon icon={faUser} className="text-white text-sm mr-2"/> Profile
                      </Link>}
                  </li>                  
                </ul>
              </div>
            </div>
          </nav>   
        </header>      
      </>
    )
  }

  const Footer = () => {
  
    return (
      <>

        <footer className="footer w-[100%]">
            <div className="p-6">
              <div className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 All Rights Reserved.
                </span>
                <hr className="lg:hidden my-4" />
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link href="/about" className="mr-4 hover:underline md:mr-6 ">About</Link>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
              </div>           
            </div>
        </footer>
      </>
    )

  }

  const Backdrop = ({message, setShowBackdrop}: {message:string, setShowBackdrop: (value:boolean) => void}) => {

    return (
      <>
        <div className="bg-black bg-opacity-90 w-[100%] h-screen z-[10000] fixed top-0 left-0"></div>
        
        <div className="fixed w-[100%] h-[200px] top-[50%] left-0 mt-[-100px] z-[10001] bg-white">
          <div className="flex flex-col justify-center item-center h-[100%]">
            <h1 className="flex justify-center text-4xl text-black">{message}</h1>
            <div className="flex justify-center mt-4">
              <button onClick={() => [
                setShowBackdrop(false)
              ]} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">OK</button>
            </div>
          </div>
        </div>  
      </>
    )

  }