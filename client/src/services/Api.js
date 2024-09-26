const getAuthEmployee = () => localStorage.getItem('employee')
const apiFetch = async (endpoint, options = {}) => {

  const employee = getAuthEmployee();
  const token = employee ? JSON.parse(employee).token : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  
  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  return response;
};

export default apiFetch;
