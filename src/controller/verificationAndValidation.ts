import fs from 'fs';


// export function verifyAndValidate<T>(args: T): boolean {

// }
export class verifyAndValidate<T>{
    constructor() { }
    verifyEmail(email: string): boolean | Error {
        try {
            const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
            if (expression.test(email)) {
                return true
            }
            return false
        } catch (error) { return error as Error }
    }

    checkUniqueness(JSONObject: string, UniqueObject: Partial<T>): boolean | Error {
        try {
            if (UniqueObject) {
                const JSONFilePath = './src/' + JSONObject + '.json'
                const readJSONData = JSON.parse(fs.readFileSync(JSONFilePath, 'utf8'))
                if (fs.existsSync(JSONFilePath)) {
                    // const readJSONData = JSON.parse(fs.readFileSync(JSONFilePath, 'utf8'))
                    if (readJSONData.find((obj: T) => obj[Object.keys(UniqueObject)[0] as keyof T] == Object.values(UniqueObject)[0])) {
                        return true
                    }
                    else{
                        return false
                    }
                }
                throw `File doesnot exist in ${JSONFilePath}`
            }
            throw 'Invalid Object passed'

        } catch (e) {
            console.log("Error is ", e)
            return `CheckUniquness: ${e}` as unknown as Error
        }
    }
}
