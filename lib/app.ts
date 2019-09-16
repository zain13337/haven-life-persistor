import { RemoteDocService } from './remote-doc/RemoteDocService';

let blah = RemoteDocService.new('S3');

let mainTest = async () => {
    let uploadResult = await blah.uploadDocument('testing!', 'test-key', 'base64');
    console.log('upload result', uploadResult);

    let downloadResult = await blah.downloadDocument('test-key');
    console.log('download result', downloadResult, 'stringified doc result', downloadResult.Body.toString());
};

mainTest();

