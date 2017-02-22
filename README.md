# xhr

XmlHttpRequest for your es5 projects. Required features only.

##Getting started

Include this library. 

    <sctipt src="path/to/Xhr.js"></script>

```

* Make request: 


    xhr.post('http://url.com',{data:123}).then(function(response){...},function(err){...});


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

BOWER: 

    bower install kysonic/xht#es5





