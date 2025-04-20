
export const isLoggedin=():boolean =>{
    return !!localStorage.getItem("token");
}