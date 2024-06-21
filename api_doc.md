# IP Movies API Documentation

## Models

### User

```txt
- email : string, required, unique
- password : string, required
- name : string,
- subscription : string
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

### Order

```txt
- orderId : string, required
- userID : integer
- amount : string
- status : string
- paidDate : date
```

## Endpoints

List of available endpoints:

- `POST /login`

Routes below need authentication:

- `GET /`
- `POST /mymovies/:movieId`
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

## 3. POST /mymovies/:movieId

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
  "movieId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "UserId": 2,
  "MovieId": "tmdb-150540",
  "updatedAt": "2024-06-21T03:13:22.535Z",
  "createdAt": "2024-06-21T03:13:22.535Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 4. GET /mymovies

Description:

- Get all my movies of logged user

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
    "id": 3,
    "UserId": 2,
    "MovieId": "tmdb-653346",
    "Movie": {
      "id": "tmdb-653346",
      "title": "Kingdom of the Planet of the Apes",
      "synopsis": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      "releaseDate": "2024-05-08T00:00:00.000Z",
      "coverUrl": "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      "rating": 6.859,
      "isNowShowing": false
    }
  },
  {
    "id": 4,
    "UserId": 2,
    "MovieId": "tmdb-1001311",
    "Movie": {
      "id": "tmdb-1001311",
      "title": "Under Paris",
      "synopsis": "In the Summer of 2024, Paris is hosting the World Triathlon Championships on the Seine for the first time. Sophia, a brilliant scientist, learns from Mika, a young environmental activist, that a large shark is swimming deep in the river. To avoid a bloodbath at the heart of the city, they have no choice but to join forces with Adil, the Seine river police commander.",
      "releaseDate": "2024-06-05T00:00:00.000Z",
      "coverUrl": "https://image.tmdb.org/t/p/w500/qZPLK5ktRKa3CL4sKRZtj8UlPYc.jpg",
      "rating": 5.97,
      "isNowShowing": false
    }
  }
]
```

&nbsp;

## 5. PUT /mymovies/:id

Description:

- Updated movie's `isNowShowing`

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
  "id": "integer (required)"
}
```

- body:

```json
{
  "isNowShowing": "boolean (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Movie has been updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "isNowShowing cannot be empty"
}
```

&nbsp;

## 6. DELETE /mymovies/:id

Description:

- Delete My Movies

Request

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

Response (200 - OK)

```json
{
  "message": "Movie has been deleted"
}
```

Response (404 - Not Found)

```json
{
  "message": "Movie not found"
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
