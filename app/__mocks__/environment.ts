const environment = {
  getApiKey: jest.fn(() => 'anonymous'),
  getAssetsUrl: jest.fn(() => 'http://localhost:4000/'),
  getServerUrl: jest.fn(() => 'http://localhost:5000/'),
};

export default environment;
