import { Schema, Validator } from "jsonschema";

const validate = new Validator();


const ReqBodyValidationService = <T>(body: T, PostSchema: Schema):string[]|string => {
    try{
    const validationResult = validate.validate(body, PostSchema);
    if (validationResult.errors.length > 0) {
        const errorStack = validationResult.errors.map((error: any) => {
            if (error.stack.includes("[subschema 0]")) { return 'Provide atleast one valid arguments' }
            return error.stack
        })
        return errorStack
    }          
    return []

}catch(error){
    throw new Error('Validation Error:'+error)
}
}

export { ReqBodyValidationService }