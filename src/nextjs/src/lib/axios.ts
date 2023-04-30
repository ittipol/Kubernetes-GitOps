import axios from 'axios'
import { refreshToken } from './slices/auth';
import { store } from './store'

const IGNORED_PATHS: Array<string> = ['api/refreshToken']
const REQUEST_ATTEMP_TIMES = 2

// let urls = {
//     test: `http://localhost:3334`,
//     development: 'http://localhost:3333/',
//     production: 'https://your-production-url.com/'
// }
// const api = axios.create({
//     baseURL: urls[process.env.NODE_ENV],
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// });


const axiosClient = axios.create();

axiosClient.interceptors.request.use(
    config => {

        // console.log(store)
        // config.headers!['Authorization'] = token;

        // console.log('axiosClient.interceptors.request.....')
        console.log('Call api: >>>>>>> '+config.url)    
        const accessToken = store.getState().authReducer.accessToken
        console.log('Axios_KEY: '+accessToken)

        if(accessToken !== '') {            
            config.headers!['Authorization'] = `Bearer ${accessToken}`;
        }        

        return config
    },
    error => {
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(
    response => {
        return response
    },
    async err => {        
        const originalConfig = err.config;        
        const accessToken = store.getState().authReducer.accessToken
        const isIgnored = IGNORED_PATHS.some(path => originalConfig.url.includes(path))

        // console.log(originalConfig.url)
        console.log(`Get New Token: [${(err.response.status === 401 && !isIgnored && accessToken !== '')}]`)

        if(err.response.status === 401 && !isIgnored && accessToken !== '') {

            if(!originalConfig._retryAttempt) {
                originalConfig._retryAttempt = 0                
            }            

            if(++originalConfig._retryAttempt <= REQUEST_ATTEMP_TIMES) {
                
                try
                {
                    // console.log(originalConfig)
                    console.log('===> ['+originalConfig.url+'] >>>>> attemp_count: '+originalConfig._retryAttempt)
                    
                    // Get new refresh token
                    await store.dispatch(refreshToken())
    
                    // retry original request
                    return axiosClient(originalConfig);
                }
                catch (ex)
                {
                    return Promise.reject(err);
                }
            }

        }        

        return Promise.reject(err);

        // return Promise.resolve()
        
        // window.location.href = window.location.origin;        
    }
)

export const axiosApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_PROXY
});

export const axiosApiClientDirect = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API
});

export default axiosClient