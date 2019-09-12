export interface RemoteDocClient {
    uploadDocument(base64: string, key: string);
    downloadDocument(key: string);
    deleteDocument(key: string);
}