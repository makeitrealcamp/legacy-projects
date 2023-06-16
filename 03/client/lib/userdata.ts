import { api } from './axiosCreate';

export async function fetchUserData(options = {}) {
  const res = await api.get(`/api/users/datauser`, options);
  return res.data;
}

export async function thirdPartAuth(
  email: string | undefined,
  name: string | undefined
) {
  const data = { email, name };
  const res = await api.post(`/api/users/auth0`, data);
  return res.data;
}

export async function updatedSettings(data: FormData | {}, options = {}) {
  const res = await api.post(`/api/users/update-avatar`, data, options);
  return res.data;
}
export async function updatedSettingsRegular(data: {}, options = {}) {
  const res = await api.put(`/api/users/update-regular`, data, options);
  return res.data;
}
