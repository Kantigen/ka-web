import environment from 'app/environment';

test('environment mocks', () => {
  expect(environment.getApiKey()).toBe('anonymous');
  expect(environment.getAssetsUrl()).toBe('http://localhost:3002/');
  expect(environment.getServerUrl()).toBe('http://localhost:3001/');
});
