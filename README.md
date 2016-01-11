# xhr

XmlHttpRequest for your es6 projects. Required features only.

##Getting started

* Import this class: 

```
import Xhr from './Xhr.js';
```

* Create new xhr instance with certain options: 

```
var xhr = new Xhr({json:true}); 
```

* Make request: 

```
xhr.post('http://url.com',{data:123}).then(function(response){...},function(err){...});
```

##Options

- *withCredentials* - Adds cookie and auth data to request.
- *contentType* - content type header.
- *json* - Handle response as JSON.

##Methods 

Supported methods are: 

- *GET* - xhr.get(url).
- *POST* - xhr.post(url,data).
- *PUT* - xhr.put(url,data).
- *DELETE* - xhr.delete(url). 

Main method: 

```
xhr.send(url, method, data);
```

## Installation

Npm:

```
npm install kysonic-es6-xhr --save-dev
```

GIT: 

```
git clone https://github.com/kysonic/xhr.git
```





