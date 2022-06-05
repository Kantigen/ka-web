const environment = {
  getApiKey: jest.fn(() => 'anonymous'),
  getAssetsUrl: jest.fn(() => 'http://localhost:3002/'),
  getServerUrl: jest.fn(() => 'http://localhost:3001/'),
};

export default environment;
