import axios from "axios";

const API_URL = 'http://localhost:3000/TenMila'

// הוספת Interceptor לתפיסת שגיאות
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  //User
  getByUserName: async (name) => {
    try {
      const result = await axios.get(`${API_URL}/User/${name}`,);
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung user:', error)
      throw error;
    }
  },

  getIsExistUser: async (name) => {
    try {
      const result = await axios.get(`${API_URL}/User/isExist/${name}`,);
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung user:', error)
      throw error;
    }
  },

  getUserDate: async (name) => {
    try {
      const result = await axios.get(`${API_URL}/User/date/${name}`,);
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung user date:', error)
      throw error;
    }
  },

  getUserIndex: async (name) => {
    try {
      const result = await axios.get(`${API_URL}/User/index/${name}`,);
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung user index:', error)
      throw error;
    }
  },

  getDailyWords: async (name) => {
    try {
      const result = await axios.get(`${API_URL}/User/dailyWords/${name}`,);
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung user dailyWords:', error)
      throw error;
    }
  },

  getLearnedWords: async (name) => {
    try {
      const result = await axios.get(`${API_URL}/User/learnedWords/${name}`,);
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung user learnedWords:', error)
      throw error;
    }
  },

  addUser: async (level, username, password) => {
    try {
      const result = await axios.post(`${API_URL}/User/${level}`, { username, password });
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung add user:', error)
      throw error;
    }
  },

  setDailyWords: async (name, words) => {
    try {
      const result = await axios.put(`${API_URL}/User/dailyWords/${name}`, {words});
      return result.data;
    }
    catch (error) {
      console.error('Error fetchung set user dailyWords:', error)
      throw error;
    }
  },

  setLearnedWords: async (name) => {
    try {
      const result = await axios.put(`${API_URL}/User/learnedWords/${name}`);
      return result.data;
    } catch (error) {
      console.error('Error fetchung set user learnedWords:', error)
      throw error;
    }
  },

  setDate: async (name) => {
    try {
      const result = await axios.put(`${API_URL}/User/date/${name}`);
      return result.data;
    } catch (error) {
      console.error('Error fetchung set user date:', error)
      throw error;
    }
  },

  //Word
  getWordsByIndex: async (index) => {
    try {
      const result = await axios.get(`${API_URL}/Word/words/${index}`,);
      return result.data;
    } catch (error) {
      console.error('Error fetchung get words:', error)
      throw error;
    }
  },
};
