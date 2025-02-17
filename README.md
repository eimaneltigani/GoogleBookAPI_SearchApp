# GoogleBooksAPI_SearchApp

Search engine using Google Books API to return list of book results after search input, user can add specified books to their favorites list stored locally. Users can also login and save their favorites to a database for permamnent persistance. 

[View Live](https://main.d28ng9gc5khmyd.amplifyapp.com/)
* Users can search title or author to view list of top 5 matching results
* Users can save books from list to their "favorites" locally
* Users can also save their favorites to a database to view in later sessions
* Users can view Favorites List in seperate tab
* Hosted on AWS Amplify

## Technologies:
Client-side:
* React
* Redux: to persist local data
* Axios: used to fetch data from external and defined APIs endpoinys
* AWS Amplify: used for authentication (Cognito) and delpoying front-end

Server-side:
* NodeJS
* Express
* DynamoDB
* AWS Lambda: serverless function used to host our API



