
import fs from 'fs';
import { Project, User, queryProjectWithUserDetails } from "../interface/interfaces";
import UserDataJSON from '../../DataFile/UserData.json';
import ProjectDataJSON from '../../DataFile/ProjectData.json';

export type DataType = Record<string, number>
export class Attributes<T>{
    private JSONData: T[];
    constructor(JSONData: T[]) {
    
        this.JSONData = JSONData
        console.log("Constructor is ",this.JSONData)
    }
    public getAll(): T[] | string {
      try{
          return this.JSONData
    } catch (error) {
        throw new Error("Error when creating a user: " + error);

    }
}

    get(JSONData:T[],args: Partial<T>): T[] | string {
        try {
            if (JSONData.length > 0) {
                return this.findData(JSONData,args)
            }
            return []
        } catch (error) {
            throw new Error("Error when creating a user: " + error);

        }
    }
    public post(JSONData:T[],JSONObject: string, args: T, UniqueObject: Partial<T>): boolean|string  {
        try {
            if (JSONData) {
                const uniquenessResult = this.checkUniqueness(JSONData,UniqueObject)
                if (uniquenessResult === false) {
                    console.log("before push",JSONData)
                    JSONData.push(args)
                    console.log("after push is ",JSONData)
                    return this.writeDataToJSON(JSONObject, JSONData)
                }
                else if (uniquenessResult === true) {
                    throw 'Duplicate Email found'

                }
                else
                    return uniquenessResult
            }
            // writing data to new file 

            if(this.writeDataToJSON(JSONObject, [args])){
                return true
            }
            throw 'Data not written'

        } catch (error) {
            throw new Error("Error when Posting a user: " + error);

        }
    }
    private writeDataToJSON(fileName: String, data: T[]): boolean| string {
        try {
            const JSONFilePath = './DataFile/' + fileName + '.json'

            fs.writeFile(JSONFilePath, JSON.stringify(data), function (err) {
                if (err) {
                    console.log(err)
                    throw err
                }
                console.log('Data posted')
            })
            return 'Data Posted'
        } catch (error) {
            throw new Error("Error when Writing a user: " + error);

        }
    }

    private findData<K extends keyof T>(JSONData:T[],obj: Partial<T>): T[]|string {
        try {
            if (Object.keys(JSONData).length > 0) {
                let tempUser: T[] | [] = [];
                const keys = Object.keys(obj);

                let i = keys.length - 1
                while (i >= 0) {
                    let key = keys[i] as K;
                    if (tempUser.length == 0) {
                        JSONData = JSONData.filter((user) => user[key] == obj[key])
                        // console.log(result)
                        if (JSONData == undefined) {
                            return []
                        }
                        tempUser = JSONData

                    }
                    else if (tempUser.length > 0) {
                        const result = tempUser.filter((user: T) => user[key] == obj[key])
                        if (result == undefined) {
                            return []
                        }
                        tempUser = result
                    }
                    i--
                }
                return tempUser
            }
            return []
        } catch (error) {
            throw new Error("Error when Finding a user: " + error);

        }
    }
    private checkUniqueness(JSONData:T[],UniqueObject: Partial<T>): boolean | string {
        try {
            if (UniqueObject) {
                if (JSONData.find((obj: T) => obj[Object.keys(UniqueObject)[0] as keyof T] == Object.values(UniqueObject)[0])) {
                    return true
                }
                else {
                    return false
                }

            }
            throw 'Invalid Object passed'

        } catch (error) {
            throw new Error("Error when Checking Unique: " + error);

        }
    }

}

export class ProjectWithUserDetails {
    projectName: string | undefined;
    createdBy: string | undefined;
    // constructor(projectName?: string, createdBy?: string) {
    //     if (projectName) {
    //         this.projectName = projectName
    //     }
    //     if (createdBy) {
    //         this.createdBy = createdBy
    //     }
    // }

    getProject(queryData: queryProjectWithUserDetails):Project[]|string {
        try {
            if (queryData.projectName) {
                this.projectName = queryData.projectName
            }
            if (queryData.createdBy) {
                this.createdBy = queryData.createdBy
            }
            // console.log(ProjectDataJSON)
            if (ProjectDataJSON.length > 0) {
                console.log('I am here')
                return ProjectDataJSON.filter((project) => {
                    if (this.createdBy) {
                        if (project.name == this.projectName && project.createdBy == this.createdBy) {
                            return project
                        }
                    }
                    else if (project.name == this.projectName) {
                        return project
                    }

                })
            }
            throw 'No Project Data Found'
            
        } catch (error) {
            throw new Error("Error when getting Project: " + error);

        }
    }
    getUser(projectData: any):User[] {
        try {
            return UserDataJSON.filter((userData) => (userData.email === projectData.createdBy))

        } catch (error) {
            throw new Error("Error when getting User: " + error);

        }
    }
}