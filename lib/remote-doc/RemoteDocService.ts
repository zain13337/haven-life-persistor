import { RemoteDocClient, RemoteDocConnection } from './remote-doc-types/index';

export class RemoteDocService {
    private remoteDocConnection: RemoteDocConnection;
    private remoteDocClient: RemoteDocClient;

    static new(remoteDocClient: RemoteDocClient) {
        return new RemoteDocService().init(remoteDocClient);
    }

    init(remoteDocClient: RemoteDocClient): this {
        this.remoteDocClient = remoteDocClient;
        this.remoteDocConnection = remoteDocClient.getConnection();
        return this;
    }

    uploadDocument(base64: string) {
        return this.remoteDocClient.uploadDocument(base64);
    }

    downloadDocument(key: string) {
        return this.remoteDocClient.downloadDocument(key);
    }

    deleteDocument(key: string) {
        return this.remoteDocClient.deleteDocument(key);
    }
}