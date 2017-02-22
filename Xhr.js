var xhr = function(){
  return {
    opts: {
      contentType: 'application/json',
      handleAs: 'json',
      preventCache:false,
      formData: false,
      withCredentials: false
    },
    events: {
      READY_STATE_CHANGE: 'readystatechange',
      LOAD_START: 'loadstart',
      PROGRESS: 'progress',
      ABORT: 'abort',
      ERROR: 'error',
      LOAD: 'load',
      TIMEOUT: 'timeout',
      LOAD_END: 'loadend'
    },
    /**
     * Main method. Will help to create new xhr object. Work with it.
     * And finally send it.
     * @param url - url on which will be made request
     * @param method - HTTP method
     * @data - body of request.
     */
    send: function (url, method, data) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = this.opts.withCredentials;
        var m = method || 'GET';
        xhr.open(m, url+(this.opts.preventCache?/\?/.test(url)?'&t='+Math.random():'?t='+Math.random():''));
        // Set headers
        if(!this.opts.formData) xhr.setRequestHeader('Content-Type', this.opts.contentType);
        //if(this.opts.handleAs) xhr.setRequestHeader('accept', 'application/json');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        // Parse data
        data = data ? this.parseData(data) : null;
        // When request is loaded
        xhr.addEventListener(this.events.LOAD, function () {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status==0) {
            var responseText = '';
            if (xhr.responseText) {
              try {
                responseText = this.opts.handleAs=='json' ? JSON.parse(xhr.responseText) : xhr.responseText;
              }catch(e){
                reject(this.reject(xhr))
              }
            }
            resolve(responseText, xhr);
          } else {
            reject(this.reject(xhr));
          }
        }.bind(this));
        // Handle basic events
        xhr.addEventListener(this.events.ABORT, function () {
          return reject(this.reject(xhr));
        }.bind(this));
        xhr.addEventListener(this.events.ERROR, function () {
          return reject(this.reject(xhr));
        }.bind(this));
        xhr.addEventListener(this.events.TIMEOUT, function () {
          return reject(this.reject(xhr));
        }.bind(this));
        // Send request
        data ? xhr.send(data) : xhr.send();
      }.bind(this));
    },
    /**
     * When request got negative response
     * handle it
     */
    reject: function(xhr) {
      var responseText = '';
      if (xhr.responseText) {
        try {
          responseText = this.opts.handleAs=='json' ? JSON.parse(xhr.responseText) : xhr.responseText;
        }catch(e){
          responseText = 'Parsing error '+ e.message;
        }
      }
      return responseText;
    },
    /**
     * Parse data to convert it in query string or JSON.
     * @param data
     * @returns {Array}
     */
    parseData: function(data){
      if(this.opts.formData && data instanceof FormData) return data;
      // JSON
      if(this.opts.contentType=='application/json') return JSON.stringify(data);
      // Query string
      var query = [];
      if(((typeof data).toLowerCase()=='string') || (typeof data).toLowerCase()=='number') {
        query.push(data);
      }else {
        for (var key in data) {
          query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
      }
      return query.join('&');
    },
    /**
     * GET Wrapper
     * @param url
     * @returns {*}
     */
    get: function(url){
      return this.send(url);
    },
    /**
     * POST Wrapper
     * @param url
     * @param data
     * @returns {*}
     */
    post: function(url,data){
      return this.send(url,'POST',data);
    },
    /**
     * DELETE Wrapper
     * @param url
     * @returns {*}
     */
    delete: function(url,data) {
      return this.send(url,'DELETE',data);
    },
    /**
     * PUT Wrapper
     * @param url
     * @param data
     * @returns {*}
     */
    put: function(url,data) {
      return this.send(url,'PUT',data);
    }
  }
}();
