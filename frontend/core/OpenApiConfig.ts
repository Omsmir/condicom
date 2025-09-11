import { config } from '@/config';
import { ApiRequestOptions } from './ApiRequestOptions';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type Headers = Record<string, string>;
type Middleware<T> = (value: T) => T | Promise<T>;
type Resolver<T> = (options: ApiRequestOptions<T>) => Promise<T>;

export class Interceptors<T> {
    _fns: Middleware<T>[];
    constructor() {
        this._fns = [];
    }

    eject(fn: Middleware<T>): void {
        const index = this._fns.indexOf(fn);
        if (index !== -1) {
            this._fns = [...this._fns.slice(0, index), ...this._fns.slice(index + 1)];
        }
    }

    use(fn: Middleware<T>): void {
        this._fns = [...this._fns, fn];
    }
}

export type OpenApiConfig = {
    BASE: string;
    HEADERS?: Headers | Resolver<Headers> | undefined;
    TOKEN?: Record<string, unknown> | Resolver<Record<string, unknown>> | undefined;
    ENCODE_PATH?: ((path: string) => string) | undefined;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    VERSION: string;
    interceptors: {
        request: Interceptors<AxiosRequestConfig>;
        response: Interceptors<AxiosResponse>;
    };
};

export const OpenApi: OpenApiConfig = {
    BASE: config.NEXT_PUBLIC_API_URL as string,
    VERSION: '0.1',
    CREDENTIALS: 'include',
    ENCODE_PATH: undefined,
    HEADERS: undefined,
    WITH_CREDENTIALS: false,
    TOKEN: undefined,
    interceptors: {
        request: new Interceptors(),
        response: new Interceptors(),
    },
};
