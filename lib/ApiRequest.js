const { URL, URLSearchParams } = require("url");
const crypto = require("crypto");
const http = require("http");

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
		const params = Object.entries(this).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
		let paramString = "";

		for(const [name, value] of params) {
			if(name !== "format" && name !== "callback") {
				paramString += name + value;
			}
		}

		this.api_sig = crypto.createHash("md5").update(paramString + secret).digest("hex");
		return this;
	}

	/**
	 * Actually send an API Request
	 * @param {Object} options - Options of an API request
	 * @param {string} body - Body of an API request
	 * @param {Function} callback - Callback of API request
	 */

	_actuallySend(options, body, callback) {
		const request = http.request(options, response => {
			let body = "";

			response.on("data", data => {
				body += data;
			});

			response.on("end", () => {
				callback(null, JSON.parse(body));
			});

			response.on("error", err => {
				callback(err, null);
			});
		});

		request.on("error", err => {
			callback(err, null);
		});

		if(options.method === "POST") {
			request.write(body);
		}

		request.end();
	}
	
	/**
	 * Send an API request
	 * @param {string} [method] - HTTP request method of API request
	 * @param {Function} [callback] - Callback of API request
	 */

	send(method, callback) {
		const apiRoot = new URL("http://ws.audioscrobbler.com/2.0/");
		const querystring = (new URLSearchParams(this)).toString();
		const options = { hostname: apiRoot.hostname };

		if(!callback) {
			 if(typeof method === "function") {
				callback = method;
				method = null;
			}
		}

		if(typeof callback !== "function") {
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

		if(callback) {
			this._actuallySend(options, querystring, callback);
			return;
		}

		return new Promise((resolve, reject) => {
			this._actuallySend(options, querystring, (err, data) => {
				if(err) {
					reject(err);
					return;
				}

				resolve(data);
			});
		});
	}
}

module.exports = ApiRequest;
