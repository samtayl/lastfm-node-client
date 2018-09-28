const { URL, URLSearchParams } = require("url");
const crypto = require("crypto");
const http = require("http");
const proto = {};

function createRequest(apiPackage, apiMethod, apiKey, params, sessionKey) {
	const request = Object.create(proto);

	Object.assign(request, params);
	
	request.method = apiPackage + "." + apiMethod;
	request.api_key = apiKey;
	request.format = "json";

	if(sessionKey) {
		request.sk = sessionKey;
	}

	if(request.callback) {
		delete request.callback;
	}
	
	return request;
}

proto.sign = function sign(secret) {
	const params = Object.entries(this).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
	let paramString = "";

	for(const [name, value] of params) {
		if(name !== "format" && name !== "callback") {
			paramString += name + value;
		}
	}

	this.api_sig = crypto.createHash("md5").update(paramString + secret).digest("hex");
	return this;
};

proto.send = function send(method, callback) {
	const apiRoot = new URL("http://ws.audioscrobbler.com/2.0/");
	const querystring = (new URLSearchParams(this)).toString();
	const options = { hostname: apiRoot.hostname };

	if(!callback) {
	 	if(typeof method === "function") {
			callback = method;
			method = null;
		}
	}
	else if(typeof callback !== "function") {
		callback = null;
	}

	if(method === "POST") {
		options.method = "POST";
		options.path = apiRoot.pathname;
		options.headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": Buffer.byteLength(querystring)
		};
	}
	else {
		options.path = apiRoot.pathname + "?" + querystring;
	}

	function request() {
		return new Promise(function(resolve, reject) {
			function success(data) {
				if(callback) {
					callback(null, data);
				}
				else {
					resolve(data);
				}
			}
		
			function failure(err) {
				if(callback) {
					callback(err);
				}
				else {
					reject(err);
				}
			}
	
			const request = http.request(options, function(response) {
				let body = "";
	
				response.on("data", function(data) {
					body += data;
				});
	
				response.on("end", function() {
					success(JSON.parse(body));
				});
	
				response.on("error", function(err) {
					failure(err);
				});
			});
	
			request.on("error", function(err) {
				failure(err);
			});
	
			request.end(querystring);
		});
	}

	const response = request();

	if(!callback) {
		return response;
	}
};

module.exports = createRequest;
