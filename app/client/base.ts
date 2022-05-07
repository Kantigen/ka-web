import server from 'app/server';

type Module = 'empire' | 'body';

type Method = 'get_status';

class ClientBase {
  call(module: Module, method: Method, params: any, addSession = false): Promise<any> {
    return new Promise((resolve, reject) => {
      server.call({
        module,
        method,
        params,
        addSession,
        success: (res: any) => {
          resolve(res);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }
}

export default ClientBase;
