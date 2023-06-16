import { api } from './axiosCreate';

type DataMessage = { receiver: string; body: string };

export async function addMessage(data: DataMessage, options = {}) {
  const res = await api.post('/api/messages/add', data, options);
  return res.data;
}
export async function allMessage(id: string, options = {}) {
  const res = await api.get(`/api/messages/all/${id}`, options);
  return res.data;
}
