import { RemoteDocClient } from '../remote-doc-types/index';
import {S3, config, AWSError} from 'aws-sdk';

export class S3RemoteDocClient implements RemoteDocClient {

    private S3Instance: S3;

    private async getConnection() {
        let newS3Instance = this.S3Instance;
        /*
            Request for reconnect if credentials are not set
                         OR
            Request for reconnect if connection is expired
        */

        // @TODO NICK figure out how to put this into config
        config.update({
            accessKeyId: "AKIASMGUUZMG7A4DN6GX",
            secretAccessKey: "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"
        });

        if (!this.hasCredentials() || (this.hasCredentials() && !this.isCredentialsValid())) {
            console.log("we DO need to make a new s3 instance");
            // const cfg = amorphicStatic.config;
            const endPoint = 'https://s3.amazonaws.com/' + 'test-bucket-persistor';

            newS3Instance = new S3({
                endpoint: endPoint,
                region: 'us-east-1',
                s3BucketEndpoint: true
            });

            newS3Instance.config.getCredentials((err: AWS.AWSError) => {
                if (err) {
                    console.log("we had an error! we needed a new S3 instance, but didn't get it", err.message);
                    throw new Error(err.message);
                } else {
                    console.log("we had NO errors, so we made a new S3 instance", newS3Instance);
                    this.S3Instance = newS3Instance;
                    return newS3Instance;
                }
            });
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
            Key: 'test-key',
            Body: 'testingonetwothreefour',
            ContentEncoding: 'base64'
        };

        const s3Conn = await this.getConnection();

        s3Conn.putObject(bucketParams, async (err: AWSError, data: S3.PutObjectRequest) => {
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