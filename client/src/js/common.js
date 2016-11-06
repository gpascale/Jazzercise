
var common = {
  // TODO: Move this to some kind of shared module or find a library to use
  GET: function(url, success, failure) {
    if (typeof(failure) == undefined) {
      failure = function() {
	console.error("failed to GET " + url);
      };
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200)
	success && success(xhr.responseText);
      else
	failure();
    };
    xhr.send();
  },

  GETJSON: function(url, success, failure) {
    common.GET(url, function(response) {
      success(JSON.parse(response));
    }, failure);
  }
}

export default common