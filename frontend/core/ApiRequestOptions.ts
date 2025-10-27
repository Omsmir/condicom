export type ApiRequestOptions<T = unknown> = {
    readonly method: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';
    readonly url: string;
    readonly headers?: Record<string, unknown>;
    readonly body?: any;
    readonly cookies?: Record<string, unknown>;
    readonly formData?: Record<string, unknown> | any[] | Blob | File | FormData
    readonly query?: Record<string, unknown>;
    readonly path?: Record<string, unknown>;
    readonly responseHeader?: string;
    readonly responseTransformer?: (data: unknown) => Promise<T>;
    readonly mediaType?: string;
};
