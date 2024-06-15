# OpenSYNC

## Building Docker Images

### Prerequisites

- Docker installed on your system. If you haven't installed Docker yet, you can download and install it from [here](https://docs.docker.com/get-docker/).

### Build Instructions

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/your-username/your-project.git
    ```

2. Navigate to the project directory.

    ```bash
    cd your-project
    ```

3. Build the Docker image using the provided Dockerfile.

    ```bash
    docker build -t your-image-name .
    ```

    Replace `your-image-name` with the desired name for your Docker image.

4. Once the build is complete, you can run a container using the following command:

    ```bash
    docker run -d -p your-port:container-port your-image-name
    ```

    Replace `your-port` with the port you want to expose on your host machine and `container-port` with the port your application is running inside the container.

### Additional Information

- If you need to customize the build process, you can modify the `Dockerfile` according to your requirements.
- For more advanced usage, refer to the [Docker documentation](https://docs.docker.com/).

## Development Setup

1. Run the Project

Start the project using Docker Compose:

```sh
docker-compose up -d
```

This will start the project in detached mode.

 You can access the application at `http://localhost:YOUR_PORT`.

## Troubleshooting

If you encounter any issues, please refer to the following steps:

 > Check the Docker Compose logs for

 ```sh
docker-compose -f logs
```

> Make sure your Docker daemon is running and you have the latest version of Docker and Docker Compose installed.

## Contributing

We welcome contributions! To contribute to Project Name, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name (git checkout -b my-contributions).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push your changes to your forked repository (git push origin my-contributions).
5. Submit a pull request on GitHub.

Please see the CONTRIBUTING.md for more details on how to get started.

## Endpoints and Examples

---
title: OpenSYNC v1.0
language_tabs:
  - python: Python
  - node: NodeJs
  - java: Java
  - typescript: TypeScript
  - javascript: JavaScript
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="opensync-auth">Auth</h1>

## Login

<a id="opIdLogin"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/login', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "username": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/login`

*User Login*

This endpoint allows user to login to the system. The user is authenticated and a session is created.

> Body parameter

```json
{
  "username": "string",
  "password": "string"
}
```

<h3 id="login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Login](#schemalogin)|true|none|

> Example responses

> 400 Response

```json
{
  "error": "Invalid Username or Password."
}
```

<h3 id="login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[UnauthorizedError](#schemaunauthorizederror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<h3 id="login-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Me

<a id="opIdMe"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/me', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/me");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/me',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/me`

*Get Logged In User Details*

This endpoint allows you get the details of the currently logged in user.

<h3 id="me-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 400 Response

```json
{
  "error": "Invalid fields supplied"
}
```

<h3 id="me-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[UnauthorizedError](#schemaunauthorizederror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundError](#schemanotfounderror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<h3 id="me-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Logout

<a id="opIdLogout"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/logout', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/logout");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/logout',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/logout`

*User Logout*

This endpoint allows user to logout of the system. The session is destroyed.

<h3 id="logout-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 400 Response

```json
{
  "error": "At least one field should be filled"
}
```

<h3 id="logout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[UnauthorizedError](#schemaunauthorizederror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundError](#schemanotfounderror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-roles">Roles</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/roles', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/roles");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/roles',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/roles`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/roles')

print(r.json())

```

```java
URL obj = new URL("/api/roles");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/roles',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/roles`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/roles/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/roles/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/roles/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/roles/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/roles/fields')

print(r.json())

```

```java
URL obj = new URL("/api/roles/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/roles/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/roles/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/roles/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/roles/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/roles/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/roles/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/roles/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/roles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/roles/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/roles/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/roles/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/roles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/roles/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/roles/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/roles/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/roles/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/roles/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/roles/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/roles/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/roles/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/roles/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/roles/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/roles/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/roles/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/roles/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/roles/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/roles/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/roles/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/roles/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/roles/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-privileges">Privileges</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/privileges', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/privileges");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/privileges',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/privileges`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/privileges')

print(r.json())

```

```java
URL obj = new URL("/api/privileges");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/privileges',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/privileges`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/privileges/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/privileges/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/privileges/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/privileges/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/privileges/fields')

print(r.json())

```

```java
URL obj = new URL("/api/privileges/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/privileges/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/privileges/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/privileges/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/privileges/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/privileges/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/privileges/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/privileges/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/privileges/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/privileges/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/privileges/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/privileges/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/privileges/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/privileges/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/privileges/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/privileges/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/privileges/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/privileges/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/privileges/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/privileges/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/privileges/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/privileges/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/privileges/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/privileges/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/privileges/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/privileges/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/privileges/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/privileges/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/privileges/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/privileges/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/privileges/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-users">Users</h1>

## Upload Dp

<a id="opIdUpload Dp"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('/api/users/dps', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/dps");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/users/dps',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/users/dps`

*Upload User profile picture*

This endpoint allows user to upload their profile picture. The file is processed and stored accordingly.

> Body parameter

```yaml
file: string

```

<h3 id="upload-dp-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

> Example responses

> 400 Response

```json
{
  "error": "At least one field should be filled"
}
```

<h3 id="upload-dp-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[UnauthorizedError](#schemaunauthorizederror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

## Get Dp

<a id="opIdGet Dp"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/users/{dp}/dps', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/{dp}/dps");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/users/{dp}/dps',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/users/{dp}/dps`

<h3 id="get-dp-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|dp|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 400 Response

```json
{
  "error": "At least one field should be filled"
}
```

<h3 id="get-dp-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/users', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/users',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/users`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/users')

print(r.json())

```

```java
URL obj = new URL("/api/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/users',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/users`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/users/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/users/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/users/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/users/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/users/fields')

print(r.json())

```

```java
URL obj = new URL("/api/users/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/users/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/users/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/users/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/users/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/users/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/users/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/users/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/users/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/users/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/users/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/users/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/users/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/users/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/users/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/users/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/users/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/users/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/users/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/users/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/users/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/users/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/users/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/users/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/users/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/users/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-organisation-units">Organisation Units</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/organisationUnits', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/organisationUnits',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/organisationUnits`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/organisationUnits')

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/organisationUnits',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/organisationUnits`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/organisationUnits/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/organisationUnits/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/organisationUnits/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/organisationUnits/fields')

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/organisationUnits/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/organisationUnits/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/organisationUnits/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/organisationUnits/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/organisationUnits/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/organisationUnits/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/organisationUnits/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/organisationUnits/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/organisationUnits/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/organisationUnits/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/organisationUnits/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/organisationUnits/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/organisationUnits/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/organisationUnits/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/organisationUnits/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/organisationUnits/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/organisationUnits/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/organisationUnits/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/organisationUnits/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/organisationUnits/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/organisationUnits/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/organisationUnits/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/organisationUnits/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/organisationUnits/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-enrollments">Enrollments</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/enrollments', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollments");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/enrollments',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/enrollments`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/enrollments')

print(r.json())

```

```java
URL obj = new URL("/api/enrollments");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/enrollments',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/enrollments`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/enrollments/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/enrollments/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/enrollments/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/enrollments/fields')

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/enrollments/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/enrollments/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/enrollments/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/enrollments/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/enrollments/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/enrollments/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/enrollments/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/enrollments/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/enrollments/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/enrollments/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/enrollments/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/enrollments/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/enrollments/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/enrollments/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/enrollments/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/enrollments/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/enrollments/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/enrollments/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/enrollments/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/enrollments/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/enrollments/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollments/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/enrollments/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/enrollments/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-followups">Followups</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/followups', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/followups");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/followups',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/followups`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/followups')

