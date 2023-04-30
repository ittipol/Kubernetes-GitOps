import { memo } from 'react'
import { Item } from '../hooks/UsePagination'
import Card from '../components/Card'
import { ItemType } from '../models/entity'

const CardList = (
    {
        itemList
    }: 
    {
        itemList: Array<ItemType>
    }
) => {
    console.log('>>>>>>>   CardList Component render')
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-[20px] lg:px-[100px] xl:px-[200px] mx-auto">
            {itemList.map((item:ItemType, index:number) => (
                <Card
                key={index}
                title={item.title}
                slug={item.slug}
                description={item.description}
                price={item.price}
                originalPrice={item.originalPrice} 
                itemToCategory={item.itemToCategory}/>
            ))}            
        </div>
    )

}

export default memo(CardList)