import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '@/styles/globals.css'
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux'
import { wrapper } from '../lib/store'
import createEmotionCache from '../utilities/createEmotionCache'
import UseCheckIsAuth from '../hooks/UseCheckIsAuth'
import MainLayout from '../layouts/Main'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

const clientSideEmotionCache = createEmotionCache();

function App({ Component, ...rest }: AppProps) {

  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const [autoLogin] = UseCheckIsAuth();

  useEffect(()=>{
    autoLogin()

    return () => {
      console.log('Clear before componet closing....')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Render = () => {
    return (
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </CacheProvider>
      </Provider>
    )    
  }

  // return (
  //   <Provider store={store}>
  //     <CacheProvider value={emotionCache}>
  //       <Component {...pageProps} />
  //     </CacheProvider>
  //   </Provider>
  // )

  // return (
  //   <>
  //     <Render />
  //   </>
  // )

  return Render()
}

export default App