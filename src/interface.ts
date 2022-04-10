export interface ITransResult {
  src: string;
  dst: string;
}

export interface ITransResponse {
  from: string;
  to: string;
  trans_result: ITransResult[];
  error_code?: string;
  error_msg?: string;
}

export interface IRequestParams {
  q: string;
  from: string;
  to: string;
  appid: string;
  salt: number;
  sign: string;
}

export interface IMap {
  [key: string]: string;
}
