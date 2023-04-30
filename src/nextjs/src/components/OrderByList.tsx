import { memo } from 'react'
import { OrderByEnum as OrderByEnumType  } from '../lib/slices/search'

const OrderByList = (
    {setSelectedOrder, selectedOrder, OrderByEnum}:
    {
        setSelectedOrder: (value: any) => void,
        selectedOrder: string,
        OrderByEnum: typeof OrderByEnumType
    }
) => {

    console.log('@@@@@@@@@  [SearchBar]  OrderByList Component render')

    return(
        <>
            <h4 className="text-md mb-4">จัดเรียงโดย</h4>
                                
            <div className="grid grid-cols-2 gap-2">

                <OrderByListItem
                    id={OrderByEnum.POST_DATE_DESC}
                    message="โพสต์ใหม่สุด - เก่าสุด"
                    value={OrderByEnum.POST_DATE_DESC}
                    setSelectedOrder={setSelectedOrder}                     
                    selectedOrder={selectedOrder} />

                <OrderByListItem
                    id={OrderByEnum.POST_DATE_ASC}
                    message="โพสต์เก่าสุด - ใหม่สุด"
                    value={OrderByEnum.POST_DATE_ASC}
                    setSelectedOrder={setSelectedOrder}                     
                    selectedOrder={selectedOrder} />

                <OrderByListItem
                    id={OrderByEnum.PRICE_DESC}
                    message="ราคาสูง - ต่ำ"
                    value={OrderByEnum.PRICE_DESC}
                    setSelectedOrder={setSelectedOrder}                     
                    selectedOrder={selectedOrder} />

                <OrderByListItem
                    id={OrderByEnum.PRICE_ASC}
                    message="ราคาต่ำ - สูง"
                    value={OrderByEnum.PRICE_ASC}
                    setSelectedOrder={setSelectedOrder}                     
                    selectedOrder={selectedOrder} />
                                    
            </div>
        </>
    )
}

const OrderByListItem = (
    {id, message, value, setSelectedOrder, selectedOrder}:
    {
        id: string,
        message: string,
        value: string,
        setSelectedOrder: (prev:any) => any,
        selectedOrder: string,
    }
) => {
    return (
        <div className="w-full flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input 
                id={id} 
                type="radio" 
                value={value}
                name="order-by" 
                onChange={(e) => {
                    setSelectedOrder(e.target.value)
                }}
                checked={selectedOrder == value}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor={id} className="w-full py-4 ml-2 text-sm font-medium text-gray-900">{message}</label>
        </div>
    )
}

export default memo(OrderByList)