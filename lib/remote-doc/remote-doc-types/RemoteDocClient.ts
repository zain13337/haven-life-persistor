export interface RemoteDocClient {
    uploadDocument(base64: string, key: string, contentEncoding: string);
    downloadDocument(key: string);
    deleteDocument(key: string);
}