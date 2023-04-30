import {useRef, useState} from 'react'

const UseToggle = (_key:string, data: number) => {

    const [count, setCount] = useState(data)
    const [key, setKey] = useState(_key)

    const toggle = (_value: boolean) => {        
        return !_value
    }

    const plus = (_data:number = 1) => {

        setCount((prev)=>{
    
            setKey(prev.toString().length.toString())

            return prev + _data
        })

    }

    return [key, count, plus]
}

export default UseToggle