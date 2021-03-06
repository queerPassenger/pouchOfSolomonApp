module.exports = function ({ config, mode }) {
    const { APP_NAME, SLUG, VERSION, VERSION_CODE, APP_OWNER, ICON_CREDITS, LOGO_CREDITS, EMAIL_SUPPORT, ANDROID_PACKAGE, GOOGLE_API_KEY, GOOGLE_CERTIFICATE_HASH, API_URL, ANDROID_CLIENT_ID, ANDROID_STANDALONE_APP_CLIENT_ID } = process.env;
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
            "versionCode": Number(VERSION_CODE),
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
            APP_NAME,
            API_URL,
            ANDROID_CLIENT_ID,
            ANDROID_STANDALONE_APP_CLIENT_ID,
            VERSION,
            APP_OWNER,
            ICON_CREDITS,
            LOGO_CREDITS,
            EMAIL_SUPPORT            
        }
    }
    return expoConfig;
}