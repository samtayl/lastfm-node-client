const crypto = require("crypto");
const http = require("http");
const querystring = require("querystring");

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
			.filter(([key]) => key !== "format" && key !== "callback")
			.sort(([a], [b]) => {
				for(let i = 0; i < a.length || i < b.length; i++) {
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
			.flat()
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

	send(method, callback) {
		callback = callback === undefined ? typeof method === "function" ? method : undefined : typeof callback === "function" ? callback : undefined;
		method = typeof method === "string" ? method : undefined;

		const paramsObj = Object.fromEntries(Object
			.entries(this)
			.filter(([key]) => key !== "callback")
		);

		const paramsStr = querystring.stringify(paramsObj);
		const options = {
			"hostname": "ws.audioscrobbler.com",
			"path": "/2.0"
		};

		if(method === "POST") {
			options.method = "POST";
			options.headers = {
				"Content-Length": Buffer.byteLength(paramsStr),
				"Content-Type": "application/x-www-form-urlencoded"
			};
		}
		else {
			options.path += `?${paramsStr}`;
		}

		const apiRequest = new Promise((resolve, reject) => {
			const httpRequest = http.request(options, httpResponse => {
				let data = "";
	
				httpResponse.setEncoding("utf8");
				httpResponse.on("data", chunk => data += chunk);
				httpResponse.on("end", () => resolve(data));
				httpResponse.on("error", err => reject(err));
			});
	
			httpRequest.on("error", err => reject(err));
	
			if(method === "POST") {
				httpRequest.write(paramsStr);
			}
	
			httpRequest.end();
		}).then(apiResponse => {
			let data;

			try {
				data = JSON.parse(apiResponse);
			}
			catch {
				throw new Error("Unable to parse API response to JSON");
			}

			if(data.error) {
				throw new Error(data.message);
			}

			return data;
		});

		if(callback) {
			apiRequest.then(data => callback(null, data), err => callback(err, null));
		}
		else {
			return apiRequest;
		}
	}
}

module.exports = ApiRequest;
