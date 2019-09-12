import { RemoteDocClient } from '../remote-doc-types/index';
import { S3, config, AWSError } from 'aws-sdk';

export class S3RemoteDocClient implements RemoteDocClient {

    private S3Instance: S3;

    private async getConnection() {

        if (!this.hasCredentials() || (this.hasCredentials() && !this.isCredentialsValid())) {
            // @TODO remove hard coding
            const endPoint = 'https://s3.amazonaws.com/' + 'test-bucket-persistor';

            // @TODO make this config driven
            config.update({
                accessKeyId: "",
                secretAccessKey: ""
            });

            this.S3Instance = new S3({
                endpoint: endPoint,
                region: 'us-east-1',
                s3BucketEndpoint: true
            });

            return this.S3Instance;
        } else {
            return this.S3Instance;
        }
    };

    // TODO nick implement these
    public async uploadDocument(base64, key): Promise<S3.PutObjectOutput> {
        const bucketName = 'test-bucket-persistor';

        const bucketParams: S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: 'test-key2',
            Body: 'testingonetwothreefour',
            ContentEncoding: 'base64'
        };

        const s3Conn = await this.getConnection();

        return new Promise((resolve, reject) => {
            (<AWS.S3>s3Conn).putObject(bucketParams, async (err: AWSError, data: S3.PutObjectOutput) => {
                if (err) {
                    reject(err.message);
                }

                console.log('data', data);

                return resolve(data);
            });
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