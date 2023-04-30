// import axios from 'axios'
import { axiosApiClient } from '../../lib/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const ApiLogin = async (req: NextApiRequest, res: NextApiResponse) => {

    const { headers, body } = req

    // console.log('####################################')
    // console.log(body)

    // console.log(req.method)

    try {

        const { data, headers: returnedHeaders } = await axiosApiClient.post(
            'auth/signin',
            body, // Login body (email + password)
            { headers } // Headers from the Next.js Client
        )    

        // console.log(returnedHeaders)
        // console.log(data)

        // Set response header and send it back to client
        Object.entries(returnedHeaders).forEach((keyArr) =>
           res.setHeader(keyArr[0], keyArr[1] as string)
        )

        res.status(200).json(data)
    }
    catch(ex) {        

        if (ex instanceof AxiosError) {   
            const errorRes = ex.response as AxiosResponse

            res.status(errorRes.status).send(errorRes.data)    
        }
        
    }
    
}

export default ApiLogin