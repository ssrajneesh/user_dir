// const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// const s3Client = new S3Client({
//     region : "ap-south-1",
//     credentials : {
//         accessKeyId: "AKIAQEIYP3YMHJHF7ZNY",
//         secretAccessKey: "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"
//     }
// });

// async function getObjectURL(key) {
//     const command = new GetObjectCommand({
//         Bucket: "rajneeshcrud",
//         Key: key,
//     })
//     const url = await getSignedUrl(s3Client, command);
//     return url;
// }

// module.exports = { getObjectURL }