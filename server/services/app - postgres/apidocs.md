## Endpoints

List of Available Endpoints:
- `POST /users/register`
- `POST /users/login`

- `GET /pub/news`
- `GET /pub/news/:newsId`

- `GET /news`
- `GET /news/:newsId`
- `POST /news`
- `PUT /news/:newsId`
- `DELETE /news/:newsId`

- `GET /categories`
- `GET /categories/:newsId`
- `POST /categories`
- `PUT /categories/:newsId`
- `DELETE /categories/:newsId`

- `GET /tags`

&nbsp;

### 1. POST /users/register
#### Description
- Create a new user

#### Request
- Body
    ```json
    {
      "username": String,
      "email": String | required,
      "password": String | required,
      "phoneNumber": String,
      "address": String 
    }
    ```
#### Response
_Response (201 - Created)_

```json
{
  "message": "User with email <email> has just been created"
}
```

_400 - Bad Request_
- Body
    ```json
    {
        "Email can not be empty"
    }
    OR
    {
        "Email is not valid"
    }
    OR
    {
        "Password can not be empty"
    }
    OR
    {
        "Password must have at least 5 characters"
    }
    ```
&nbsp;

### 2. POST /users/login
#### Description
- User's login form

#### Request
- Body
    ```json
    {
      "email": String | required,
      "password": String | required
    }
    ```
#### Response
_200 - Ok
- Body
    ```json
    {
    "acess_token": String,
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Invalid email/password"
    }
    OR
    {
      "message": "Invalid email/password"
    }
    ```
&nbsp;

### 3. GET /pub.news
#### Description
- Fetch news from the database

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response
_200 - OK_

- Body
    ```json
    [
        {
        "id": 3,
        "title": "Germany's Scholz calls for reduction in early retirees",
        "slug": "Germany's-Scholz-calls-for-reduction-in-early-retirees",
        "content": "Europe's largest economy needs hundreds of thousands of new workers every year to replace retirees. As well as bringing in more foreign workers, Chancellor Olaf Scholz urged those over 60 to delay leaving the workforce.",
        "imgUrl": "https://static.dw.com/image/60540669_1006.jpg",
        "categoryId": 1,
        "authorId": 3,
        "createdAt": "2022-12-15T09:38:24.083Z",
        "updatedAt": "2022-12-15T09:38:24.083Z",
        "User": {
            "id": 3,
            "username": "Deutsche Welle",
            "email": "deutsche@mail.com",
            "password": "$2a$08$BqOiHulCANq06BWEwHnYbuvKzWp9EfbmBgZB.p4f1bvk62djmF1rm",
            "role": "Admin",
            "phoneNumber": "12345",
            "address": "HQ",
            "createdAt": "2022-12-15T09:38:23.763Z",
            "updatedAt": "2022-12-15T09:38:23.763Z"
        },
        "Category": {
            "id": 1,
            "name": "Econom",
            "createdAt": Integer,
            "updatedAt": "2022-12-16T16:49:20.142Z"
        },
        "PostTags": [
            {
                "id": 3,
                "PostId": 3,
                "TagId": 3,
                "createdAt": "2022-12-15T09:39:02.217Z",
                "updatedAt": "2022-12-15T09:39:02.217Z",
                "Tag": {
                    "id": 3,
                    "name": "Germany",
                    "createdAt": "2022-12-15T09:38:24.089Z",
                    "updatedAt": "2022-12-15T09:38:24.089Z"
                }
            }
        ]
    },
    {
        "id": 4,
        "title": "Sen. Sinema’s switch to Independent will not impact Democrats’ control of the chamber, representatives say",
        "slug": "Sen.-Sinema’s-switch-to-Independent-will-not-impact-Democrats’-control-of-the-chamber,-representatives-say",
        "content": "Arizona Sen. Kyrsten Sinema announced her decision on Friday to leave the Democrats and register as an independent, but many members of Congress have said the switch likely won’t impact the Democrats’ narrow control of the U.S. Senate.",
        "imgUrl": "https://images.firstpost.com/wp-content/uploads/2022/12/AP22343600118135ff.jpg?impolicy=website&width=640&height=363",
        "categoryId": 7,
        "authorId": 4,
        "createdAt": "2022-12-15T09:38:24.083Z",
        "updatedAt": "2022-12-15T09:38:24.083Z",
        "User": {
            "id": 4,
            "username": "The Associated Press",
            "email": "the@mail.com",
            "password": "$2a$08$W5iuubajvZ2Mlr.TxBgH2e18.uoXljqA9ImJK1NEWQk5R0ZO/Eld6",
            "role": "Admin",
            "phoneNumber": "12345",
            "address": "HQ",
            "createdAt": "2022-12-15T09:38:23.783Z",
            "updatedAt": "2022-12-15T09:38:23.783Z"
        },
        "Category": {
            "id": 7,
            "name": "Politics",
            "createdAt": "2022-12-15T09:38:24.078Z",
            "updatedAt": "2022-12-15T09:38:24.078Z"
        },
        "PostTags": [
            {
                "id": 4,
                "PostId": 4,
                "TagId": 4,
                "createdAt": "2022-12-15T09:39:02.217Z",
                "updatedAt": "2022-12-15T09:39:02.217Z",
                "Tag": {
                    "id": 4,
                    "name": "Democrats",
                    "createdAt": "2022-12-15T09:38:24.089Z",
                    "updatedAt": "2022-12-15T09:38:24.089Z"
                }
            }
        ]
    }
    ...,
    ]
    ```

