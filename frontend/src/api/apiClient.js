//const BASE_URL = "https://testadmin.competitivecracker.com/api/v1/";
const BASE_URL = "https://adminportal.competitivecracker.com/api/v1/";
async function apiRequest(endpoint, method = "GET", data = null) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  console.log(response);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export default apiRequest;
