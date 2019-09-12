import { RemoteDocService } from './remote-doc/RemoteDocService';

let blah = RemoteDocService.new('S3');

blah.uploadDocument('testing!', 'test-key');