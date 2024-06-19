# IP Movies API Documentation

## Models

### User

```txt
- email : string, required, unique
- password : string, required
```

### Movie

```txt
- title : string, required
- synopsis : text
- duration : integer
- releaseDate : date
- coverUrl : text
- rating : float
- isNowShowing : boolean
```

## Endpoints

List of available endpoints:

- `POST /login`

Routes below need authentication:

- `GET /`
- `POST /mymovies/:id`
- `GET /mymovies`
- `PUT /mymovies/:id`
- `DELETE /mymovies/:id`

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. GET /

Description:

- Get all movies from TMDB database

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "tmdb-1022789",
    "title": "Inside Out 2",
    "synopsis": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    "releaseDate": "2024-06-11",
    "coverUrl": "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "rating": 7.947,
    "isNowShowing": true
  },
  {
    "id": "tmdb-653346",
    "title": "Kingdom of the Planet of the Apes",
    "synopsis": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
    "releaseDate": "2024-05-08",
    "coverUrl": "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    "rating": 6.843,
    "isNowShowing": true
  }
]
```

&nbsp;

## 3. POST /mymovies/:id

Description:

- Add movies to my movies

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "CourseId": 2,
  "UserId": 1,
  "status": "Uncompleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Course not found"
}
```

&nbsp;

## 5. GET /mycourses

Description:

- Get all my course of logged user

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 2,
    "UserId": 1,
    "CourseId": 2,
    "status": "Uncompleted",
    "Course": {
      "title": "REST API",
      "instructor": "Edison",
      "day": "Wednesday,Friday",
      "imageUrl": "https://billwerk.io/wp-content/uploads/sites/2/2019/05/icons-restapi-350x350.png"
    }
  },
  {
    "id": 1,
    "UserId": 1,
    "CourseId": 1,
    "status": "Completed",
    "Course": {
      "title": "Intro Vue",
      "instructor": "Arnold Therigan",
      "day": "Monday,Thursday,Saturday",
      "imageUrl": "https://docs.vuejs.id/images/logo.png"
    }
  }
  ...,
]
```

&nbsp;

## 6. PATCH /mycourses/:id

Description:

- Update my course to completed

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Course has been completed"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Course not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
