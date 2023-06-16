import { api } from './axiosCreate';

export async function makeConnections(email: string, options = {}) {
  const res = await api.post('/api/connections/new', { email }, options);
  return res.data;
}

export async function updateConnections(
  done: boolean,
  id: string,
  options = {}
) {
  const res = await api.put(`/api/connections/update/${id}`, { done }, options);
  return res.data;
}

export async function deleteConnection(id: string, options = {}) {
  const res = await api.delete(`/api/connections/delete/${id}`, options);
  return res.data;
}
