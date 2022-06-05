import server, { addSession, createBody, createUrl } from 'app/server';
import SessionStore from 'app/stores/session';

const SESSION_ID = 'test-session';

beforeEach(() => {
  SessionStore.update(SESSION_ID);
});

test('it should add a session to the request', () => {
  expect(
    addSession({ module: 'empire', method: 'get_status', params: [], addSession: true })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: [SESSION_ID],
    addSession: true,
  });

  expect(
    addSession({ module: 'empire', method: 'get_status', params: {}, addSession: true })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: { session_id: SESSION_ID },
    addSession: true,
  });

  SessionStore.update('');

  expect(
    addSession({ module: 'empire', method: 'get_status', params: [], addSession: true })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: [],
    addSession: true,
  });

  expect(
    addSession({ module: 'empire', method: 'get_status', params: {}, addSession: true })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: {},
    addSession: true,
  });
});

test('it should not add a session to the request when addSession is false', () => {
  expect(
    addSession({ module: 'empire', method: 'get_status', params: [], addSession: false })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: [],
    addSession: false,
  });

  expect(
    addSession({ module: 'empire', method: 'get_status', params: {}, addSession: false })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: {},
    addSession: false,
  });

  SessionStore.update('');

  expect(
    addSession({ module: 'empire', method: 'get_status', params: [], addSession: false })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: [],
    addSession: false,
  });

  expect(
    addSession({ module: 'empire', method: 'get_status', params: {}, addSession: false })
  ).toMatchObject({
    module: 'empire',
    method: 'get_status',
    params: {},
    addSession: false,
  });
});

test('it should create a valid request body', () => {
  expect(
    createBody({ module: 'body', method: 'get_buildings', params: ['body-id'], addSession: true })
  ).toMatchObject({
    jsonrpc: '2.0',
    id: 1,
    method: 'get_buildings',
    params: ['body-id'],
  });
});

test('it should create a valid url', () => {
  expect(
    createUrl({ module: 'body', method: 'get_buildings', params: ['body-id'], addSession: true })
  ).toBe('http://localhost:3001/body');
});

// test('calling a known server function should return a known response', (done) => {
//   server.call({
//     module: 'empire',
//     method: 'login',
//     addSession: false,
//     params: ['empire-name', 'password'],
//     success: (res: any) => {
//       expect(res.session_id).toBe('this-is-a-session-id');
//       expect(res.status).toBeDefined();
//       done();
//     },
//   });
// });

// test('calling an unknown server function should trigger the error handling', (done) => {
//   server.call({
//     module: 'unknown-module',
//     method: 'unknown-method',
//     addSession: true,
//     params: [],
//     error: (error: any) => {
//       expect(error.message).toBe('Invalid request.');
//       expect(error.data).toBeNull();
//       done();
//     },
//   });
// });
