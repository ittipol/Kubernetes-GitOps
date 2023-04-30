import UsePagination from '../hooks/UsePagination'
import { useState } from 'react'
import { useSelector } from 'react-redux'
// import Link from 'next/link'
import SearchBar from '../components/SearchBar'
import CardList from '../components/CardList'
import Loading from '../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { SearchStoreSelector } from '../lib/slices/search'
import { CategoryType } from '../models/entity'

const ItemList = ({ categories }:{ categories: CategoryType[]}) => {
    
    console.log('!!!!   ItemList Component render')

    const {prevPage ,nextPage, submitSearchTerm} = UsePagination()
    const [searchBarOpened, setSearchBarOpened] = useState(false)   
    const searhStore = useSelector(SearchStoreSelector)

    return(
        <>
            <div>
                <div className="flex container mx-auto justify-center mb-9">
                    <button onClick={() => {
                        setSearchBarOpened(true)    
                    }} 
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white block">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-sm mr-2"/> ค้นหา
                        </span>
                    </button>
                </div>

                <div className="flex flex-col">
                    {

                        !searhStore.isLoading                        
                        ?
                            searhStore.itemList.length > 0
                            ? 
                                <>
                                    <CardList itemList={searhStore.itemList} />

                                    <div className="mx-auto mt-[70px] shadow-xl">
                                        <div className="flex justify-between bg-blue-600 rounded-[20px] overflow-hidden">
                                            <button onClick={prevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Prev
                                            </button>
                                            <div className="mx-6">
                                                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[50%] text-xl text-white">{searhStore.currentPage}</div>
                                            </div>
                                            <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </>
                            : 
                            
                                <div className="flex justify-center items-center h-[400px]">
                                    <div className="py-6 px-6 md:px-[240px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No item found</h5>                                        
                                    </div>
                                </div>
                        :
                            <Loading />
                    }
                    
                </div>

                {<SearchBar
                    categories={categories}
                    searchBarOpened={searchBarOpened}
                    setSearchBarOpened={setSearchBarOpened}
                    submitSearchTerm={submitSearchTerm}
                />}
            </div>
        </>
    )

}

export default ItemList