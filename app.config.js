module.exports = function ({ config, mode }) {
    const { APP_NAME, SLUG, VERSION, ANDROID_PACKAGE, GOOGLE_API_KEY, GOOGLE_CERTIFICATE_HASH, API_URL, ANDROID_CLIENT_ID, ANDROID_STANDALONE_APP_CLIENT_ID } = process.env;
    const expoConfig = {
        "name": APP_NAME,
        "slug": SLUG,
        "version": VERSION,
        "orientation": "portrait",
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "icon": "./assets/images/app-icon.png",
        "assetBundlePatterns": [
            "**/*"
        ],
        "android": {
            "package": ANDROID_PACKAGE,
            "versionCode": 1,
            "config": {
                "googleSignIn": {
                    "apiKey": GOOGLE_API_KEY,
                    "certificateHash": GOOGLE_CERTIFICATE_HASH
                }
            }
        },
        "web": {

        },
        "extra": {
            API_URL,
            ANDROID_CLIENT_ID,
            ANDROID_STANDALONE_APP_CLIENT_ID
        }
    }
    return expoConfig;
}