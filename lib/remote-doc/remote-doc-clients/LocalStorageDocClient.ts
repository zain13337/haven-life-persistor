import * as fs from 'fs';
import { RemoteDocClient } from '../remote-doc-types/index';

/**
 * mock remote object service - where we're writing these objects to the filesystem.
 */
export class LocalStorageDocClient implements RemoteDocClient {

    private fileBaseDirectory: string;

    constructor(filePath: string) {
        return this.init(filePath);
    }

    init(filePath: string): this {
        this.fileBaseDirectory = filePath;
        return this;
    }

    /**
     * upload a document to local fs.
     *
     * @param {string} obj
     * @param {string} key
     * @param {string} contentEncoding
     * @returns {Promise<any>}
     */
    async uploadDocument(obj: string, key: string, contentEncoding: string) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileBaseDirectory + key + '.txt', obj, { encoding: contentEncoding }, (err: NodeJS.ErrnoException) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        });
    };

    /**
     * read the document from the filesystem.
     *
     * @param {string} key
     * @returns {Promise<any>}
     */
    async downloadDocument(key: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileBaseDirectory + key + '.txt', (err: NodeJS.ErrnoException, data: Buffer) => {
                if(err) {
                    reject(err);
                }

                if(data) {
                    resolve(data.toString());
                } else {
                    resolve();
                }
            });
        });
    };

    /**
     * delete document from filesystem.
     *
     * @param {string} key
     * @returns {Promise<any>}
     */
    async deleteDocument(key: string) {
        return new Promise((resolve, reject) => {
            fs.unlink(this.fileBaseDirectory + key + '.txt', (err: NodeJS.ErrnoException) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    };
}