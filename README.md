# Blog REST API 

authentication, post, comment CRUD 

## Install
npm: `npm install`

## Sign up

Method: POST
Content-Type: application/json
Endpoint: localhost:8080/api/auth/signup

##Request Body Payload

| Property Name  | Type    | Description |
| -------------- | ------- | -------------------------------------- |
| username       | String  | The username for the user to create|
| password       | String  | The password for the user to create| 
| email          | String  | The email for the user to create|
| profileImageUrl| String  | The profile image for the user to create| 

##Response Payload

```
{
    "email": "test@example.com",
    "id": [USER_ID],
    "token": [TOKEN],
    "username": "username"
}

```

## Create Post

Method: POST
Content-Type: application/json
Endpoint: localhost:8080/api/users/[USER_ID]/messages/

##Request Body Payload

| Property Name  | Type | Description |
| -------------- | ---- | ----------- |
| token          | String  |A  valid user token|
| title          | String  ||
| post           | String  || 

##Response Payload

```
{
    "__v": 0,
    "_id": [POST_ID],
    "createdAt": "2019-05-30T18:06:08.087Z",
    "post": "post content",
    "title": "post title",
    "updatedAt": "2019-05-30T18:06:08.087Z",
    "user": {
        "_id": [USER_ID],
        "username": "username"
    }
}

```
