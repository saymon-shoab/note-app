
import { authKey } from "@/constants/authKey"
import { setToLocalStorage , getFromLocalStorage, removeFromLocalStorage} from "@/utils/local_storage"


export const getUserInfo = ()=> {
    const authData = getFromLocalStorage(authKey)
    if(authData){
        return authData
    }else {
        return ""
    }
}

export const isLoggedIn = () => {
    const authData = getFromLocalStorage(authKey)
    return !!authData
}

export const logoutUser = (key) => {
    return removeFromLocalStorage(key)
}
