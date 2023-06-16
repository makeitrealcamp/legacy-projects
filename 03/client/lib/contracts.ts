import { AllSongs, RehearsalDate } from '../pages/stepper-contract';
import { api } from './axiosCreate';

type Artists = { label: string; value: string }[];

export async function makeContracts(
  artists: Artists,
  name: string,
  options = {}
) {
  const res = await api.post('/api/contracts/new', { artists, name }, options);
  return res.data;
}

export async function updateContract(
  time: Date | null,
  schedule: Date | null,
  contracts: any[],
  recommendations: string,
  repertoire: AllSongs,
  options = {}
) {
  const contractData = {
    time,
    schedule,
    contracts,
    recommendations,
    repertoire,
  };
  const res = await api.put('/api/contracts/update', contractData, options);
  return res.data;
}

export async function lastUpdateContract(
  price: number | undefined = 37,
  rehearsalSchedule: RehearsalDate,
  address: string,
  addressInfo: string,
  contracts: any[],
  options = {}
) {
  const data = {
    price,
    rehearsalSchedule,
    address,
    addressInfo,
    contracts,
  };
  const res = await api.put('/api/contracts/last-update', data, options);
  return res.data;
}

export async function acceptContract(id: string, options = {}) {
  const res = await api.put(
    `/api/contracts/accept/${id}`,
    { isAccepted: true },
    options
  );
  return res.data;
}

export async function deleteContract(id: string, options = {}) {
  const res = await api.delete(`/api/contracts/delete/${id}`, options);
  return res.data;
}
