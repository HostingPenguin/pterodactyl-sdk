import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class RestClient {
    private client: AxiosInstance;

    /**
     * Creates an instance of the rest client.
     * @param {import("axios").AxiosRequestConfig} config
     */
    constructor(config: AxiosRequestConfig) {
        this.client = axios.create(config);
    }

    /**
     * HTTP GET method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - path you want to make a request to.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    public get<T, R = AxiosResponse<T>>(path: string): Promise<R> {
        return this.client.get(path);
    }

    /**
     * HTTP delete method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - path you want to make a request to.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    public delete<T, R = AxiosResponse<T>>(path: string): Promise<R> {
        return this.client.delete(path);
    }

    /**
     * HTTP POST method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - path you want to make a request to.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    public post<T, B, R = AxiosResponse<T>>(path: string, data?: B): Promise<R> {
        return this.client.post(path, data);
    }

    /**
     * HTTP PUT method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - path you want to make a request to.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    public put<T, B, R = AxiosResponse<T>>(path: string, data?: B): Promise<R> {
        return this.client.put(path, data);
    }

    /**
     * HTTP PATCH method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - path you want to make a request to.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    public patch<T, B, R = AxiosResponse<T>>(path: string, data?: B): Promise<R> {
        return this.client.patch(path, data);
    }
}