&nbsp;

## 4. GET /pub/news/:newsId

Description:
- Get a news based on a given id

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```
- params:

  ```json
  {
    "newsId": Integer | required
  }
  ```

_Response (200 - OK)_

  ```json
  {
    "id": 5,
    "title": "Elon Musk relaunches Twitter Blue with higher price for iPhone users",
    "slug": "Elon-Musk-relaunches-Twitter-Blue-with-higher-price-for-iPhone-users",
    "content": "Twitter has restarted a service dubbed Twitter Blue, where users can pay a monthly fee for a blue checkmark, along with the ability to edit tweets and upload high quality video. Apple users, however, will be charged more. The company says the revamped service will cost $8 a month on the web, or $11 a month if purchased through an app on iPhones and iPads, where in-app transactions are processed through the company's App Store, which generally levies a 30% commission.",
    "imgUrl": "https://media.npr.org/assets/img/2022/11/28/ap22313071321747_custom-518f20f94772b080205d9fb1894cadb074e98214-s800-c85.webp",
    "categoryId": 10,
    "authorId": 5,
    "createdAt": "2022-12-15T09:38:24.083Z",
    "updatedAt": "2022-12-15T09:38:24.083Z",
    "User": {
        "id": 5,
        "username": "Bobby Allyn",
        "email": "bobby@mail.com",
        "password": "$2a$08$cH9QmuaUHyB4T5LVPEtBfuykIxns2qmLaQZw.oIReYuAGsa7GqLCi",
        "role": "Admin",
        "phoneNumber": "12345",
        "address": "HQ",
        "createdAt": "2022-12-15T09:38:23.804Z",
        "updatedAt": "2022-12-15T09:38:23.804Z"
    },
    "Category": {
        "id": 10,
        "name": "Technology",
        "createdAt": "2022-12-15T09:38:24.078Z",
        "updatedAt": "2022-12-15T09:38:24.078Z"
    },
    "PostTags": [
        {
            "id": 5,
            "PostId": 5,
            "TagId": 5,
            "createdAt": "2022-12-15T09:39:02.217Z",
            "updatedAt": "2022-12-15T09:39:02.217Z",
            "Tag": {
                "id": 5,
                "name": "Elon Musk",
                "createdAt": "2022-12-15T09:38:24.089Z",
                "updatedAt": "2022-12-15T09:38:24.089Z"
            }
        }
    ]
}
  ```

Response (404 - Not Found)_

  ```json
  {
    "message": "Data not found"
  }
  ```

&nbsp;


### 5. GET /news
#### Description
- Fetch news from the database

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response
_200 - OK_

- Body
    ```json
    [
        {
        "id": 3,
        "title": "Germany's Scholz calls for reduction in early retirees",
        "slug": "Germany's-Scholz-calls-for-reduction-in-early-retirees",
        "content": "Europe's largest economy needs hundreds of thousands of new workers every year to replace retirees. As well as bringing in more foreign workers, Chancellor Olaf Scholz urged those over 60 to delay leaving the workforce.",
        "imgUrl": "https://static.dw.com/image/60540669_1006.jpg",
        "categoryId": 1,
        "authorId": 3,
        "createdAt": "2022-12-15T09:38:24.083Z",
        "updatedAt": "2022-12-15T09:38:24.083Z",
        "User": {
            "id": 3,
            "username": "Deutsche Welle",
            "email": "deutsche@mail.com",
            "password": "$2a$08$BqOiHulCANq06BWEwHnYbuvKzWp9EfbmBgZB.p4f1bvk62djmF1rm",
            "role": "Admin",
            "phoneNumber": "12345",
            "address": "HQ",
            "createdAt": "2022-12-15T09:38:23.763Z",
            "updatedAt": "2022-12-15T09:38:23.763Z"
        },
        "Category": {
            "id": 1,
            "name": "Econom",
            "createdAt": "2022-12-15T09:38:24.078Z",
            "updatedAt": "2022-12-16T16:49:20.142Z"
        },
        "PostTags": [
            {
                "id": 3,
                "PostId": 3,
                "TagId": 3,
                "createdAt": "2022-12-15T09:39:02.217Z",
                "updatedAt": "2022-12-15T09:39:02.217Z",
                "Tag": {
                    "id": 3,
                    "name": "Germany",
                    "createdAt": "2022-12-15T09:38:24.089Z",
                    "updatedAt": "2022-12-15T09:38:24.089Z"
                }
            }
        ]
    },
    {
        "id": 4,
        "title": "Sen. Sinema’s switch to Independent will not impact Democrats’ control of the chamber, representatives say",
        "slug": "Sen.-Sinema’s-switch-to-Independent-will-not-impact-Democrats’-control-of-the-chamber,-representatives-say",
        "content": "Arizona Sen. Kyrsten Sinema announced her decision on Friday to leave the Democrats and register as an independent, but many members of Congress have said the switch likely won’t impact the Democrats’ narrow control of the U.S. Senate.",
        "imgUrl": "https://images.firstpost.com/wp-content/uploads/2022/12/AP22343600118135ff.jpg?impolicy=website&width=640&height=363",
        "categoryId": 7,
        "authorId": 4,
        "createdAt": "2022-12-15T09:38:24.083Z",
        "updatedAt": "2022-12-15T09:38:24.083Z",
        "User": {
            "id": 4,
            "username": "The Associated Press",
            "email": "the@mail.com",
            "password": "$2a$08$W5iuubajvZ2Mlr.TxBgH2e18.uoXljqA9ImJK1NEWQk5R0ZO/Eld6",
            "role": "Admin",
            "phoneNumber": "12345",
            "address": "HQ",
            "createdAt": "2022-12-15T09:38:23.783Z",
            "updatedAt": "2022-12-15T09:38:23.783Z"
        },
        "Category": {
            "id": 7,
            "name": "Politics",
            "createdAt": "2022-12-15T09:38:24.078Z",
            "updatedAt": "2022-12-15T09:38:24.078Z"
        },
        "PostTags": [
            {
                "id": 4,
                "PostId": 4,
                "TagId": 4,
                "createdAt": "2022-12-15T09:39:02.217Z",
                "updatedAt": "2022-12-15T09:39:02.217Z",
                "Tag": {
                    "id": 4,
                    "name": "Democrats",
                    "createdAt": "2022-12-15T09:38:24.089Z",
                    "updatedAt": "2022-12-15T09:38:24.089Z"
                }
            }
        ]
    }
    ...,
    ]
    ```

&nbsp;

## 6. GET /news/:newsId

Description:
- Get a news based on a given id

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```
- params:

  ```json
  {
    "newsId": Integer | required
  }
  ```

