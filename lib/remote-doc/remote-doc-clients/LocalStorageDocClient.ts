import { RemoteDocClient } from '../remote-doc-types/index';

export class LocalStorageDocClient implements RemoteDocClient {
    getConnection() {};
    uploadDocument() {};
    downloadDocument() {};
    deleteDocument() {};
}