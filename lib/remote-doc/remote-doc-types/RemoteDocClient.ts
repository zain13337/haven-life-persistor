export interface RemoteDocClient {
    getConnection();
    uploadDocument(base64: string);
    downloadDocument(key: string);
    deleteDocument(key: string);
}