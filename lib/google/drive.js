const { google } = require('googleapis');

module.exports = class Client {
    constructor(authClient) {
        ``;
        this._drive = google.drive({ version: 'v3', auth: authClient });
    }

    update(fileId, data) {
        return new Promise((resolve, reject) => {
            try {
                this._drive.files.update({
                    fileId,
                    media: {
                        mimeType: 'application/json',
                        body: data
                    }
                })
                    .then(file => resolve(file.data))
                    .catch(error => reject(error));
            } catch (error) {
                reject(error);
            }
        });
    }

    delete(fileId) {
        return new Promise((resolve, reject) => {
            try {
                this._drive.files.delete({
                    fileId
                })
                    .then(() => resolve())
                    .catch(error => reject(error));
            } catch (error) {
                reject(error);
            }
        });
    }

    create(fileName, data) {
        return new Promise((resolve, reject) => {
            var fileMetadata = {
                'name': fileName,
                'parents': ['appDataFolder']
            };
            var media = {
                mimeType: 'application/json',
                body: data
            };
            try {
                this._drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                })
                    .then(file => resolve(file.data))
                    .catch(error => reject(error));
            } catch (error) {
                reject(error);
            }
        });
    }

    get(fileId) {
        return new Promise((resolve, reject) => {
            try {
                this._drive.files.get({ fileId, alt: 'media' })
                    .then(file => resolve(file.data))
                    .catch(error => reject(error));
            } catch (error) {
                reject(error);
            }
        });
    }
};