print(r.json())

```

```java
URL obj = new URL("/api/followups");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/followups',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/followups`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/followups/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/followups/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/followups/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/followups/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/followups/fields')

print(r.json())

```

```java
URL obj = new URL("/api/followups/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/followups/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/followups/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/followups/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/followups/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/followups/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/followups/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/followups/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/followups/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/followups/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/followups/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/followups/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/followups/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/followups/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/followups/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/followups/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/followups/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/followups/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/followups/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/followups/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/followups/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/followups/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/followups/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/followups/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/followups/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/followups/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/followups/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/followups/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/followups/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/followups/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/followups/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-disbursements">Disbursements</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/disbursements', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/disbursements");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/disbursements',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/disbursements`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/disbursements')

print(r.json())

```

```java
URL obj = new URL("/api/disbursements");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/disbursements',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/disbursements`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/disbursements/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/disbursements/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/disbursements/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/disbursements/fields')

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/disbursements/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/disbursements/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/disbursements/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/disbursements/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/disbursements/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/disbursements/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/disbursements/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/disbursements/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/disbursements/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/disbursements/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/disbursements/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/disbursements/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/disbursements/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/disbursements/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/disbursements/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/disbursements/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/disbursements/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/disbursements/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/disbursements/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/disbursements/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/disbursements/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/disbursements/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/disbursements/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/disbursements/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-blood-collections">Blood Collections</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/bloodCollections', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/bloodCollections',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/bloodCollections`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/bloodCollections')

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/bloodCollections',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/bloodCollections`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/bloodCollections/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/bloodCollections/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/bloodCollections/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/bloodCollections/fields')

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/bloodCollections/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/bloodCollections/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/bloodCollections/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/bloodCollections/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/bloodCollections/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/bloodCollections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/bloodCollections/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/bloodCollections/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/bloodCollections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/bloodCollections/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/bloodCollections/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/bloodCollections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/bloodCollections/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/bloodCollections/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/bloodCollections/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/bloodCollections/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/bloodCollections/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/bloodCollections/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/bloodCollections/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/bloodCollections/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/bloodCollections/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/bloodCollections/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/bloodCollections/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/bloodCollections/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-data-collections">Data Collections</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/dataCollections', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/dataCollections',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/dataCollections`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/dataCollections')

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/dataCollections',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/dataCollections`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/dataCollections/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/dataCollections/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/dataCollections/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/dataCollections/fields')

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/dataCollections/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/dataCollections/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/dataCollections/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/dataCollections/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/dataCollections/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/dataCollections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/dataCollections/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/dataCollections/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/dataCollections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/dataCollections/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/dataCollections/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/dataCollections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/dataCollections/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/dataCollections/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/dataCollections/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/dataCollections/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/dataCollections/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/dataCollections/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/dataCollections/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/dataCollections/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/dataCollections/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/dataCollections/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/dataCollections/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/dataCollections/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-eac-and-pkc">EAC & PKC</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/eacs', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/eacs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/eacs',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/eacs`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/eacs')

print(r.json())

