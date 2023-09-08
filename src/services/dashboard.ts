import { getCookie } from "typescript-cookie";
import API from "../utils/API"
const token = getCookie('token') || ''

export const dashboardService = {
  async getAllRuas({ per_page = 5, page = 1 }: { per_page: number, page: number }, token: string) {
    const request = await API
      .get(`/ruas?per_page=${per_page}&page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.data)
      .catch(console.error)
    if (!request?.data) null;
    return { ...request, success: true };
  },
  async getRuasPagination(endpoint: string, token: string) {
    const request = await API
      .get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.data)
      .catch(console.error)
    if (!request?.data) null;
    return { ...request, success: true };
  },

  async getOneRuas(id: string) {
    const request = await API
      .get(`/ruas/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.data)
      .catch(console.error)
    if (!request?.data) return null;
    return { ...request, success: true };
  },

  async postRuas(data: object) {
    const request = await API
      .post(`/ruas`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.data)
      .catch(console.error)
    if (!request) return null;
    return { ...request, success: true };
  },
  async updateRuas(id: string, data: object) {
    const request = await API
      .post(`/ruas/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.data)
      .catch(console.error)
    if (!request) return null;
    return { ...request, success: true };
  },
  async deleteRuas(id: string) {
    const request = await API
      .delete(`/ruas/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.data)
      .catch(console.error)
    if (!request) return null;
    return { ...request, success: true };
  },

  async getUnitKerja(token: string) {
    const request = await API
      .get(`/unit`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.data)
      .catch(console.error)
    if (!request?.data) null;
    return { ...request, success: true };
  }
}