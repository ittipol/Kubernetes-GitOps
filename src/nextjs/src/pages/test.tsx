import {useEffect, useRef, useState, useMemo, useCallback} from 'react'
import UseToggle from '../hooks/UseToggle'
import styles from '@/styles/Home.module.css'

const getTimestampInSeconds = () => {
    return Math.floor(Date.now())
}

const Test = () => {


    console.log('Componet re-render')

    const progressBar = useRef(null);
    const timeoutRef = useRef(0);    
    // const timeoutRef = useRef(0);    
    const [i, setI] = useState(0) 
    const iValueRef = useRef(0);       
    const isItemListLoadingRef = useRef(false)
    const [target, setTarget] = useState(3000)
    const [category, setCategory] = useState([])

    const [key, count, plus] = UseToggle("ABCDFFFF", 1234)  
    
    useEffect(() => {
        console.log('>>>>>>>>>> in useEffect///')
    }, [])

    useEffect(() => {
        console.log('in useEffect => target: '+target)
    }, [target])

    useEffect(() => {
        console.log('in useEffect => isItemListLoadingRef: '+isItemListLoadingRef.current)
    }, [isItemListLoadingRef])
    


    // re-render every state value change
    const rnd = Math.floor(Math.random() * target)

    // use memo
    const rndWithUseMemo = useMemo(() => Math.floor(Math.random() * target)
        , [target])

    // re-render every state value change    
    const ts = getTimestampInSeconds()

    // cache function, not create new one when component re-render
    const setSelectedValue = useCallback((checked:boolean, value:number) => {
        
        if(checked) {
            // Add
            // paginationState.searchTerm.category.push(value)

            setCategory((prev) => {
                return prev.push(value)
            })
        }
        else {
            // remove'
            // const index = paginationState.searchTerm.category.indexOf(value)
            // console.log('index: ' +index)
            // paginationState.searchTerm.category.splice(index, 1)
        }

    }, [])

    const start = (_count: number) => {                 

        isItemListLoadingRef.current = true
        iValueRef.current = _count // lets you reference a value that’s not needed for rendering.

        // setI(_count) // will re-render value in jsx or tsx

        const percent = (_count/target) * 100

        const elem = progressBar.current
        elem.style.width = percent + '%'

        if(_count < target) {                                                

            const id = setTimeout(()=>{    
                
                // console.log(stop)

                start(_count + 1) 
            },1)
            
            timeoutRef.current = id
                
        }        

    }

    const stop = () => {
        const id = timeoutRef.current

        console.log(iValueRef.current)

        clearTimeout(id)
    }

    const clear = () => {        
        console.log('target clear')
    }

    const display = () => {
        console.log(progressBar)        
    }

    return (
        <>            
            <div className="container mx-auto flex flex-col">

                <div className="flex justify-center">
                    <div className="w-[80%] h-[40px] rounded-lg bg-gray-600 overflow-hidden my-5">
                        <div ref={progressBar} className="h-[100%] w-0 bg-green-600">
                        </div>                    
                    </div>
                </div>

                <div>
                    <div>
                    ===&gt;    i (state) = {i}
                    </div>
                    <div>
                    ===&gt;    iValueRef (ref) = {iValueRef.current}
                    </div>
                    <div>
                    ====&gt; isItemListLoadingRef = {isItemListLoadingRef.current ? 'TRUE' : 'FALSE'}    
                    </div>
                </div>
                <div>
                    <span>Target Value (State): {target}</span>
                    <input type="text" name="target"/>
                </div>

                <button onClick={() => {
                    setTarget(() => Math.floor(Math.random() * 3000))
                }}>
                    Set Target
                </button>

                <div>
                    Random: {rnd}
                </div>

                <div>
                    Random  =V  rndWithUseMemo[target]: {rndWithUseMemo}
                </div>

                <div>
                    Timestamp: {ts}
                </div>

                <button onClick={() => {
                    start(timeoutRef.current)
                }}>
                    Start
                </button>

                <button onClick={stop}>
                    stop
                </button>

                <button onClick={clear}>
                    clear
                </button>

                <button onClick={display}>
                    Display
                </button>

                <button onClick={()=>{
                    plus(1000)
                }}>
                    ++++++
                </button>
            </div>
        </>
    )

}

const ChildComponent = ({lists, setSelectedValue}) => {

    return (
        <div></div>
    )

}

export default Test