import { axiosApiClient } from '../../lib/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const ApiValidate =  async (req: NextApiRequest, res: NextApiResponse) => {

    const { headers } = req

    // console.log('---------------#########################################')
    // console.log(headers)

    // console.log('api => validate user call........')

    try {

        const { data, headers: returnedHeaders } = await axiosApiClient.get(
            'auth/validate',
            {
              headers,
            }
        )

        // set response header from server
        // Object.keys(returnedHeaders).forEach(
        //     (key) => {
        //         res.setHeader(key, returnedHeaders[key])
        //     }
        // )        

        //

        res.setHeader("set-cookie", `refresh-token=''; path=/; max-age=0; httponly;`)
        
        res.status(200).json(data)            
    }
    catch(ex) {
        if (ex instanceof AxiosError) {   
            const errorRes = ex.response as AxiosResponse

            res.status(errorRes.status).send(errorRes.data)    
        }
    }
    
}

export default ApiValidate