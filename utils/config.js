const env = Object.create(process.env);

const googleClientId = env.REACT_APP_GOOGLE_CLIENT_ID;
const googleClientSecret = env.REACT_APP_GOOGLE_CLIENT_SECRET;
const googleRedirectUris = env.REACT_APP_GOOGLE_REDIRECT_URIS;

export const credentials = {
	googleClientId: googleClientId,
	googleClientSecret: googleClientSecret,
	googleRedirectUris: googleRedirectUris,
};
