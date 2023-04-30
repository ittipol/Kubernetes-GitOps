import { useMemo } from 'react'
import Link from 'next/link'
import { CardPropType } from '../models/entity'

const setLink = (slug: string) => {
    return 'item/'+slug
}

const discountPercent = (price: number, originalPrice: number): number => {
    return 100 - Math.floor((price * 100) / originalPrice)
}

const randonImage = () => {

    const NUMBER_OF_IMAGE = 3        
    const value = Math.ceil(Math.random() * NUMBER_OF_IMAGE)

    let img;

    switch (value) {
        case 1:
            img = "https://images.pexels.com/photos/2745254/pexels-photo-2745254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        break

        case 2:
            img = "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        break

        case 3:
            img = "https://images.pexels.com/photos/713664/pexels-photo-713664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        break
    }

    return img
}

const Card = ({title, slug ,description, price, originalPrice, itemToCategory}: CardPropType) => {

    const link = useMemo(() => setLink(slug),[slug])
    const discountPercentValue = useMemo(() => discountPercent(price, originalPrice), [price, originalPrice])    
    const coverImg = useMemo(() => randonImage(),[])

    return (
      <>
        <div className="relative max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 overflow-hidden">
            <Link href={link} className="block w-full h-[300px] bg-center bg-cover" style={{ backgroundImage: `url(${coverImg})` }}></Link>
            <div className="p-5">            
                <div className="mb-4 absolute top-[20px] left-[20px] shadow-2xl">                
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                        {itemToCategory[0].category.name}
                    </span>
                </div>

                <Link href={link}>
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white h-[60px] overflow-hidden">{title}</h5>
                </Link>  

                <div className="flex flex-col">
                    <div className="flex">
                        <div className="text-xl text-white">
                            <div>{price}฿</div>
                        </div>
                        {
                            originalPrice !== null 
                            ?   <div className="flex items-end ml-2">
                                    <div className="text-red-400 line-through">
                                        {originalPrice}฿
                                    </div>                        
                                </div> 
                            : ''                    
                        }
                    </div>
                    {
                        originalPrice !== null
                        ?
                        <div className="absolute top-0 right-0 bg-red-700 rounded-bl-lg">
                            <div className="px-4 py-2 text-center text-white">
                                {discountPercentValue}%
                            </div>
                        </div>
                        :
                        ''
                    }
                </div>
                <Link href={link} className="hidden inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View
                </Link>
            </div>
        </div>
      </>
    )
  }

  export default Card