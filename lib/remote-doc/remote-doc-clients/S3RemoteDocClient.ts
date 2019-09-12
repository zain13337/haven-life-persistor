import { RemoteDocClient } from '../remote-doc-types/index';
import {S3, config, AWSError} from 'aws-sdk';

export class S3RemoteDocClient implements RemoteDocClient {

    private S3Instance: S3;

    private async getConnection() {
        /*
            Request for reconnect if credentials are not set
                         OR
            Request for reconnect if connection is expired
        */

        // @TODO NICK figure out how to put this into config
        config.update({
            accessKeyId: "",
            secretAccessKey: ""
        });

        if (!this.hasCredentials() || (this.hasCredentials() && !this.isCredentialsValid())) {
            console.log("we DO need to make a new s3 instance");
            // const cfg = amorphicStatic.config;
            const endPoint = 'https://s3.amazonaws.com/' + 'test-bucket-persistor';

            this.S3Instance = new S3({
                endpoint: endPoint,
                region: 'us-east-1',
                s3BucketEndpoint: true
            });

            return this.S3Instance;
        } else {
            console.log("we DO NOT need to make a new s3 instance");
            return this.S3Instance;
        }
    };

    // TODO nick implement these
    public async uploadDocument(base64, key) {
        const bucketName = 'test-bucket-persistor';
        // const lengthOfbase64 = base64.length;
        // const lengthOfPadding = (lengthOfbase64 > 1) ? ((base64[lengthOfbase64 - 1] === '=') ? ((base64[lengthOfbase64 - 2] === '=') ? 2 : 1) : 0) : 0;
        // const contentLength = ((3 * (lengthOfbase64 / 4)) - (lengthOfPadding));  // (3 * (LengthInCharacters / 4)) - (numberOfPaddingCharacters) = length in bytes ; paddingCharacters are usually "=="

        const bucketParams: S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: 'test-key2',
            Body: 'testingonetwothreefour',
            ContentEncoding: 'base64'
        };

        const s3Conn = await this.getConnection();

        (<AWS.S3>s3Conn).putObject(bucketParams, async (err: AWSError, data: S3.PutObjectRequest) => {
            if (err) {
                throw new Error(err.message);
            }

            return data;
        });
    };

    downloadDocument() {};
    deleteDocument() {};

    private hasCredentials(): boolean {
        console.log("do we have credentials?", this.S3Instance && this.S3Instance.config && Boolean(this.S3Instance.config.credentials));
        return this.S3Instance && this.S3Instance.config && Boolean(this.S3Instance.config.credentials);
    }

    private isCredentialsValid(): boolean {
        console.log("are the credentials valid?", !(<AWS.Credentials>this.S3Instance.config.credentials).expired);
        return !(<AWS.Credentials>this.S3Instance.config.credentials).expired;
    }
}