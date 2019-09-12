import { RemoteDocService } from './remote-doc/RemoteDocService';

let blah = RemoteDocService.new('S3');

let uploadDoc = async () => {
    let result = await blah.uploadDocument('testing!', 'test-key');
    console.log("!!!", result);
};

uploadDoc();