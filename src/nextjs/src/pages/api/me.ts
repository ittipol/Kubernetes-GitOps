import { axiosApiClient } from '../../lib/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const ApiMe = async (req: NextApiRequest, res: NextApiResponse) => {

    const { headers } = req

    try {
        
        const { data } = await axiosApiClient.get('users/profile', {
            headers,
        })
    
        res.send(data)
    }
    catch(ex) {    
        
        if (ex instanceof AxiosError) {   
            const errorRes = ex.response as AxiosResponse

            res.status(errorRes.status).send(errorRes.data)    
        }
    }
    
}

export default ApiMe