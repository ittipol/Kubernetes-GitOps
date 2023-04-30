import { useRef, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { SearchStoreSelector, searchTermType, OrderByEnum } from '../lib/slices/search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import CategoryList from '../components/CategoryList'
import OrderByList from '../components/OrderByList'
import { CategoryType } from '../models/entity'

const openSearchPanel = (_searchPanelElem:any, _backDropElem: any) => {    
    document.body.style.overflow = "hidden"

    setTimeout(() => {            
        _searchPanelElem.style.left = "0px"
        _searchPanelElem.style.opacity = "1"

        _backDropElem.style.opacity = "1"
        _backDropElem.style.zIndex = "999"
    }, 100)
}

const closeSearchPanel = (_searchPanelElem:any, _backDropElem: any) => {

    _searchPanelElem.style.left = "-100%"
    _searchPanelElem.style.opacity = "0"

    _backDropElem.style.opacity = "0"
    _backDropElem.style.zIndex = "-100"

    setTimeout(() => {     
        document.body.style.overflow = ""
    }, 500)
}

const SearchBar = (
    {categories, searchBarOpened, setSearchBarOpened, submitSearchTerm}:
    {
        categories: CategoryType[],
        searchBarOpened: boolean,
        setSearchBarOpened: (value: boolean) => void,
        submitSearchTerm: any
    }
) => {

    console.log('!!!!!!!!!!#####   SearchBar Component render')
    console.log(categories)

    //
    const searhStore = useSelector(SearchStoreSelector)    
    const searchPanelElem = useRef(null)
    const backDropElem = useRef(null) 
    const [keywordValue, setKeywordValue] = useState(searhStore.searchTerm.keyword)
    const [selectedOrder, setSelectedOrder] = useState(searhStore.searchTerm.orderBy)
    const [selectedCategory, setSelectedCategory] = useState(searhStore.searchTerm.category as number[])
    const [checkedState, setCheckedState] = useState(
        new Array(categories.length).fill(false)
    );
    
    //
    const setCategorySearchTerm = useCallback((checked:boolean, value: number, index: number) => {        

        if(checked) {
            // add
            setSelectedCategory((prev: any) => {
                return [...prev, value]
            })
        }
        else {
            // remove
            setSelectedCategory((prev: any) => {
                const index = prev.indexOf(value)  
                const _prev = [...prev]
                _prev.splice(index, 1)      
                return [..._prev] as []
            })
        }

        setCheckedState((prev) => {        
            const newArr = prev.map((value, i) => i === index ? !value : value)
            console.log([...newArr])
            return [...newArr]
        })

    }, [])

    //
    const setSearchTerm = useCallback(() => {    

        const _searchTerm: searchTermType = {
            keyword: keywordValue,
            category: selectedCategory,
            orderBy: selectedOrder            
        }

        submitSearchTerm(_searchTerm)

    }, [keywordValue, selectedCategory, selectedOrder, submitSearchTerm])

    //
    useEffect(() => {        

        const _searchPanelElem = searchPanelElem.current
        const _backDropElem = backDropElem.current

        if(searchBarOpened) {
            openSearchPanel(_searchPanelElem, _backDropElem)
        }else {
            closeSearchPanel(_searchPanelElem, _backDropElem)
        }

    }, [searchBarOpened])

    useEffect(() => {        

        setCheckedState((prev) => {

            let _prev = [...prev]
            for(let i = 0; i < categories.length; i++) {
    
                const _category: CategoryType = categories[i]

                if(selectedCategory.indexOf(_category.id) > -1) {
                    _prev[i] = !_prev[i]
                }
            }

            return [..._prev]
        })        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div>
                <div ref={searchPanelElem} className={`transition-[left_opacity] duration-500 ease-in-out w-full md:w-[440px] h-screen bg-white fixed left-[-100%] top-0 z-[1000] opacity-0 bg-opacity-80 md:bg-opacity-100`}>
                    <div className="container mx-auto">
                        <div className="p-9">
                            <div className="flex justify-end">
                                <div onClick={() => {
                                    setSearchBarOpened(false)                                    
                                }} 
                                className="flex items-center justify-center w-[40px] h-[40px] bg-red-600 rounded-full" role="button">
                                    <FontAwesomeIcon icon={faClose} className="text-white text-xl"/>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg mb-4">ค้นหา</h4>
                                <input onChange={(e) => {
                                    setKeywordValue(e.target.value)
                                }} 
                                value={keywordValue}
                                type="text" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                            <div>                                
                                <CategoryList 
                                    categories={categories} 
                                    setCategorySearchTerm={setCategorySearchTerm} 
                                    checkedState={checkedState} />
                            </div>
                            <div className="my-4">
                                <OrderByList
                                    setSelectedOrder={setSelectedOrder}
                                    selectedOrder={selectedOrder} 
                                    OrderByEnum={OrderByEnum} />
                            </div>
                          
                            <button onClick={() => {
                                setSearchTerm()
                            }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ค้นหา</button>
                        </div>                    
                    </div>
                </div>

                <div ref={backDropElem} className="transition-[opacity] duration-300 ease-in-out bg-black bg-opacity-70 w-[100%] h-screen fixed top-0 left-0 opacity-0 z-[-100]"></div>

                <div className={`opacity-0 fixed z-[-500]${searchBarOpened ? '' : 'hidden'}`}>
                    <div></div>
                </div>
            </div>
        </>
    )

}

export default SearchBar