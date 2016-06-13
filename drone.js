
var Drone = function (config) {
  this.config = config;
  this.server = config && config.server;
  this.token = config && config.token;
}

Drone.prototype.getRepo = function(owner, name) {
  var endpoint = ["/api/repos", owner, name].join("/");
  return this._get(endpoint);
}

Drone.prototype.getRepoList = function(opts) {

}

Drone.prototype.postRepo = function(repo) {

}

Drone.prototype.putRepo = function(repo) {

}

Drone.prototype.deleteRepo = function(repo) {

}

Drone.prototype.getBuild = function(repo, number) {
  var endpoint = ["/api/repos", repo.owner, repo.name, "builds", number].join("/");
  return this._get(endpoint);
}

Drone.prototype.getBuildList = function(repo, opts) {
  var endpoint = ["/api/repos", repo.owner, repo.name, "builds"].join("/");
  return this._get(endpoint);
}

Drone.prototype.getLogs = function(repo, build, number) {

}

Drone.prototype.getLogStream = function(repo, build, number) {

}

Drone.prototype.getUser = function(login) {

}

Drone.prototype.getCurrentUser = function() {
  var self = this;
  var endpoint = [this.server, "api/user"].join("/");

  return new Promise(function (resolve, reject) {
    self._get(endpoint, this.token, function(err, response) {
      if (err != null) {
        reject(err);
      } else {
        resolve(JSON.parse(response));
      }
    });
  });
}

Drone.prototype.getToken = function() {

}

Drone.prototype._get = function(path) {
  return this._request("GET", path, null);
}

Drone.prototype._put = function(path, data) {
  return this._request("PUT", path, data);
}

Drone.prototype._post = function(path, data) {
  return this._request("POST", path, data);
}

Drone.prototype._patch = function(path, data) {
  return this._request("PATCH", path, data);
}

Drone.prototype._delete = function(path) {
  return this._request("DELETE", path, null);
}

Drone.prototype._request = function(method, path, data) {
  var endpoint = [this.server, path].join("");
  var xhr = new XMLHttpRequest();
  xhr.open(method, endpoint, true);
  if (this.token) {
    xhr.setRequestHeader("Authorization", "Bearer "+this.token);
  }
  return new Promise(function (resolve, reject) {
    xhr.onload = function () {
      if (xhr.status >= 300) {
        reject(xhr);
      } else {
        resolve(JSON.parse(xhr.response));
      }
    };
    xhr.onerror = function () {
      reject(xhr.response);
    };
    xhr.send();
  });
}

// http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
