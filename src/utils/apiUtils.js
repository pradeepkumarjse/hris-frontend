import Cookies from 'js-cookie'; 

const BASE_URL = 'https://app.pradeeptech.info';



const getAccessToken = () => Cookies.get('accessToken');



const handleHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const accessToken = getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

const apiGet = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: handleHeaders(),
  });
  return handleResponse(response);
};

const apiPost = async (url, data) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: handleHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const apiDelete = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: handleHeaders(),
  });
  return handleResponse(response);
};

const apiPut = async (url, data) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: handleHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};


// eslint-disable-next-line perfectionist/sort-named-exports
export { apiDelete, apiGet, apiPost, apiPut };
