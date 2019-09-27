export type PersistorTransaction = {
    id: number,
    dirtyObjects: object,
    savedObjects: object,
    touchObjects: object,
    deletedObjects: object,
    remoteObjects: object // identifiers for objects not stored directly in our db
    deleteQueries: {}
};