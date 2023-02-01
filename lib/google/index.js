const { google } = require("googleapis");
const { credentials } = require("../../utils/config");

const SCOPES = ["https://www.googleapis.com/auth/drive.appdata"];

//create google auth client
const authClient = new google.auth.OAuth2(
	credentials.googleClientId,
	credentials.googleClientSecret,
	credentials.googleRedirectUris
);
