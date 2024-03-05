import { Project, User, queryProjectWithUserDetails } from "../interface/interfaces";
import { Attributes, ProjectWithUserDetails } from "../controller/resolverFunctions";
// import { verifyAndValidate } from "../controller/verificationAndValidation";
const projectWithUserDetails = new ProjectWithUserDetails()


const Resolvers = {
    Query: {
        // getAllUser: (_: any) => {
        //     const attributes = new Attributes<User>();
        //     return attributes.getAll('UserData')
        // },

        // getAllProject: () => {
        //     const attributes = new Attributes<Project>();
        //     return attributes.getAll('ProjectData')
        // },
        // getUser: (_: any, args: User) => {
        //     const attributes = new Attributes<typeof args>();

        //     return attributes.get('UserData', args)
        // },
        // getProject: (_: any, args: Project) => {
        //     const attributes = new Attributes<typeof args>();

        //     return attributes.get('ProjectData', args)
        // },
        getProjectWithUserDetails:(_: any,queryData: queryProjectWithUserDetails,context:any) =>{
            // console.log(createdBy)
            if(!context.user.id){
                return context.user
            }
            const projectDetails =projectWithUserDetails.getProject(queryData)
            // console.log('project details are ',projectDetails)
           return projectDetails
           
        }

    },
    ProjectUser:{
        user(parent:Project) {

            if(parent){
                const userDetails = projectWithUserDetails.getUser(parent)
                // console.log('UserData is ',userDetails)
                return userDetails
            }
        }
    },
    // Mutation: {
        // postUser: async (_: any, args: User) => {
        //     try {
        //         const VerifyAndValidate = new verifyAndValidate<typeof args>();
        //         const VerifyEmail = VerifyAndValidate.verifyEmail(args.email);
        //         const CheckUniquness = VerifyAndValidate.checkUniqueness('UserData', { "email": args.email })
        //         console.log(VerifyEmail);
        //         console.log('check uniqueness', CheckUniquness)
        //         if (VerifyEmail == false) {
        //             throw { response: "Invalid Email" }
        //         }
        //         else if (CheckUniquness) {
        //             throw { response: "Duplicate Email" }
        //         }
        //         else if (VerifyEmail && !CheckUniquness) {
        //             console.log('Iam here')
        //             const attributes = new Attributes<typeof args>();

        //             return { response: attributes.post('UserData', args) }
        //         }
        //     } catch (error) {
        //         return error
        //     }
        // },
        // postProject: async (_: any, args: Project) => {
        //     try {
        //         const VerifyAndValidate = new verifyAndValidate<typeof args>();
        //         const VerifyEmail = VerifyAndValidate.verifyEmail(args.name);
        //         const CheckUniquness = VerifyAndValidate.checkUniqueness('ProjectData', { "name": args.name })
        //         console.log(VerifyEmail);
        //         console.log('check uniqueness', CheckUniquness)

        //         if (CheckUniquness) {
        //             throw { response: "Duplicate Name" }
        //         }
        //         else if (!CheckUniquness) {
        //             console.log('Iam here')
        //             const attributes = new Attributes<typeof args>();

        //             return { response: attributes.post('ProjectData', args) }
        //         }
        //     } catch (error) {
        //         return error
        //     }
        // },
        // deleteUser: async (_:any, args: User)=>{
        //     try{

        //     }catch(error){
        //         return error
        //     }
        // }

    // }
};

    export default Resolvers;
