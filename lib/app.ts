import { RemoteDocService } from './remote-doc/RemoteDocService';

// let s3RemoteClient = RemoteDocService.new('S3');
//
// let s3Test = async () => {
//     let uploadResult = await s3RemoteClient.uploadDocument('testing!', 'test-key', 'base64');
//     console.log('upload result', uploadResult);
//
//     let downloadResult = await s3RemoteClient.downloadDocument('test-key');
//     console.log('download result', downloadResult, 'stringified doc result', downloadResult.Body.toString());
// };
//
// s3Test();

// let localRemoteClient = RemoteDocService.new('local');
//
// let localTest = async () => {
//     try {
//         let uploadResult = await localRemoteClient.uploadDocument('testing!', 'test-key', 'ascii');
//         console.log('upload result', uploadResult);
//     } catch (e) {
//         console.log('error happened during uploading', e);
//     }
//
//     try {
//         let downloadResult = await localRemoteClient.downloadDocument('test-key');
//         console.log('download result', downloadResult, 'stringified doc result', downloadResult.toString());
//     } catch (e) {
//         console.log('error happened during downloading', e);
//     }
// };
//
// localTest();