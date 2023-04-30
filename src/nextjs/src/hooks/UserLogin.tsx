import {useRef, useState} from 'react'

const UseLogin = () => {

    const [count, setCount] = useState(0)

    const isAuth = true

    const show = (message: string) => {
        alert(message)
    }

    const set = () => {
        setCount((prev) => {
            return prev + 1
        })
    }

    return [isAuth, show, count]
}

export default UseLogin