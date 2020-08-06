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
- `POST /register`
- `POST /invitation`
- `GET /invitation/:id`
- `POST /guest`
- `GET /guest/:id`
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
### GET /invitation/:id
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
    "id": 1,
    "title": "string",
    "date": "<saturday, 18:00>",
    "location" : "jl.buah batu",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
  }
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request"
}
```

### POST /invitation
> Create invitation

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "title": "<Cep & pita>",
  "date": "<saturday, 18:00>",
  "location": "jl.buah batu",
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "<cep & pita>",
  "date": "<saturday, 18:00>",
  "location": "Jl.buah batu",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "value is required"
}
```

### DELETE /invitation/:id
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
  "id": 1,
  "title": "<cep & pita>",
  "date": "<saturday, 17:00>",
  "location": "<jl.buah batu>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
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
  "email": "<cep@gmail.com>",
  "password": "<qwerty>"
}
```

_Response (200)_
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
  "email": "<cep@gmail.com>",
  "password": "<qwerty>"
}
```

_Response (201)_
```json
{
  "id": 1,
  "email": "cep@gmail.com",
  "password": "$2b$10$Eq03uiQCB86/IxvwEiQlYuL/4zavUfMqZm8dGKRsoDvvREzVKhaiy",
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