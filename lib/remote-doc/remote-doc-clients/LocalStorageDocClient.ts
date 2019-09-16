import { RemoteDocClient } from '../remote-doc-types/index';

export class LocalStorageDocClient implements RemoteDocClient {
    uploadDocument(base64: string, key: string, contentEncoding: string) {};
    downloadDocument(key: string) {};
    deleteDocument(key: string) {};
}