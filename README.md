# Tech Test for Seenit Backend Role

Create the following  
1. Users service which holds user data, containing at least the following
```
    {
    firstName,
    surname,
    email,
    avatarUrl,
    createdAt,
    updatedAt
    }
```
3. Projects service which holds project data, containing at least the following
```   
    {
       name,
       description,
       createdBy,
       createdAt,
       updatedAt
   }
```
## Acceptance Criteria
1. Users service
    1. RESTFul CRUD
    2. Ensure the email is unique and a valid format
2. Projects service
    1. RESTFul CRUD
    2. Ensure name is unique
3. Use GQL to combine or other tools to retrieve
    1. Projects with details of users who created them

Notes for the solution:
- The graphql instance can be called from any domain
- Its ok to mock the data rather than using a data store
- Consider how to generate docs for the services
- How would you ensure only allowed users can see the endpoints
- Consider using best practice for creating services

## Submitting test
Fork the repo into your own GitHub account and share the link with ian@seenit.io
