const { google } = require("googleapis");

module.exports = class Client {
	constructor(authClient) {
		``;
	}

	getGoogleAuthURL() {
		/*
		 * Generate a url that asks permissions to the user's email and profile
		 */
		const scopes = [
			"https://www.googleapis.com/auth/drive.appdata",
			"https://www.googleapis.com/auth/userinfo.email",
		];

		return authClient.generateAuthUrl({
			access_type: "offline",
			prompt: "consent",
			scope: scopes, // If you only need one scope you can pass it as string
		});
	}

	processAuthCode(code) {
		return new Promise((resolve, reject) => {
			authClient.getToken(code, (err, token) => {
				if (err) {
					reject(err);
				} else {
					authClient.setCredentials(token);
					resolve(token);
				}
			});
		});
	}
};
