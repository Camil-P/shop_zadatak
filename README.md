# REST API example application

This is a REST API for shop articles.

## Install Packages

    npm i

## Run the app

    npm start

# REST API

The REST API to the example app is described below.

## Authentication

### Registration

`POST http://localhost:8000/api/users`

### JSON Body:

    {
        "email":"string",
        "password":"string"
    }

### Response body:

    {
        "email": "example@example.com",
        "_id": "random_Char_Sequence",
        "createdAt": "2022-09-17T13:24:09.654Z",
        "updatedAt": "2022-09-17T13:24:09.654Z",
        "__v": 0
    }

### Login

`POST http://localhost:8000/api/sessions`

### JSON Body:

    {
        "email":"string",
        "password":"string"
    }

### Response body:

    {
        "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMyMzQ5MTI1ODU2MDQzMTY2NGQ1YmE0Iiwic2Vzc2lvbiI6IjYzMjVjYTI1MGQyZjcwMDA2ZjRkNGJhNiIsImlhdCI6MTY2MzQyMDk2NSwiZXhwIjoxNjYzNDIxNTY1fQ.03fTEDHplNaOm96EnjpJOjFTrxjcDaLjFFqCW-4Dzx4",

        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMyMzQ5MTI1ODU2MDQzMTY2NGQ1YmE0IiwidmFsaWQiOnRydWUsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjkuMiIsIl9pZCI6IjYzMjVjYTI1MGQyZjcwMDA2ZjRkNGJhNiIsImNyZWF0ZWRBdCI6IjIwMjItMDktMTdUMTM6MjI6NDUuMTE0WiIsInVwZGF0ZWRBdCI6IjIwMjItMDktMTdUMTM6MjI6NDUuMTE0WiIsIl9fdiI6MCwiaWF0IjoxNjYzNDIwOTY1LCJleHAiOjE2OTQ5Nzg1NjV9.YDJRtBVCSNkC6fZrQ5YkbVKP7fHr4omfuKh64FDWpLM"
    }

## Create a new shopping list

`POST http://localhost:8000/api/lists`
### Request header:

    Authorization: Bearer jwtAccessToken
    x-refresh: refreshToken

### Request body: 

    {
        "name":"string",
        "itemList":[
            {
                "itemName":"string",
                "quantity":number
            },
            {
                "itemName":"string",
                "quantity":number
            },
            {
                "itemName":"string",
                "quantity":number
            }
        ]
    }

### Response

    {
        "user": "6323491258560431664d5ba4",
        "name": "created list",
        "itemList": [
            {
                "itemName": "item1",
                "quantity": 1,
                "_id": "6325cc2c0d2f70006f4d4bb0"
            },
            {
                "itemName": "item2",
                "quantity": 2,
                "_id": "6325cc2c0d2f70006f4d4bb1"
            },
            {
                "itemName": "item3",
                "quantity": 1,
                "_id": "6325cc2c0d2f70006f4d4bb2"
            }
        ],
        "_id": "6325cc2c0d2f70006f4d4baf",
        "createdAt": "2022-09-17T13:31:24.013Z",
        "updatedAt": "2022-09-17T13:31:24.013Z",
        "__v": 0
    }

## Get a created list

### Request

`GET http://localhost:8000/api/lists`

### Request Header

    Authorization: "Bearer jwtAccessToken"
    x-refresh: "refreshToken"

### Response

    [
        {
            "_id": "6325c3af0d2f70006f4d4b60",
            "user": "6323491258560431664d5ba4",
            "name": "created list",
            "itemList": [
                {
                    "itemName": "item1",
                    "quantity": 1,
                    "_id": "6325c3af0d2f70006f4d4b61"
                },
                {
                    "itemName": "item2",
                    "quantity": 2,
                    "_id": "6325c3af0d2f70006f4d4b62"
                },
                {
                    "itemName": "item3",
                    "quantity": 60,
                    "_id": "6325c3af0d2f70006f4d4b63"
                }
            ],
            "createdAt": "2022-09-17T12:55:11.731Z",
            "updatedAt": "2022-09-17T12:55:11.731Z",
            "__v": 0
        }
    ]

## Get list items

`GET http://localhost:8000/api/lists/items?from={dateTime}&to={dateTime}`

### Request Header

    Authorization: "Bearer jwtAccessToken"
    x-refresh: "refreshToken"
    
### Request Header (example)
#### Params are optional (If not specified gets items by userId extracted from accesToken)

    "from": 2022-09-17T12:55:11
    "to": 2023-15-17T12:55:11

### Response

    [
        {
            "quantity": 4,
            "itemName": "item1"
        },
        {
            "quantity": 3,
            "itemName": "item2"
        },
        {
            "quantity": 2,
            "itemName": "item3"
        },
        {
            "quantity": 60,
            "itemName": "item4"
        },
        {
            "quantity": 2,
            "itemName": "item5"
        },
        {
            "quantity": 2,
            "itemName": "item6"
        }
    ]