_Response (200 - OK)_

  ```json
  {
    "id": 5,
    "title": "Elon Musk relaunches Twitter Blue with higher price for iPhone users",
    "slug": "Elon-Musk-relaunches-Twitter-Blue-with-higher-price-for-iPhone-users",
    "content": "Twitter has restarted a service dubbed Twitter Blue, where users can pay a monthly fee for a blue checkmark, along with the ability to edit tweets and upload high quality video. Apple users, however, will be charged more. The company says the revamped service will cost $8 a month on the web, or $11 a month if purchased through an app on iPhones and iPads, where in-app transactions are processed through the company's App Store, which generally levies a 30% commission.",
    "imgUrl": "https://media.npr.org/assets/img/2022/11/28/ap22313071321747_custom-518f20f94772b080205d9fb1894cadb074e98214-s800-c85.webp",
    "categoryId": 10,
    "authorId": 5,
    "createdAt": "2022-12-15T09:38:24.083Z",
    "updatedAt": "2022-12-15T09:38:24.083Z",
    "User": {
        "id": 5,
        "username": "Bobby Allyn",
        "email": "bobby@mail.com",
        "password": "$2a$08$cH9QmuaUHyB4T5LVPEtBfuykIxns2qmLaQZw.oIReYuAGsa7GqLCi",
        "role": "Admin",
        "phoneNumber": "12345",
        "address": "HQ",
        "createdAt": "2022-12-15T09:38:23.804Z",
        "updatedAt": "2022-12-15T09:38:23.804Z"
    },
    "Category": {
        "id": 10,
        "name": "Technology",
        "createdAt": "2022-12-15T09:38:24.078Z",
        "updatedAt": "2022-12-15T09:38:24.078Z"
    },
    "PostTags": [
        {
            "id": 5,
            "PostId": 5,
            "TagId": 5,
            "createdAt": "2022-12-15T09:39:02.217Z",
            "updatedAt": "2022-12-15T09:39:02.217Z",
            "Tag": {
                "id": 5,
                "name": "Elon Musk",
                "createdAt": "2022-12-15T09:38:24.089Z",
                "updatedAt": "2022-12-15T09:38:24.089Z"
            }
        }
    ]
}
  ```

