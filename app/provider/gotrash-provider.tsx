import axios, {AxiosInstance} from 'axios';
import {ChildrenProps} from '../types/children-only';
import goTrashContext from '../contexts/gotrash-context.tsx';
import {useState} from 'react';
import {BackendResponse} from '../types/backend-response';
import {User} from '../types/user';
import React from 'react';
function createAxiosInstance(token: string | null): AxiosInstance {
  return axios.create({
    baseURL: 'https://gotrash.site/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}

let api = createAxiosInstance(null);

export function GoTrashProvider({children}: ChildrenProps) {
  const [user, setUser] = useState<User>();

  async function guestLogin(): Promise<User | null> {
    const response = await api.post<BackendResponse<User>>('/user/addGuest');
    if (response?.data?.data) {
      setUser(response.data.data);
      // !TODO: If token already returned by aduy
      // setApi(createAxiosInstance(response.data.data.token));
      return response.data.data;
    }
    return null;
  }

  function logout() {}

  return (
    <goTrashContext.Provider value={{guestLogin, user, logout}}>
      {children}
    </goTrashContext.Provider>
  );
}
