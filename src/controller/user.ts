import crypto from 'crypto';


export function generateAvatarUrl(email:string) {
    const defaultImage = "identicon";
    const emailHash = crypto
        .createHash("md5")
        .update(email)
        .digest("hex");
    return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}`;
}