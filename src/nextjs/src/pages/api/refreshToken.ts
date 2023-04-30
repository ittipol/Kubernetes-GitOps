import { axiosApiClient } from '../../lib/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const ApiRefreshToken = async (req: NextApiRequest, res: NextApiResponse) => {

    const { headers } = req

    // console.log('---------------#########################################')
    console.log('/auth/refresh  ####################################')
    // console.log(headers)

    try {

        const { data, headers: returnedHeaders } = await axiosApiClient.get('auth/refresh', {
            headers,
        })

        // set response header from server
        Object.keys(returnedHeaders).forEach(
            (key) => {
                res.setHeader(key, returnedHeaders[key])
            }
        )

        // Object.entries(returnedHeaders).forEach((keyArr) =>
        //    {
        //     console.log(keyArr)
        //     // res.setHeader(keyArr[0], keyArr[1] as string)
        //    }
        // )

        //
        res.status(200).json(data)            
    }
    catch(ex) {
        res.setHeader("set-cookie", `refresh-token=''; path=/; max-age=0; httponly;`)
        
        if (ex instanceof AxiosError) {   
            const errorRes = ex.response as AxiosResponse

            res.status(errorRes.status).send(errorRes.data)    
        }
    }
    
}

export default ApiRefreshToken