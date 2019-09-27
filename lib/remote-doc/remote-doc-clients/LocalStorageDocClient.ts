import * as fs from 'fs';
import { RemoteDocClient } from '../remote-doc-types/index';

export class LocalStorageDocClient implements RemoteDocClient {

    private fileBaseDirectory: string;

    constructor(filePath: string) {
        return this.init(filePath);
    }

    init(filePath: string): this {
        this.fileBaseDirectory = filePath;
        return this;
    }

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

    async downloadDocument(key: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileBaseDirectory + key + '.txt', (err: NodeJS.ErrnoException, data: Buffer) => {
                if(err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    };

    async deleteDocument(key: string) {};
}