import { memo } from 'react'
import { CategoryType } from '../models/entity'

const CategoryList = (
    {
        categories, setCategorySearchTerm, checkedState
    }
    :
    {
        categories: Array<CategoryType>,
        setCategorySearchTerm: (checked:boolean, value:number, index: number) => void,
        checkedState: any[]
    }
) => {

    console.log('@@@@@@@@@  [SearchBar]  CategoryList Component render')
    
    return (
        <div className="grid grid-cols-2 px-2 py-4">
            {categories.map((category: CategoryType, index:number) => {
                return(
                    <div key={index} className="py-2 px-0 md:px-2">
                        <input                                                    
                            type="checkbox"
                            id={`category-checkbox-${index}`}
                            name={category.slug}
                            value={category.id}     
                            checked={checkedState[index]}
                            onChange={(e) => setCategorySearchTerm(e.target.checked, category.id, index)}                  
                        />
                        <label className="ml-2 text-sm" htmlFor={`category-checkbox-${index}`}>{category.name}</label>
                    </div>
                )
            })}
        </div>
    )

}

export default memo(CategoryList)