import axios from 'axios';
import {URL_BACKEND} from '@env';
const baseUrl = URL_BACKEND;
export const signup = (email, pass, phone_number) => {
  const url = `${baseUrl}/auth/register`;
  return axios.post(url, {email, pass, phone_number});
};

export const login = (email, pass) => {
  const url = `${baseUrl}/auth`;
  return axios.post(url, {email, pass});
};

export const forgot = email => {
  const url = `${baseUrl}/auth/forgotpass`;
  return axios.post(url, {email});
};

export const forgotChangePass = (otp, newPass) => {
  const url = `${baseUrl}/auth/changepassforgot`;
  return axios.patch(url, {otp, newPass});
};
export const getProduct = (search, sort, category, limit, page) => {
  const url = `${baseUrl}/product?search=${search}&sort=${sort}&category=${category}&limit=${limit}&page=${page}`;
  return axios.get(url);
};

export const getDetail = id => {
  const url = `${baseUrl}/productdetail/${id}`;
  return axios.get(url);
};

export const addTransactions = (token, data, id) => {
  const url = `${baseUrl}/transactions/${id}`;
  return axios.post(url, data, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const editProfile = (token, file, body) => {
  const url = `http://192.168.100.32:8080/`;
  console.log('FILE IMAGE', file);
  const formData = new FormData();
  if (file !== '') {
    formData.append('image', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });
  }
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios.patch(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProfile = token => {
  const url = `http://192.168.100.32:8080/users`;
  return axios.get(url, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getHistory = token => {
  const url = `http://192.168.100.32:8080/history`;
  return axios.get(url, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const deleteHistory = (token, id) => {
  const url = `http://192.168.100.32:8080/history/${id}`;
  return axios.delete(url, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const changePass = (token, oldPass, newPassword) => {
  const body = {
    oldPass: oldPass,
    newPassword: newPassword,
  };
  const url = `http://192.168.100.32:8080/auth`;
  return axios.patch(url, body, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const editProduct = (token, id, file, body) => {
  const url = `http://192.168.100.32:8080/product/${id}`;
  console.log('FILE IMAGE', file);
  const formData = new FormData();
  if (file !== '') {
    formData.append('image', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });
  }
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios.patch(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createProduct = (token, file, body) => {
  const url = `http://192.168.100.32:8080/product`;
  console.log('FILE IMAGE', file);
  const formData = new FormData();
  if (file !== '') {
    formData.append('image', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });
  }
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = id => {
  const url = `http://192.168.100.32:8080/product/${id}`;
  return axios.delete(url);
};

export const createPromo = (code, discount) => {
  const body = {
    code: code,
    discount: discount,
  };
  const url = `http://192.168.100.32:8080/promo`;
  return axios.post(url, body);
};

export const getManageOrder = () => {
  const url = `http://192.168.100.32:8080/history/manage`;
  return axios.get(url);
};

export const patchManageOrder = (ids, status_id) => {
  const body = {
    status_id: status_id,
  };
  const url = `http://192.168.100.32:8080/history/${ids}`;
  return axios.patch(url, body);
};
