# dearnerdgirl
Project 2: Building a website where women in tech can write letters to young girls in tech to boost morale.

--Config
 |--connection.js
  |--orm.js
 |--auth.js <!-- will hold out secrets-->
 |--database.js<!-- will hold database connection settings-->
 |--passport.js <!-- configuring the settings for passport-->

--Controllers
  |--nerdgirl_controller.js

--Database
  |--schema.sql
  |--seeds.sql

--models
  |--nerdgirl.js
  |--routes.js

--public
  |--CSS
    |--nerdgirl_style.css
  |--img
   |--nerdgirl.png

-views
  |--index.handlebars
  |--layouts
     |--main.handlebars





## User management

### Register a user

```curl -i -H 'content-type: application/json' -X POST -d '{"username":"michael", "password":"Password1", "first_name":"Michael", "last_name":"Greenwald"}' localhost:3000/register```

This will store the user within the mongodb collection `users`.

### Basic Auth

There is now an express filter called `basicAuth` that can be included within the filter chain for any route that should be authenticated.  The filter does a standard validation of `basic base64(username:password)` within the `authorization` header.

An example route has been provided that is also suitable for doing a quick password check.

```curl -i -H 'authorization: basic bWljaGFlbDpQYXNzd29yZDE=' localhost:3000/authcheck```

### Diaries

There is a collection called `diaries` that contains the posts

The route `$curl -i localhost:3000/diaries` is used for listing writen diaries


## Todo

### Users
- [] restrict password to a regexp
- [] allow for user updates
- [] dedupe of users when registering (curently any collisions are ignored and only the first user with a provided username is validated)

### Diaries
- [] add diary
- [] edit diary

