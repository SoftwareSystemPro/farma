export interface IResponse {
  message: string;
  url: string;
}

export interface IResponseWorkerPath<T> {
  results: T,
  message: {
    status: string,
    language: {
      "uz": string,
      "ru": string,
      "cyr": string
    }
  }
}