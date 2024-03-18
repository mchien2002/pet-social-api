const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const aws = require('aws-sdk')
const dotenv = require('dotenv').config()
const fs = require('fs')
const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const client = new SecretsManagerClient({
    region: process.env.AWS_REGION,
});
const s3Service = module.exports = {}
s3Service.s3Uploadv3 = async function (inputPath, fileName, filePath) {
    return new Promise(async (resolve, reject) => {
        const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
        const s3client = new S3Client()
        fs.readFile(inputPath, async (err, data) => {
            if (err) {
                reject(err)
            }
            const param = {
                Bucket: AWS_BUCKET_NAME,
                Key: `${filePath}/${fileName}`,
                Body: data,
            }
            await s3client.send(new PutObjectCommand(param))
            resolve()
            s3Service.deleteMulterFile(inputPath)
        })
    })
}

s3Service.s3Uploadv3New = async function (inputPath, fileName, filePath) {
    const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
    return new Promise(async (resolve, reject) => {
        const s3client = new S3Client()
        const param = {
            Bucket: AWS_BUCKET_NAME,
            Key: `${filePath}/${fileName}`,
            Body: inputPath,
        }
        await s3client.send(new PutObjectCommand(param))
        resolve()
    })
}



s3Service.deleteFilev3 = async function (filePath) {
    const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
    return new Promise(async (resolve, reject) => {
        try {
            const s3client = new S3Client()
            const deleteParam = {
                Bucket: AWS_BUCKET_NAME,
                Key: filePath
            }
            await s3client.send(new DeleteObjectCommand(deleteParam))
            console.log("Delete file successfully from AWS")
            resolve()
        } catch (error) {
            console.error(error)
            reject(error)
        }

    })
}

s3Service.getFile = async function (filePath) {
    const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
    return new Promise(async (resolve, reject) => {
        try {
            const s3 = new aws.S3()
            const downloadParam = {
                Bucket: AWS_BUCKET_NAME,
                Key: filePath
            }
            s3.getObject(downloadParam, function (err, data) {
                resolve(data)
            })
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

s3Service.deleteMulterFile = function (filePath) {
    if (filePath) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log('Error deleting media file:', err)
            } else {
                console.log('Media file deleted successfully.')
            }
        })
    }
}

s3Service.getSecretKey = async function (secretName) {
    let response;
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: process.env.SECRET_ID,
                VersionStage: "AWSCURRENT",
            })
        );
        const jsonResonse = JSON.parse(response.SecretString)
        return jsonResonse[secretName];
    } catch (error) {
        throw error;
    }
}