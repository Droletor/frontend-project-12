const apiPath = import.meta.env.VITE_API_PATH || '/api/v1'

const apiRoutes = {
  loginPath: () => `${apiPath}/login`,
}

export default apiRoutes