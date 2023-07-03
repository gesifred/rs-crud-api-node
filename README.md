# rs-crud-api-node

How to install the application
` git clone repositoryUrl`

How to run the app:

- development mode 
` npm run start:dev`

- production mode: with build included
` npm run start:prod`

The Routes are
Database consists on users / objects
```javascript
{
	//all required fields
	id:uuidV4,
	username: string,
	age: number,
	hobbies: Array<string>
}
```
**GET**
`/api/users`
returns JSON with all users registered, initially empty array

**GET** 
`/api/users/{userId}`
returns JSON with an specific `userId`, Every Id is based on **uuid V4**

**POST**
`/api/users`
receive an Object User `{ username:username , age: number, hobbies: [ "elements"] }`

**PUT**
`/api/users/{userId}`
receive  an existant Object User `{ username:username , age: number, hobbies: [ "elements"] }`

returns JSON with an specific `userId`, and all the fields

DELETE
`/api/users/{userId}`
Delete the with an specific `userId`