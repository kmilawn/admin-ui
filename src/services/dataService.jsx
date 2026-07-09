import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const goalService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    return response.data.data[0];
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};

export const expenseService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Full response:', response);
    console.log('Response data:', response.data);
    
    // Handle berbagai kemungkinan struktur data
    if (response.data && response.data.data) {
      return response.data.data;
    } else if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response.data) {
      // Jika response.data adalah object, coba ambil nilai pertamanya
      return Object.values(response.data)[0] || [];
    }
    
    return [];
  } catch (error) {
    console.error('Expense error detail:', error);
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg || "Gagal mengambil data expenses",
    };
  }
};

export const billService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};