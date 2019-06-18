const { URL, URLSearchParams } = require("url");
const crypto = require("crypto");
const http = require("http");

function httpRequest(options, reqBody, callback) {
	const request = http.request(options, response => {
		let resBody = "";

		response.on("data", data => {
			resBody += data;
		});

		response.on("end", () => {
			callback(null, JSON.parse(resBody));
		});

		response.on("error", err => {
			callback(err, null);
		});
	});

	request.on("error", err => {
		callback(err, null);
	});

	if(options.method === "POST") {
		request.write(reqBody);
	}

	request.end();
}

class ApiRequest {
	/**
	 * Create an ApiRequest instance
	 */

	constructor() {
		this.format = "json";
	}

	/**
	 * Set properties of an ApiRequest
	 * @param {Object} object - Properties to set
	 */

	set(object) {
		Object.assign(this, object);

		return this;
	}

	/**
	 * Sign an API request
	 * @param {string} secret - API secret of an API account
	 * @returns {ApiRequest}
	 */

	sign(secret) {
		const params = Object
			.entries(this)
			.sort(([a], [b]) => {
				for(let i = 0; i < a.length && i < b.length; i++) {
					if(a.charCodeAt(i) < b.charCodeAt(i)) {
						return -1;
					}
			
					if(a.charCodeAt(i) > b.charCodeAt(i)) {
						return 1;
					}
				}
			
				if(a.length > b.length) {
					return -1;
				}
			
				if(a.length < b.length) {
					return 1;
				}
			
				return 0;
			});

		let paramString = "";

		for(const [name, value] of params) {
			if(name !== "format" && name !== "callback") {
				paramString += name + value;
			}
		}

		this.api_sig = crypto
			.createHash("md5")
			.update(paramString + secret)
			.digest("hex");

		return this;
	}

	/**
	 * Send an API request
	 * @param {string} [method] - HTTP request method of API request
	 * @param {Function} [callback] - Callback of API request
	 */

	send(...args) {
		const method = typeof args[0] === "string" ? args[0] : undefined;
		const callback = args.length > 1 ? typeof args[1] === "function" ? args[1] : undefined : typeof args[0] === "function" ? args[0] : undefined;
		const apiRoot = new URL("http://ws.audioscrobbler.com/2.0/");
		const querystring = new URLSearchParams(this).toString();
		const options = {
			"hostname": apiRoot.hostname,
			"path": apiRoot.pathname
		};

		if(method === "POST") {
			options.method = "POST";
			options.headers = {
				"Content-Length": Buffer.byteLength(querystring),
				"Content-Type": "application/x-www-form-urlencoded"
			};
		}
		else {
			options.path += `?${querystring}`;
		}

		if(callback) {
			httpRequest(options, querystring, callback);

			return;
		}

		return new Promise((resolve, reject) => httpRequest(options, querystring, (err, data) => {
			if(err) {
				reject(err);

				return;
			}

			resolve(data);
		}));
	}
}

module.exports = ApiRequest;
