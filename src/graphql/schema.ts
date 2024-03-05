import { gql } from "apollo-server-express"

const Schema = gql`
type Error {
    message: String
    error: String
}
type User {
    id : ID!
    firstName : String!
    surname : String!
    email : String!
    avatarUrl : String!
    createdAt : String
    updatedAt : String
}
type ProjectUser {
    id: ID
    name: String!
    description : String!
    createdBy : String!
    createdAt : String!
    updatedAt : String!
    user: [User!]
}
type Project {
    id: ID!
    name: String!
    description : String!
    createdBy : String!
    createdAt : String!
    updatedAt : String!
}
type response{
    response: String!
}

type Query {
    getProjectWithUserDetails(projectName: String!
            createdBy: String!):[ProjectUser]

}

    `;

export default Schema;
// type Query {
//     // getAllUser : [User] # will return multiple user instances
//     // getAllProject:[Project]
//     // getUser(firstName : String
//     //             surname : String
//     //             email : String
//     //             avatarUrl : String
//     //             createdAt : String
//     //             updatedAt : String): [User]
//     // getProject(name: String
//     //     description : String
//     //     createdBy : String
//     //     createdAt : String
//     //     updatedAt : String):[Project]
//     getProjectWithUserDetails(projectName: String!
//             createdBy: String!):[ProjectUser]

// }

// type Mutation {
//     postUser(id : ID!,
//         firstName : String!,
//         surname : String!,
//         email : String!,
//         avatarUrl : String!
//         ): response
//     postProject(id: ID!
//         name: String!
//         description : String!
//         createdBy : String!
//         createdAt : String!
//         updatedAt : String!):response
//     deleteUser(id : ID,
//         firstName : String,
//         surname : String,
//         email : String!,
//         avatarUrl : String
//         ): response
    
// }