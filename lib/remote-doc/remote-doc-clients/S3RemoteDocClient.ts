import { RemoteDocClient } from '../remote-doc-types/index';
import { S3, config, AWSError } from 'aws-sdk';

export class S3RemoteDocClient implements RemoteDocClient {

    private S3Instance: S3;

    /**
     * establish connection to s3
     *
     * @returns {Promise<S3>}
     */
    private async getConnection(): Promise<S3> {

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

    /**
     * placing a document in S3 storage.
     * handles both `create` and `update` scenarios.
     *
     * @param s3ObjectToBeUploaded - the specific item being uploaded to s3
     * @param {string} key - the unique identifier for this item within its s3 bucket
     * @param {string} contentEncoding - encoding of the item
     * @returns {Promise<S3.PutObjectOutput>} - standard aws result object following an s3 upload
     */
    public async uploadDocument(s3ObjectToBeUploaded: string, key: string, contentEncoding: string): Promise<S3.PutObjectOutput> {
        const bucketName = 'test-bucket-persistor';

        const bucketParams: S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: key,
            Body: s3ObjectToBeUploaded,
            ContentEncoding: contentEncoding
        };

        const s3Conn = await this.getConnection();

        return new Promise((resolve, reject) => {
            (<AWS.S3>s3Conn).putObject(bucketParams, async (err: AWSError, data: S3.PutObjectOutput) => {
                if (err) {
                    return reject(err.message);
                } else {
                    return resolve(data);
                }
            });
        });
    };

    downloadDocument() {};
    deleteDocument() {};

    private hasCredentials(): boolean {
        return this.S3Instance && this.S3Instance.config && Boolean(this.S3Instance.config.credentials);
    }

    private isCredentialsValid(): boolean {
        return !(<AWS.Credentials>this.S3Instance.config.credentials).expired;
    }
}