Response (404 - Not Found)_

  ```json
  {
    "message": "Data not found"
  }
  ```

&nbsp;


### 7. POST /news
#### Description
- Create a new news

#### Request
- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```
- Body
    ```json
    {
      "title": String | required,
      "content": String | required,
      "imgUrl": String,
      "tag": String,
      "categoryId": Integer,
    }
    ```

#### Response
_201 - Created
- Body
    ```json
    {
    "id": Integer,
    "title": String,
    "slug": String,
    "content": String,
    "imgUrl": String,
    "categoryId": Integer,
    "authorId": Integer,
    "updatedAt": Date,
    "createdAt": Date
    }
    ```

_400 - Bad Request_
  ```json
    {
      "Title can not be empty"
    }
    OR
    {
      "Slug can not be empty"
    }
    OR
    {
      "Content can not be empty"
    }
    OR
  ```
&nbsp;



## 8. PUT /news/:newsId

Description:
- Edit a news based on a given id

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

- params:

```json
{
  "newsId": Integer | required
}
```

- Body
    ```json
    {
        "title": Integer,
        "content": String,
        "imgUrl": String,
        "tag": String,
        "categoryId": String,
    }
    ```

_Response (200 - OK)_

```json
{
    "message": "Post with id <newsId> has been edited"
}
```

_Error_
_Response (403 - Unauthorized)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```
&nbsp;



## 9. DELETE /news/:newsId

Description:
- Delete a news based on a given id

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

  ```

- params:

```json
{
  "newsId": Integer | required
}
```

_Response (200 - OK)_

```json
{
    "message": "Post with id <newsId> has been deleted"
}
```

_Error_
_Response (403 - Unauthorized)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```
&nbsp;

### 10. GET /categories
#### Description
- Fetch categories from the database

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response
_200 - OK_

- Body
    ```json
    [
        {
        "id": 1,
        "name": "Econom",
        "createdAt": "2022-12-15T09:38:24.078Z",
        "updatedAt": "2022-12-16T16:49:20.142Z"
    },
    {
        "id": 6,
        "name": "Health",
        "createdAt": "2022-12-15T09:38:24.078Z",
        "updatedAt": "2022-12-15T09:38:24.078Z"
    },
    ...,
    ]
    ```

&nbsp;

## 11. GET /categories/:categoriesId

Description:
- Get a category based on a given id

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```
- params:

  ```json
  {
    "categoryId": Integer | required
  }
  ```

_Response (200 - OK)_

  ```json
  {
    "id": Integer,
    "name": String,
    "createdAt": Date,
    "updatedAt": Date
}
  ```

Response (404 - Not Found)_

  ```json
  {
    "message": "Data not found"
  }
  ```

&nbsp;


### 12. POST /categories
#### Description
- Create a new category

#### Request
- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```
- Body
    ```json
    {
      "name": String | required,
    }
    ```

#### Response
_201 - Created
- Body
    ```json
    {
    "id": Integer,
    "name": String,
    "updatedAt": Date,
    "createdAt": Date
    }
    ```

_400 - Bad Request_
  ```json
    {
      "Name can not be empty"
    }
  ```
&nbsp;



## 13. PUT /categories/:categoryId

Description:
- Edit a category based on a given id

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

- params:

```json
{
  "categoryId": Integer | required
}
```

- Body
    ```json
    {
        "name": Integer,
    }
    ```

_Response (200 - OK)_

```json
{
    "message": "Category with id <newsId> has been edited"
}
```

_Error_
_Response (403 - Unauthorized)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```
&nbsp;



## 14. DELETE /categories/:categoryId

Description:
- Delete a category based on a given id

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

  ```

- params:

```json
{
  "categoryId": Integer | required
}
```

_Response (200 - OK)_

```json
{
    "message": "Category with id <newsId> has been deleted"
}
```

_Error_
_Response (403 - Unauthorized)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```
&nbsp;

### 10. GET /tags
#### Description
- Fetch tags from the database

Request:

- headers: 

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response
_200 - OK_

- Body
    ```json
    [
      {
        "id": 1,
        "name": "Ukraine",
        "createdAt": "2022-12-15T09:38:24.089Z",
        "updatedAt": "2022-12-15T09:38:24.089Z",
        "PostTags": []
    },
    {
        "id": 2,
        "name": "Royal Family",
        "createdAt": "2022-12-15T09:38:24.089Z",
        "updatedAt": "2022-12-15T09:38:24.089Z",
        "PostTags": []
    },
    ...,
    ]
    ```

&nbsp;


### Global Error
#### Response
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```
_500 - Internal Server Error_
- Body
    ```json
    {
        "message": "Internal Server Error"
    }
    ```
&nbsp;