```

```java
URL obj = new URL("/api/eacs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/eacs',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/eacs`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/eacs/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/eacs/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/eacs/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/eacs/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/eacs/fields')

print(r.json())

```

```java
URL obj = new URL("/api/eacs/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/eacs/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/eacs/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/eacs/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/eacs/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/eacs/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/eacs/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/eacs/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/eacs/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/eacs/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/eacs/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/eacs/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/eacs/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/eacs/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/eacs/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/eacs/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/eacs/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/eacs/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/eacs/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/eacs/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/eacs/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/eacs/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/eacs/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/eacs/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/eacs/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/eacs/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/eacs/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/eacs/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/eacs/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/eacs/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/eacs/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-eac-and-pkc-sessions">EAC & PKC Sessions</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/sessions', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sessions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/sessions',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sessions`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/sessions')

print(r.json())

```

```java
URL obj = new URL("/api/sessions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sessions',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sessions`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/sessions/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/sessions/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sessions/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sessions/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/sessions/fields')

print(r.json())

```

```java
URL obj = new URL("/api/sessions/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sessions/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sessions/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/sessions/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sessions/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/sessions/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sessions/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/sessions/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sessions/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/sessions/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sessions/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/sessions/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sessions/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/sessions/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/sessions/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/sessions/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sessions/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/sessions/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/sessions/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/sessions/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sessions/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/sessions/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sessions/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/sessions/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/sessions/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sessions/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sessions/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/sessions/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sessions/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/sessions/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sessions/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-objectives">Objectives</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/objectives', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/objectives");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/objectives',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/objectives`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/objectives')

print(r.json())

```

```java
URL obj = new URL("/api/objectives");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/objectives',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/objectives`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/objectives/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/objectives/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/objectives/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/objectives/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/objectives/fields')

print(r.json())

```

```java
URL obj = new URL("/api/objectives/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/objectives/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/objectives/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/objectives/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/objectives/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/objectives/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/objectives/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/objectives/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/objectives/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/objectives/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/objectives/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/objectives/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/objectives/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/objectives/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/objectives/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/objectives/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/objectives/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/objectives/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/objectives/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/objectives/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/objectives/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/objectives/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/objectives/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/objectives/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/objectives/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/objectives/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/objectives/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/objectives/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/objectives/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/objectives/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/objectives/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-forms">Forms</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/forms', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/forms");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/forms',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/forms`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/forms')

print(r.json())

```

```java
URL obj = new URL("/api/forms");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/forms',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/forms`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/forms/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/forms/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/forms/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/forms/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/forms/fields')

print(r.json())

```

```java
URL obj = new URL("/api/forms/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/forms/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/forms/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/forms/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/forms/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/forms/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/forms/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/forms/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/forms/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/forms/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/forms/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/forms/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/forms/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/forms/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/forms/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/forms/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/forms/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/forms/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/forms/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/forms/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/forms/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/forms/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/forms/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/forms/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/forms/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/forms/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/forms/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/forms/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/forms/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/forms/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/forms/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-fields">Fields</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/fields', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/fields',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/fields`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/fields')

print(r.json())

```

```java
URL obj = new URL("/api/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/fields`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/fields/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/fields/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/fields/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/fields/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/fields/fields')

print(r.json())

```

```java
URL obj = new URL("/api/fields/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/fields/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/fields/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/fields/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/fields/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/fields/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/fields/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/fields/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/fields/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/fields/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/fields/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/fields/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/fields/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/fields/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/fields/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/fields/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/fields/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/fields/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/fields/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/fields/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/fields/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/fields/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/fields/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/fields/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/fields/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/fields/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/fields/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/fields/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/fields/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/fields/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/fields/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-form-sections">Form Sections</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/sections', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sections");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/sections',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sections`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/sections')

print(r.json())

```

```java
URL obj = new URL("/api/sections");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sections',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sections`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/sections/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/sections/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sections/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sections/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/sections/fields')

print(r.json())

```

```java
URL obj = new URL("/api/sections/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sections/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sections/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/sections/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sections/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/sections/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sections/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/sections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/sections/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sections/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/sections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/sections/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/sections/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/sections/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sections/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/sections/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/sections/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/sections/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sections/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/sections/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sections/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/sections/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/sections/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/sections/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/sections/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/sections/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/sections/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/sections/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/sections/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-phones">Phones</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/phones', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/phones");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/phones',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/phones`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/phones')

print(r.json())

```

```java
URL obj = new URL("/api/phones");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/phones',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/phones`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/phones/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/phones/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/phones/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/phones/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/phones/fields')

print(r.json())

```

```java
URL obj = new URL("/api/phones/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/phones/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/phones/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/phones/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/phones/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/phones/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/phones/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/phones/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/phones/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/phones/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/phones/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/phones/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/phones/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/phones/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/phones/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/phones/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/phones/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/phones/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/phones/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/phones/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/phones/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/phones/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/phones/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/phones/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/phones/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/phones/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/phones/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/phones/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/phones/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/phones/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/phones/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-networks">Networks</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/networks', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/networks");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/networks',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/networks`

> Body parameter

```json
{}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Object](#schemaobject)|true|none|

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/networks')

print(r.json())

```

```java
URL obj = new URL("/api/networks");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/networks',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/networks`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/networks/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/networks/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/networks/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/networks/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/networks/fields')

print(r.json())

```

```java
URL obj = new URL("/api/networks/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/networks/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/networks/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/networks/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/networks/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/networks/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/networks/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/networks/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/networks/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/networks/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/networks/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/networks/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/networks/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/networks/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/networks/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/networks/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/networks/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/networks/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/networks/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/networks/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/networks/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/networks/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/networks/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/networks/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/networks/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/networks/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/networks/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/networks/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/networks/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/networks/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/networks/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-menus">Menus</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/menus', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/menus");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "path": "string",
  "sortOrder": 0,
  "translations": {},
  "displayName": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/menus',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/menus`

> Body parameter

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "path": "string",
  "sortOrder": 0,
  "translations": {},
  "displayName": "string"
}
```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|[Menu](#schemamenu)|true|none|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "path": "string",
  "sortOrder": 0,
  "translations": {},
  "displayName": "string"
}
```

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[Menu](#schemamenu)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[UnauthorizedError](#schemaunauthorizederror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundError](#schemanotfounderror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests

r = requests.get('/api/menus')

print(r.json())

```

```java
URL obj = new URL("/api/menus");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/menus',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/menus`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Download

<a id="opIdDownload"></a>

> Code samples

```python
import requests

r = requests.get('/api/menus/downloads')

print(r.json())

```

```java
URL obj = new URL("/api/menus/downloads");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/menus/downloads',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/menus/downloads`

<h3 id="download-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="download-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Fields

<a id="opIdGet Fields"></a>

> Code samples

```python
import requests

r = requests.get('/api/menus/fields')

print(r.json())

```

```java
URL obj = new URL("/api/menus/fields");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/menus/fields',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/menus/fields`

<h3 id="get-fields-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-fields-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Bulky

<a id="opIdUpdate Bulky"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/api/menus/bulky', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/menus/bulky");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json'
};

fetch('/api/menus/bulky',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/menus/bulky`

> Body parameter

```json
"string"
```

<h3 id="update-bulky-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

<h3 id="update-bulky-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get One

<a id="opIdGet One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/menus/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/menus/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/menus/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/menus/{id}`

<h3 id="get-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 404 Response

```json
{}
```

<h3 id="get-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update One

<a id="opIdUpdate One"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/menus/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/menus/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/menus/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /api/menus/{id}`

> Body parameter

```json
"string"
```

<h3 id="update-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|string|true|none|

> Example responses

> 404 Response

```json
{}
```

<h3 id="update-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete One

<a id="opIdDelete One"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/menus/{id}', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/menus/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/menus/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /api/menus/{id}`

<h3 id="delete-one-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
"Record deleted successfully"
```

<h3 id="delete-one-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundErrorImpl](#schemanotfounderrorimpl)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="delete-one-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Upload Asset

<a id="opIdUpload Asset"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/menus/{id}/assets', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/menus/{id}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/menus/{id}/assets',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/menus/{id}/assets`

> Body parameter

```yaml
file: string

```

<h3 id="upload-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="upload-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get Asset

<a id="opIdGet Asset"></a>

> Code samples

```python
import requests

r = requests.get('/api/menus/{asset}/assets')

print(r.json())

```

```java
URL obj = new URL("/api/menus/{asset}/assets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/menus/{asset}/assets',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/menus/{asset}/assets`

<h3 id="get-asset-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|asset|path|string|true|none|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="get-asset-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Asset Not Found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

## Import

<a id="opIdImport"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data'
}

r = requests.post('/api/menus/imports', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/menus/imports");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data'
};

fetch('/api/menus/imports',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/menus/imports`

> Body parameter

```yaml
file: string

```

<h3 id="import-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

<h3 id="import-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-apps">Apps</h1>

## Create

<a id="opIdCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('/api/apps', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/apps");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'
};

fetch('/api/apps',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /api/apps`

> Body parameter

```yaml
file: string

```

<h3 id="create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|
|body|body|object|true|none|
|» file|body|string(binary)|false|none|

> Example responses

> 201 Response

```json
{
  "status": true,
  "message": "App uploaded successfully"
}
```

<h3 id="create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[UnauthorizedError](#schemaunauthorizederror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundError](#schemanotfounderror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<h3 id="create-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Heart Beats

<a id="opIdHeart Beats"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/status', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/status");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/status',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/status`

<h3 id="heart-beats-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 400 Response

```json
{
  "error": "At least one field should be filled"
}
```

<h3 id="heart-beats-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundError](#schemanotfounderror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

## Gear

<a id="opIdGear"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/images/icons/gear.png', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/images/icons/gear.png");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/images/icons/gear.png',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /images/icons/gear.png`

<h3 id="gear-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 400 Response

```json
{
  "error": "At least one field should be filled"
}
```

<h3 id="gear-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundError](#schemanotfounderror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

## Ico

<a id="opIdIco"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/favicon.ico', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/favicon.ico");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/favicon.ico',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /favicon.ico`

<h3 id="ico-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 400 Response

```json
{
  "error": "At least one field should be filled"
}
```

<h3 id="ico-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Record Not Found|[NotFoundError](#schemanotfounderror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opensync-enrollment-analytics">Enrollment Analytics</h1>

## Get Many

<a id="opIdGet Many"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/enrollmentAnalytics', headers = headers)

print(r.json())

```

```java
URL obj = new URL("/api/enrollmentAnalytics");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/enrollmentAnalytics',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/enrollmentAnalytics`

<h3 id="get-many-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

> Example responses

> 200 Response

```json
{
  "total": 10,
  "page": 1,
  "pageSize": 100,
  "Resource Name Plural": []
}
```

<h3 id="get-many-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[GetMany](#schemagetmany)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[BadRequestError](#schemabadrequesterror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|[UnauthorizedError](#schemaunauthorizederror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[InternalServerError](#schemainternalservererror)|

<aside class="success">
This operation does not require authentication
</aside>

## Generate Analytics

<a id="opIdGenerate Analytics"></a>

> Code samples

```python
import requests

r = requests.get('/api/enrollmentAnalytics/generate')

print(r.json())

```

```java
URL obj = new URL("/api/enrollmentAnalytics/generate");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```javascript

fetch('/api/enrollmentAnalytics/generate',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api/enrollmentAnalytics/generate`

<h3 id="generate-analytics-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|This specifies the page number to be returned in the response|
|pageSize|query|integer|false|This specifies the number of records to be returned in the response|
|fields|query|string|false|This specifies the fields to be returned in the response. You can also include relationships in this query|
|filter|query|array|false|This query is used to filter the response. You can add searches and filters in this query|

<h3 id="generate-analytics-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Login">Login</h2>
<!-- backwards compatibility -->
<a id="schemalogin"></a>
<a id="schema_Login"></a>
<a id="tocSlogin"></a>
<a id="tocslogin"></a>

```json
{
  "username": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_UnauthorizedError">UnauthorizedError</h2>
<!-- backwards compatibility -->
<a id="schemaunauthorizederror"></a>
<a id="schema_UnauthorizedError"></a>
<a id="tocSunauthorizederror"></a>
<a id="tocsunauthorizederror"></a>

```json
{
  "error": "Unauthorized"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|string|true|none|none|

<h2 id="tocS_InternalServerError">InternalServerError</h2>
<!-- backwards compatibility -->
<a id="schemainternalservererror"></a>
<a id="schema_InternalServerError"></a>
<a id="tocSinternalservererror"></a>
<a id="tocsinternalservererror"></a>

```json
{
  "error": "Internal server error"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|string|true|none|none|

<h2 id="tocS_NotFoundError">NotFoundError</h2>
<!-- backwards compatibility -->
<a id="schemanotfounderror"></a>
<a id="schema_NotFoundError"></a>
<a id="tocSnotfounderror"></a>
<a id="tocsnotfounderror"></a>

```json
{
  "error": "Record could not be found"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|string|true|none|none|

<h2 id="tocS_BadRequestError">BadRequestError</h2>
<!-- backwards compatibility -->
<a id="schemabadrequesterror"></a>
<a id="schema_BadRequestError"></a>
<a id="tocSbadrequesterror"></a>
<a id="tocsbadrequesterror"></a>

```json
{
  "error": "At least one field should be filled"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|string|true|none|none|

<h2 id="tocS_Object">Object</h2>
<!-- backwards compatibility -->
<a id="schemaobject"></a>
<a id="schema_Object"></a>
<a id="tocSobject"></a>
<a id="tocsobject"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_NotFoundErrorImpl">NotFoundErrorImpl</h2>
<!-- backwards compatibility -->
<a id="schemanotfounderrorimpl"></a>
<a id="schema_NotFoundErrorImpl"></a>
<a id="tocSnotfounderrorimpl"></a>
<a id="tocsnotfounderrorimpl"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_Menu">Menu</h2>
<!-- backwards compatibility -->
<a id="schemamenu"></a>
<a id="schema_Menu"></a>
<a id="tocSmenu"></a>
<a id="tocsmenu"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "path": "string",
  "sortOrder": 0,
  "translations": {},
  "displayName": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|path|string|true|none|none|
|sortOrder|number|true|none|none|
|translations|object|true|none|none|
|displayName|string|true|none|none|

<h2 id="tocS_GetMany">GetMany</h2>
<!-- backwards compatibility -->
<a id="schemagetmany"></a>
<a id="schema_GetMany"></a>
<a id="tocSgetmany"></a>
<a id="tocsgetmany"></a>

```json
{
  "total": 10,
  "page": 1,
  "pageSize": 100,
  "Resource Name Plural": []
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|total|number|true|none|none|
|page|number|true|none|none|
|pageSize|number|true|none|none|
|Resource Name Plural|[string]|true|none|none|

<h2 id="tocS_UserGroup">UserGroup</h2>
<!-- backwards compatibility -->
<a id="schemausergroup"></a>
<a id="schema_UserGroup"></a>
<a id="tocSusergroup"></a>
<a id="tocsusergroup"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {}
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|

<h2 id="tocS_OrganisationUnit">OrganisationUnit</h2>
<!-- backwards compatibility -->
<a id="schemaorganisationunit"></a>
<a id="schema_OrganisationUnit"></a>
<a id="tocSorganisationunit"></a>
<a id="tocsorganisationunit"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "shortName": "string",
  "ouPath": "string",
  "openingDate": "2019-08-24T14:15:22Z",
  "active": true,
  "level": 0,
  "data": true,
  "children": [
    {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "shortName": "string",
      "ouPath": "string",
      "openingDate": "2019-08-24T14:15:22Z",
      "active": true,
      "level": 0,
      "data": true,
      "children": [],
      "parent": {}
    }
  ],
  "parent": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "name": "string",
    "description": "string",
    "shortName": "string",
    "ouPath": "string",
    "openingDate": "2019-08-24T14:15:22Z",
    "active": true,
    "level": 0,
    "data": true,
    "children": [
      {}
    ],
    "parent": {}
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|shortName|string|true|none|none|
|ouPath|string|true|none|none|
|openingDate|string(date-time)|false|none|none|
|active|boolean|false|none|none|
|level|number|false|none|none|
|data|boolean|false|none|none|
|children|[[OrganisationUnit](#schemaorganisationunit)]|false|none|none|
|parent|[OrganisationUnit](#schemaorganisationunit)|true|none|none|

<h2 id="tocS_Role">Role</h2>
<!-- backwards compatibility -->
<a id="schemarole"></a>
<a id="schema_Role"></a>
<a id="tocSrole"></a>
<a id="tocsrole"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "system": true,
  "privileges": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|system|boolean¦null|true|none|none|
|privileges|[string]|true|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "phoneNumber": "string",
  "lastLogin": "2019-08-24T14:15:22Z",
  "email": "string",
  "username": "string",
  "dp": "string",
  "name": "string",
  "password": "string",
  "active": true,
  "userGroups": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {}
  },
  "organisationUnits": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "name": "string",
    "description": "string",
    "shortName": "string",
    "ouPath": "string",
    "openingDate": "2019-08-24T14:15:22Z",
    "active": true,
    "level": 0,
    "data": true,
    "children": [
      {}
    ],
    "parent": {}
  },
  "roles": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "system": true,
    "privileges": [
      "string"
    ]
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|phoneNumber|string|false|none|none|
|lastLogin|string(date-time)¦null|false|none|none|
|email|string¦null|false|none|none|
|username|string¦null|false|none|none|
|dp|string¦null|false|none|none|
|name|string|false|none|none|
|password|string|false|none|none|
|active|boolean|false|none|none|
|userGroups|[UserGroup](#schemausergroup)|false|none|none|
|organisationUnits|[OrganisationUnit](#schemaorganisationunit)|false|none|none|
|roles|[Role](#schemarole)|false|none|none|

<h2 id="tocS_Process">Process</h2>
<!-- backwards compatibility -->
<a id="schemaprocess"></a>
<a id="schema_Process"></a>
<a id="tocSprocess"></a>
<a id="tocsprocess"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "script": "string",
  "params": [
    "string"
  ],
  "download": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|script|string|true|none|none|
|params|[string]|false|none|none|
|download|boolean|false|none|none|

<h2 id="tocS_Task">Task</h2>
<!-- backwards compatibility -->
<a id="schematask"></a>
<a id="schema_Task"></a>
<a id="tocStask"></a>
<a id="tocstask"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "status": "string",
  "logs": [
    "string"
  ],
  "started": "2019-08-24T14:15:22Z",
  "ended": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|status|string|false|none|none|
|logs|[string]|false|none|none|
|started|string(date-time)|false|none|none|
|ended|string(date-time)|false|none|none|

<h2 id="tocS_Schedule">Schedule</h2>
<!-- backwards compatibility -->
<a id="schemaschedule"></a>
<a id="schema_Schedule"></a>
<a id="tocSschedule"></a>
<a id="tocsschedule"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "logs": [
    "string"
  ],
  "started": "2019-08-24T14:15:22Z",
  "ended": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|logs|[string]|false|none|none|
|started|string(date-time)|false|none|none|
|ended|string(date-time)|false|none|none|

<h2 id="tocS_Privilege">Privilege</h2>
<!-- backwards compatibility -->
<a id="schemaprivilege"></a>
<a id="schema_Privilege"></a>
<a id="tocSprivilege"></a>
<a id="tocsprivilege"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "system": true,
  "name": "string",
  "value": "string",
  "description": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|system|boolean¦null|true|none|none|
|name|string|true|none|none|
|value|string|true|none|none|
|description|string|false|none|none|

<h2 id="tocS_Objective">Objective</h2>
<!-- backwards compatibility -->
<a id="schemaobjective"></a>
<a id="schema_Objective"></a>
<a id="tocSobjective"></a>
<a id="tocsobjective"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "organisationUnits": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|organisationUnits|[string]|true|none|none|

<h2 id="tocS_Enrollment">Enrollment</h2>
<!-- backwards compatibility -->
<a id="schemaenrollment"></a>
<a id="schema_Enrollment"></a>
<a id="tocSenrollment"></a>
<a id="tocsenrollment"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "status": {},
  "studyId": "string",
  "ctcId": "string",
  "recentVisit": "2019-08-24T14:15:22Z",
  "participantConsent": true,
  "informedConsent": true,
  "followupConsent": true,
  "mobileAccess": true,
  "fundsConfirmation": true,
  "landmark": "string",
  "village": "string",
  "middleName": "string",
  "nickName": "string",
  "motherName": "string",
  "hbcName": "string",
  "hbcNumber": "string",
  "firstName": "string",
  "surname": "string",
  "dob": "2019-08-24T14:15:22Z",
  "enrollmentDate": "2019-08-24T14:15:22Z",
  "screeningId": "string",
  "appointment": "2019-08-24T14:15:22Z",
  "scheduledReturn": "2019-08-24T14:15:22Z",
  "assessmentDate": "2019-08-24T14:15:22Z",
  "viralLoadDate": "2019-08-24T14:15:22Z",
  "counsellingDate": "2019-08-24T14:15:22Z",
  "clinicalInterventionVisit": "2019-08-24T14:15:22Z",
  "clinicalControlVisit": "2019-08-24T14:15:22Z",
  "returnMobileNumber": true,
  "mainConsentStudy": true,
  "consentToBeContacted": true,
  "completeBaselineSurvey": true,
  "currentEnrolled": true,
  "gender": "Male",
  "objective": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "name": "string",
    "description": "string",
    "organisationUnits": [
      "string"
    ]
  },
  "organisationUnit": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "name": "string",
    "description": "string",
    "shortName": "string",
    "ouPath": "string",
    "openingDate": "2019-08-24T14:15:22Z",
    "active": true,
    "level": 0,
    "data": true,
    "children": [
      {}
    ],
    "parent": {}
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|status|object|false|none|none|
|studyId|string|false|none|none|
|ctcId|string|true|none|none|
|recentVisit|string(date-time)|false|none|none|
|participantConsent|boolean|false|none|none|
|informedConsent|boolean|false|none|none|
|followupConsent|boolean|false|none|none|
|mobileAccess|boolean|false|none|none|
|fundsConfirmation|boolean|false|none|none|
|landmark|string|false|none|none|
|village|string|false|none|none|
|middleName|string|false|none|none|
|nickName|string|false|none|none|
|motherName|string|false|none|none|
|hbcName|string|false|none|none|
|hbcNumber|string|false|none|none|
|firstName|string|true|none|none|
|surname|string|true|none|none|
|dob|string(date-time)|true|none|none|
|enrollmentDate|string(date-time)|false|none|none|
|screeningId|string|false|none|none|
|appointment|string(date-time)|false|none|none|
|scheduledReturn|string(date-time)|false|none|none|
|assessmentDate|string(date-time)|false|none|none|
|viralLoadDate|string(date-time)|false|none|none|
|counsellingDate|string(date-time)|false|none|none|
|clinicalInterventionVisit|string(date-time)|false|none|none|
|clinicalControlVisit|string(date-time)|false|none|none|
|returnMobileNumber|boolean|false|none|none|
|mainConsentStudy|boolean|false|none|none|
|consentToBeContacted|boolean|false|none|none|
|completeBaselineSurvey|boolean|false|none|none|
|currentEnrolled|boolean|false|none|none|
|gender|string|true|none|none|
|objective|[Objective](#schemaobjective)|true|none|none|
|organisationUnit|[OrganisationUnit](#schemaorganisationunit)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|gender|Male|
|gender|Female|

<h2 id="tocS_Field">Field</h2>
<!-- backwards compatibility -->
<a id="schemafield"></a>
<a id="schema_Field"></a>
<a id="tocSfield"></a>
<a id="tocsfield"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "translations": [
    "string"
  ],
  "options": {},
  "value": "string",
  "futureDate": true,
  "pastDate": true,
  "validation": "string",
  "displayInList": true,
  "mandatory": true,
  "sortOrder": 0,
  "type": {}
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|translations|[string]|false|none|none|
|options|object|false|none|none|
|value|string|true|none|none|
|futureDate|boolean|true|none|none|
|pastDate|boolean|true|none|none|
|validation|string|true|none|none|
|displayInList|boolean|true|none|none|
|mandatory|boolean|false|none|none|
|sortOrder|number|false|none|none|
|type|object|true|none|none|

<h2 id="tocS_Section">Section</h2>
<!-- backwards compatibility -->
<a id="schemasection"></a>
<a id="schema_Section"></a>
<a id="tocSsection"></a>
<a id="tocssection"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "translations": {},
  "sortOrder": 0,
  "form": {},
  "fields": [
    {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "translations": [
        "string"
      ],
      "options": {},
      "value": "string",
      "futureDate": true,
      "pastDate": true,
      "validation": "string",
      "displayInList": true,
      "mandatory": true,
      "sortOrder": 0,
      "type": {}
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|translations|object|false|none|none|
|sortOrder|number|false|none|none|
|form|object|true|none|none|
|fields|[[Field](#schemafield)]|false|none|none|

<h2 id="tocS_Form">Form</h2>
<!-- backwards compatibility -->
<a id="schemaform"></a>
<a id="schema_Form"></a>
<a id="tocSform"></a>
<a id="tocsform"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "translations": {},
  "fields": [
    {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "translations": [
        "string"
      ],
      "options": {},
      "value": "string",
      "futureDate": true,
      "pastDate": true,
      "validation": "string",
      "displayInList": true,
      "mandatory": true,
      "sortOrder": 0,
      "type": {}
    }
  ],
  "sections": [
    {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "translations": {},
      "sortOrder": 0,
      "form": {},
      "fields": [
        {
          "id": "string",
          "created": "2019-08-24T14:15:22Z",
          "updated": "2019-08-24T14:15:22Z",
          "deleted": "2019-08-24T14:15:22Z",
          "code": "string",
          "createdBy": {},
          "updatedBy": {},
          "name": "string",
          "description": "string",
          "translations": [
            "string"
          ],
          "options": {},
          "value": "string",
          "futureDate": true,
          "pastDate": true,
          "validation": "string",
          "displayInList": true,
          "mandatory": true,
          "sortOrder": 0,
          "type": {}
        }
      ]
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|translations|object|false|none|none|
|fields|[[Field](#schemafield)]|false|none|none|
|sections|[[Section](#schemasection)]|false|none|none|

<h2 id="tocS_Network">Network</h2>
<!-- backwards compatibility -->
<a id="schemanetwork"></a>
<a id="schema_Network"></a>
<a id="tocSnetwork"></a>
<a id="tocsnetwork"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "name": "string",
  "description": "string",
  "operator": "string",
  "fee": 0,
  "cash": 0,
  "status": "string",
  "utilitycode": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|name|string|true|none|none|
|description|string¦null|false|none|none|
|operator|string|true|none|none|
|fee|number|true|none|none|
|cash|number|true|none|none|
|status|string|true|none|none|
|utilitycode|string|true|none|none|

<h2 id="tocS_Phone">Phone</h2>
<!-- backwards compatibility -->
<a id="schemaphone"></a>
<a id="schema_Phone"></a>
<a id="tocSphone"></a>
<a id="tocsphone"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "phone": "string",
  "personal": true,
  "mobileMoneyAccount": true,
  "name": "string",
  "enrollment": {},
  "network": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "name": "string",
    "description": "string",
    "operator": "string",
    "fee": 0,
    "cash": 0,
    "status": "string",
    "utilitycode": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|phone|string|true|none|none|
|personal|boolean|false|none|none|
|mobileMoneyAccount|boolean|false|none|none|
|name|string|false|none|none|
|enrollment|object|true|none|none|
|network|[Network](#schemanetwork)|true|none|none|

<h2 id="tocS_Followup">Followup</h2>
<!-- backwards compatibility -->
<a id="schemafollowup"></a>
<a id="schema_Followup"></a>
<a id="tocSfollowup"></a>
<a id="tocsfollowup"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "enrollment": {},
  "nextVisit": "2019-08-24T14:15:22Z",
  "firstReturn": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|enrollment|object|true|none|none|
|nextVisit|string(date-time)|false|none|none|
|firstReturn|string(date-time)|false|none|none|

<h2 id="tocS_Disbursement">Disbursement</h2>
<!-- backwards compatibility -->
<a id="schemadisbursement"></a>
<a id="schema_Disbursement"></a>
<a id="tocSdisbursement"></a>
<a id="tocsdisbursement"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "enrollment": {},
  "mobileNetwork": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "name": "string",
    "description": "string",
    "operator": "string",
    "fee": 0,
    "cash": 0,
    "status": "string",
    "utilitycode": "string"
  },
  "amount": 0,
  "reference": "string",
  "resultcode": "string",
  "transid": "string",
  "result": "string",
  "message": "string",
  "utilityref": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|enrollment|object|true|none|none|
|mobileNetwork|[Network](#schemanetwork)|true|none|none|
|amount|number|true|none|none|
|reference|string|false|none|none|
|resultcode|string|false|none|none|
|transid|string|false|none|none|
|result|string|false|none|none|
|message|string|false|none|none|
|utilityref|string|false|none|none|

<h2 id="tocS_BloodCollection">BloodCollection</h2>
<!-- backwards compatibility -->
<a id="schemabloodcollection"></a>
<a id="schema_BloodCollection"></a>
<a id="tocSbloodcollection"></a>
<a id="tocsbloodcollection"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "enrollment": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "status": {},
    "studyId": "string",
    "ctcId": "string",
    "recentVisit": "2019-08-24T14:15:22Z",
    "participantConsent": true,
    "informedConsent": true,
    "followupConsent": true,
    "mobileAccess": true,
    "fundsConfirmation": true,
    "landmark": "string",
    "village": "string",
    "middleName": "string",
    "nickName": "string",
    "motherName": "string",
    "hbcName": "string",
    "hbcNumber": "string",
    "firstName": "string",
    "surname": "string",
    "dob": "2019-08-24T14:15:22Z",
    "enrollmentDate": "2019-08-24T14:15:22Z",
    "screeningId": "string",
    "appointment": "2019-08-24T14:15:22Z",
    "scheduledReturn": "2019-08-24T14:15:22Z",
    "assessmentDate": "2019-08-24T14:15:22Z",
    "viralLoadDate": "2019-08-24T14:15:22Z",
    "counsellingDate": "2019-08-24T14:15:22Z",
    "clinicalInterventionVisit": "2019-08-24T14:15:22Z",
    "clinicalControlVisit": "2019-08-24T14:15:22Z",
    "returnMobileNumber": true,
    "mainConsentStudy": true,
    "consentToBeContacted": true,
    "completeBaselineSurvey": true,
    "currentEnrolled": true,
    "gender": "Male",
    "objective": {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "organisationUnits": [
        "string"
      ]
    },
    "organisationUnit": {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "shortName": "string",
      "ouPath": "string",
      "openingDate": "2019-08-24T14:15:22Z",
      "active": true,
      "level": 0,
      "data": true,
      "children": [
        {}
      ],
      "parent": {}
    }
  },
  "mdhCollection": "string",
  "result": "string",
  "resultDate": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|enrollment|[Enrollment](#schemaenrollment)|true|none|none|
|mdhCollection|string|false|none|none|
|result|string|false|none|none|
|resultDate|string(date-time)|false|none|none|

<h2 id="tocS_DataCollection">DataCollection</h2>
<!-- backwards compatibility -->
<a id="schemadatacollection"></a>
<a id="schema_DataCollection"></a>
<a id="tocSdatacollection"></a>
<a id="tocsdatacollection"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "enrollment": {},
  "mdhStatus": "string",
  "baselineSurvey": "2019-08-24T14:15:22Z",
  "completed": "2019-08-24T14:15:22Z",
  "midlineHvlSample": "2019-08-24T14:15:22Z",
  "midlineHvlResult": "2019-08-24T14:15:22Z",
  "endlineHvlSample": "2019-08-24T14:15:22Z",
  "endlineHvlResult": "2019-08-24T14:15:22Z",
  "endlineSurvey": "2019-08-24T14:15:22Z",
  "midlineHvlStatus": "COMPLETE",
  "baselineSurveyStatus": "COMPLETE",
  "endlineSurveyStatus": "COMPLETE"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|enrollment|object|true|none|none|
|mdhStatus|string|true|none|none|
|baselineSurvey|string(date-time)|false|none|none|
|completed|string(date-time)|false|none|none|
|midlineHvlSample|string(date-time)|false|none|none|
|midlineHvlResult|string(date-time)|false|none|none|
|endlineHvlSample|string(date-time)|false|none|none|
|endlineHvlResult|string(date-time)|false|none|none|
|endlineSurvey|string(date-time)|false|none|none|
|midlineHvlStatus|string|false|none|none|
|baselineSurveyStatus|string|false|none|none|
|endlineSurveyStatus|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|midlineHvlStatus|COMPLETE|
|midlineHvlStatus|OVERDUE|
|midlineHvlStatus|READY|
|midlineHvlStatus|NOT READY|
|midlineHvlStatus|RECEIVED|
|midlineHvlStatus|FAILED|
|midlineHvlStatus|INVALID|
|midlineHvlStatus|REJECTED|
|midlineHvlStatus|UNREVIEWED|
|midlineHvlStatus|-|
|baselineSurveyStatus|COMPLETE|
|baselineSurveyStatus|OVERDUE|
|baselineSurveyStatus|READY|
|baselineSurveyStatus|NOT READY|
|baselineSurveyStatus|RECEIVED|
|endlineSurveyStatus|COMPLETE|
|endlineSurveyStatus|OVERDUE|
|endlineSurveyStatus|READY|
|endlineSurveyStatus|NOT READY|
|endlineSurveyStatus|RECEIVED|

<h2 id="tocS_EacSession">EacSession</h2>
<!-- backwards compatibility -->
<a id="schemaeacsession"></a>
<a id="schema_EacSession"></a>
<a id="tocSeacsession"></a>
<a id="tocseacsession"></a>

```json
{
  "id": "string",
  "session": {},
  "created": "2019-08-24T14:15:22Z",
  "date": "2019-08-24T14:15:22Z",
  "eac": {}
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|session|object|true|none|none|
|created|string(date-time)|false|none|none|
|date|string(date-time)|false|none|none|
|eac|object|true|none|none|

<h2 id="tocS_Eac">Eac</h2>
<!-- backwards compatibility -->
<a id="schemaeac"></a>
<a id="schema_Eac"></a>
<a id="tocSeac"></a>
<a id="tocseac"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "deleted": "2019-08-24T14:15:22Z",
  "code": "string",
  "createdBy": {},
  "updatedBy": {},
  "enrollment": {
    "id": "string",
    "created": "2019-08-24T14:15:22Z",
    "updated": "2019-08-24T14:15:22Z",
    "deleted": "2019-08-24T14:15:22Z",
    "code": "string",
    "createdBy": {},
    "updatedBy": {},
    "status": {},
    "studyId": "string",
    "ctcId": "string",
    "recentVisit": "2019-08-24T14:15:22Z",
    "participantConsent": true,
    "informedConsent": true,
    "followupConsent": true,
    "mobileAccess": true,
    "fundsConfirmation": true,
    "landmark": "string",
    "village": "string",
    "middleName": "string",
    "nickName": "string",
    "motherName": "string",
    "hbcName": "string",
    "hbcNumber": "string",
    "firstName": "string",
    "surname": "string",
    "dob": "2019-08-24T14:15:22Z",
    "enrollmentDate": "2019-08-24T14:15:22Z",
    "screeningId": "string",
    "appointment": "2019-08-24T14:15:22Z",
    "scheduledReturn": "2019-08-24T14:15:22Z",
    "assessmentDate": "2019-08-24T14:15:22Z",
    "viralLoadDate": "2019-08-24T14:15:22Z",
    "counsellingDate": "2019-08-24T14:15:22Z",
    "clinicalInterventionVisit": "2019-08-24T14:15:22Z",
    "clinicalControlVisit": "2019-08-24T14:15:22Z",
    "returnMobileNumber": true,
    "mainConsentStudy": true,
    "consentToBeContacted": true,
    "completeBaselineSurvey": true,
    "currentEnrolled": true,
    "gender": "Male",
    "objective": {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "organisationUnits": [
        "string"
      ]
    },
    "organisationUnit": {
      "id": "string",
      "created": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "deleted": "2019-08-24T14:15:22Z",
      "code": "string",
      "createdBy": {},
      "updatedBy": {},
      "name": "string",
      "description": "string",
      "shortName": "string",
      "ouPath": "string",
      "openingDate": "2019-08-24T14:15:22Z",
      "active": true,
      "level": 0,
      "data": true,
      "children": [
        {}
      ],
      "parent": {}
    }
  },
  "sessionDate": "2019-08-24T14:15:22Z",
  "verified": true,
  "correctMotherName": true,
  "controlDate": "2019-08-24T14:15:22Z",
  "interventionDate": "2019-08-24T14:15:22Z",
  "contactStill": true,
  "sessions": [
    {
      "id": "string",
      "session": {},
      "created": "2019-08-24T14:15:22Z",
      "date": "2019-08-24T14:15:22Z",
      "eac": {}
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|
|deleted|string(date-time)|false|none|none|
|code|string|false|none|none|
|createdBy|object¦null|false|none|none|
|updatedBy|object¦null|false|none|none|
|enrollment|[Enrollment](#schemaenrollment)|true|none|none|
|sessionDate|string(date-time)|false|none|none|
|verified|boolean|false|none|none|
|correctMotherName|boolean|false|none|none|
|controlDate|string(date-time)|false|none|none|
|interventionDate|string(date-time)|false|none|none|
|contactStill|boolean|false|none|none|
|sessions|[[EacSession](#schemaeacsession)]|false|none|none|

<h2 id="tocS_EnrollmentAnalytics">EnrollmentAnalytics</h2>
<!-- backwards compatibility -->
<a id="schemaenrollmentanalytics"></a>
<a id="schema_EnrollmentAnalytics"></a>
<a id="tocSenrollmentanalytics"></a>
<a id="tocsenrollmentanalytics"></a>

```json
{
  "id": "string",
  "created": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|created|string(date-time)|false|none|none|
|updated|string(date-time)|false|none|none|

