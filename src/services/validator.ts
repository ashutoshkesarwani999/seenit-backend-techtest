import { Schema } from "jsonschema"

export const UserPostSchema: Schema = {
    "id": "/UserSchema",
    "type": "object",
    "title":"User",
    "properties": {
        "firstName": { "type": "string" },
        "surname": { "type": "string" },
        "email": { "type": "string" ,"format":"email"},
    },
    "required": ["firstName", "surname", "email"],
    "additionalProperties": false
}

export const ProjectPostSchema: Schema = {
    "type": "object",
    "properties": {
        "name":  { "type": "string" },
        "description":  { "type": "string" },
        "createdBy":  { "type": "string" },
    },
    "required": ["name", "description", "createdBy"],
    "additionalProperties": false
}



export const UserGetSchema: Schema = {
    "id": "/UserSchema",
    "type": "object",
    "title":"User",
    "minLength":1,
    "properties": {
        "firstName": { "type": "string" },
        "surname": { "type": "string" },
        "email": { "type": "string" ,"format":"email"},
        "avatarUrl":{"type": "string" },
        "createdAt":{"type": "string" },
        "updatedAt":{"type": "string" }
    },
    "anyOf": [
        {
            "required": [
                "firstName"
            ]
        },
        {
            "required": [
                "surname"
            ]
        },
        {
            "required": [
                "email"
            ]
        },
        {
            "required": [
                "avatarUrl"
            ]
        },
        {
            "required": [
                "createdAt"
            ]
        },
        {
            "required": [
                "updatedAt"
            ]
        }
    ],
    "additionalProperties": false
}


export const ProjectGetSchema: Schema = {
    "type": "object",
    "properties": {
        "name":  { "type": "string" },
        "description":  { "type": "string" },
        "createdBy":  { "type": "string" },
        "createdAt":{"type": "string" },
        "updatedAt":{"type": "string" }
    },
    "anyOf": [
        {
            "required": [
                "name"
            ]
        },
        {
            "required": [
                "description"
            ]
        },
        {
            "required": [
                "createdBy"
            ]
        },
        {
            "required": [
                "createdAt"
            ]
        },
        {
            "required": [
                "updatedAt"
            ]
        }
    ],
    "additionalProperties": false
}
