import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: {
        _id: "9317d490-e30b-11eb-8327-51b3e539d68f",
        profilePicture: "person/steve-rogers.jpg",
        followers: [],
        followings: ["6894f4f0-e30b-11eb-8327-51b3e539d68f","864c39e0-e30b-11eb-8327-51b3e539d68f"],
        isAdmin: false,
        username: "Steve Rogers",
        email: "srogers@gmail.com",
        password: "$2b$10$UbF8E4LdSqf.42d3FED3w.Hu.zYqAKKMDYEJBygiB52onmkd4XJmi",
        desc: "I don't regret living in the past.",
        coverPicture: "",
        city: "New York",
        from: "Depok"
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}