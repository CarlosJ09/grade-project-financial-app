import axios from 'axios';

const agentApi = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_AGENT_API_URL}/api/v1`,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 60000, // 60 seconds - LLM responses can take time, especially on first request
});

agentApi.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    const originalRequest = error.config;

    console.log(
      'AGENT API ERROR',
      `PATH: ${originalRequest.url}`,
      `STATUS: ${error.response?.status}`
    );

    return Promise.reject(error);
  }
);

export default agentApi;
