export type ItemType = {
    id: number,
    title: string,
    slug: string,
    description: string,
    price: number,
    originalPrice: number,
    itemToCategory: Array<ItemToCategoryType>
}

export type ItemToCategoryType = {
    category: CategoryType
}

export type CategoryType = {
    id: number,
    slug: string,
    name: string
}

// Component prop
export type CardPropType = {
    title: string,
    slug: string,
    description: string,
    price: number,
    originalPrice: number,
    itemToCategory: Array<ItemToCategoryType>
}

export type ResultEntity = {
    data: any
    status: string
    message: string
    isError: boolean
}