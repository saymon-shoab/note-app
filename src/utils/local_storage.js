



export const setToLocalStorage = (key, token) => {
    if (!key || !token || typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(key, token);
};


export const getFromLocalStorage = (key) => {
    if(!key || typeof window == 'undefined'){
         return ""
        }
    return localStorage.getItem(key)
}


export const removeFromLocalStorage = (key) => {
    if(!key || typeof window == 'undefined'){
        return ""
       }
   return localStorage.removeItem(key)
}