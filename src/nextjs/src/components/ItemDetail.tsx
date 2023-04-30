import { ItemType } from '../models/entity'

const discountPercent = (price:number, originalPrice:number) => {
  
  if(originalPrice !== null) {
    return 100 - Math.floor((price * 100) / originalPrice)
  }

  return 0
}

const ItemDetail = (
  { detail } : { detail: ItemType }
) => {
        
    return (
        <>
          <div className="p-6">
            <h2 className="text-2xl lg:text-4xl">{detail.title}</h2>
            <div className="my-4">                
              <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">
                  {detail.itemToCategory[0].category.name}
              </span>
            </div>
            <hr className="my-6"/>
              <div className="flex flex-col-reverse lg:flex-row w-full lg:w-[80%] mx-auto">
                <div className="w-full lg:w-[70%] mt-6 lg:mt-0">
                  <div className="p-6 pt-0" dangerouslySetInnerHTML={{__html: detail.description}}>
                  </div>
                </div>
                <hr className="h-[10px] bg-red-500 lg:hidden"/>
                <div className="w-full lg:w-[30%]">
                  <div className="w-full">
                    <div className="pl-0 lg:pl-4">
                      <div className="flex p-3 bg-red-100 justify-center lg:justify-start">
                        <div className="text-2xl text-red-500">{detail.price}฿</div>
                        {
                        detail.originalPrice !== null 
                        ? <div className="flex flex-col items-end ml-2">
                            <div className="text-red-900 line-through">
                              {detail.originalPrice}฿
                            </div>
                            <div className="bg-red-600">
                              <div className="px-3 text-white">
                                ลด {discountPercent(detail.price, detail.originalPrice)}%
                              </div>
                            </div>
                          </div> 
                        : ''                    
                        }
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
          </div>
        </>
    )

}

export default ItemDetail