# wedding-invitation
My App is an application to sent a invitation wedding card. This app has : 
* RESTful endpoint for Invitation CRUD operation
* RESTful endpoint for User Login & Register Operation
* JSON formatted response
* Technology includes: 
    - 3 Third Party API (QR code,calender, Mailgun)
    - Authentication
    - Express Js (Node JS Framework), 
    - Object-relation Mapping: Sequelize, 
    - Database: Postgres, 
    - Token Signing/Verification: Json Web Token, 
    - Password Encryption: Bcrypt

&nbsp;
## RESTful endpoints
- `POST /login`
- `POST /googleSignin`
- `POST /register`
- `POST /invitations`
- `GET /invitations/`
- `DELETE /invitation/:id`

### Global Endpoints
_Response (401 - User not authenticated)_
```json
{
  "message": "User not authenticated"
}
```
_Response (500 - Server internal error)_
```json
{
  "message": "Server internal error"
}
```
### GET /invitations/
> Get all invitation

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
  {
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "time": "<time to get insert into>",
    "location": "<location to get insert into>",
    "UserId": "<get by UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "qrCode": "<qrCode get by time and location insert>",
  }
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request"
}
```

### POST /invitations
> Create invitation

_Request Header_
```json
{
  "access_token": "<MyToken>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "time": "<time to get insert into>",
  "location": "<location to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "title": "<title to get insert into>",
  "time": "<time to get insert into>",
  "location": "<location to get insert into>",
  "UserId": "<get by UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "qrCode": "<qrCode get by time and location insert>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "value is required"
}
```

### DELETE /invitations/:id
> Delete invitation

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```json
{
  "id": "<integer>"
}
```

_Response (200)_
```json

{
  "id": "<given id by system>",
  "title": "<title to get insert into>",
  "time": "<time to get insert into>",
  "location": "<location to get insert into>",
  "UserId": "<get by UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "qrCode": "<qrCode get by time and location insert>",
}
```

_Response (403 - Bad Request)_
```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "data not found"
}
```

---
### POST /login
> Login User

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

_Response (200)_
```json
{
  "access_token": "<MyToken>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "data not found"
}
```

---
### POST /register
> Register User

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

_Response (201)_
```json
{
  "id": "<given id by system>",
  "email": "<email to get insert into>",
  "password": "<password Encrypted>",
  "updatedAt": "2020-07-06T13:01:52.682Z",
  "createdAt": "2020-07-06T13:01:52.682Z"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "data not found"
}
```

---
### POST /googleSignin
> Login User with Aouth Google

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "id_token" : "<token from google>" 
}
```

_Response (201)_
```json
{
  "access_token": "<access_token>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "data not found"
}
```