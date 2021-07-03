import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: {
        _id: "60dcf803e5fcc32158b11a09",
        profilePicture: "person/steve-rogers.jpg",
        followers: [],
        followings: ["60dcc8c07eaf96126875efdf", "60dcd18c8f5eb214507b430a"],
        isAdmin: false,
        username: "Steve Rogers",
        email: "srogers@gmail.com",
        password: "$2b$10$dGdyMxqokn8yrTh7aHnsOeV0ix/S2NOyQVh5uDroyEfeyF4tJm9RC",
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