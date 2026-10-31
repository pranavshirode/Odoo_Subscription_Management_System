import axios from 'axios'

export const apiClient = axios.create({ baseURL: '/api', timeout: 10000 })
export const createResourceService = (resource) => ({
  list: () => apiClient.get(`/${resource}`),
  get: (id) => apiClient.get(`/${resource}/${id}`),
  create: (payload) => apiClient.post(`/${resource}`, payload),
  update: (id, payload) => apiClient.put(`/${resource}/${id}`, payload),
  remove: (id) => apiClient.delete(`/${resource}/${id}`),
})
