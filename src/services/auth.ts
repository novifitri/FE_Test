import API from "../utils/API"
import { removeCookie } from "typescript-cookie";

export const authService = {
  async login(data : Object) {
    const request = await API
                          .post('/login', data)
                          .then(res => res.data)
                          .catch(console.error)
    if(request.status === 422) return request?.response?.data
    return { ...request };
  },

  async logout(){
    removeCookie('token')
    // const request = await API
    //                         .post('/logout')
    //                         .then(res => res.data)
    //                         .catch(console.error)
    // if (!request?.access_token) return { exp: null, token: null, success: false };
    // return { ...request, success: true };
  }
}