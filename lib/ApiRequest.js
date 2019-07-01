const querystring = require('querystring');
const crypto = require("crypto");
const http = require("http");

function httpRequest(options, reqBody) {
	return new Promise((resolve, reject) => {
		const request = http.request(options, response => {
			let resBody = "";

			response.setEncoding("utf8");

			response.on("data", data => {
				resBody += data;
			});

			response.on("end", () => {
				resolve({
					statusCode: response.statusCode,
					body: resBody
				});
			});

			response.on("error", err => {
				reject(err);
			});
		});

		request.on("error", err => {
			reject(err);
		});

		if(options.method === "POST") {
			request.write(reqBody);
		}

		request.end();
	});
}

class ApiRequest {
	/**
	 * Create an ApiRequest instance
	 */

	constructor() {
		Object.defineProperty(this, "format", {
			value: "json",
			enumerable: true
		});
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
		const paramsString = Object
			.entries(this)
			.filter(([name]) => name !== "format" && name !== "callback")
			.sort(([a], [b]) => {
				for(let i = 0; i <= a.length || i <= b.length; i++) {
					const charCodeA = a.charCodeAt(i) || 0;
					const charCodeB = b.charCodeAt(i) || 0;

					if(charCodeA < charCodeB) {
						return -1;
					}

					if(charCodeA > charCodeB) {
						return 1;
					}
				}
			})
			.map(param => param.join(""))
			.join("");

		this.api_sig = crypto
			.createHash("md5")
			.update(paramsString + secret)
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

		if(this.callback) {
			delete this.callback;
		}

		const query = querystring.stringify(this);
		const options = {
			"hostname": "ws.audioscrobbler.com",
			"path": "/2.0"
		};

		if(method === "POST") {
			options.method = "POST";
			options.headers = {
				"Content-Length": Buffer.byteLength(query),
				"Content-Type": "application/x-www-form-urlencoded"
			};
		}
		else {
			options.path += `?${query}`;
		}

		const request = httpRequest(options, query)
			.then(response => {
				return new Promise((resolve, reject) => {
					let data;

					try {
						data = JSON.parse(response.body);
					}
					catch(err) {
						data = null;
					}

					if(!data) {
						reject(new Error(`${response.statusCode}: ${http.STATUS_CODES[response.statusCode]}`));

						return;
					}

					if(data.error) {
						reject(new Error(`${data.error}: ${data.message}`));

						return;
					}

					resolve(data);
				});
			});

		if(callback) {
			request
				.then(data => {
					callback(null, data);
				})
				.catch(err => {
					callback(err, null);
				});
		}
		else {
			return request;
		}
	}
}

module.exports = ApiRequest;
