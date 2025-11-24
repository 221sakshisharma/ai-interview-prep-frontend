import {createContext, useState, useEffect} from "react"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

export const UserContext = createContext();

const UserProvider = ({ children}) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const accessToken = localStorage.getItem("token");

        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE)
                setUser(response.data);
            } catch(err) {
                console.log(err.response?.data?.message || err.message)
                clearUser();
            } finally {
                setLoading(false)
            }
        }


        fetchUser();
    }, []);


    // updating user when request is coming from login or sign up
    const updateUser = (userData) => {
        setUser(userData.user);

        localStorage.setItem("token", userData.token);

        setLoading(false);
    }

    const clearUser = () => {

        setUser(null);
        
        localStorage.removeItem("token");
    }


    return (
        <UserContext.Provider value={{user, loading, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>    
    )
}

export default UserProvider
