import { useSelector } from "react-redux";
import { RootState } from '../lib/store'

const Profile = () => {
    return <Me />
}

const Me = () => {    
    const store = useSelector((state: RootState) => state.authReducer)
    
    return (
        <>                        
            <div className="w-[80%] lg:container flex flex-col mx-auto">
                <h2 className="flex justify-center text-4xl">My Profile</h2>
                <hr className="my-9"/>
                <div className="flex justify-center">
                    {store.me && <ul className="list-disc">
                        <li>ID: {store.me.id}</li>
                        <li>Name: {store.me.name}</li>
                        <li>Email: {store.me.email}</li>
                    </ul>}
                </div>
            </div>

        </>
    )
}

export default Profile