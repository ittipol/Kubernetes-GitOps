import { AxiosError, AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
// import { NextResponse } from 'next/server'

const ApiLogout = async (req: NextApiRequest, res: NextApiResponse) => {

    const { headers } = req

    try {

        console.log('logout ######################')

        // const { data, headers: returnedHeaders } = await axios.get(
        //     'http://localhost:4040/auth/validate',
        //     {
        //       headers,
        //     }
        // )

        // set response header from server
        // Object.keys(returnedHeaders).forEach(
        //     (key) => {
        //         res.setHeader(key, returnedHeaders[key])
        //     }
        // )        

        res.setHeader("set-cookie", `refresh-token=''; path=/; max-age=0; httponly;`)

        //
        res.status(200).json("Logout")            
    }
    catch(ex) {
        if (ex instanceof AxiosError) {   
            const errorRes = ex.response as AxiosResponse

            res.status(errorRes.status).send(errorRes.data)    
        }
    }
    
}

export default ApiLogout