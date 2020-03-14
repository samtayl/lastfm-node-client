const crypto = require("crypto");
const https = require("https");
const querystring = require("querystring");

class ApiRequest {
	/**
	 * Create an ApiRequest instance
	 */

	constructor() {
		this.params = new Map().set("format", "json");
	}

	/**
	 * Set elements in ApiRequest.params
	 * @param {Object} params - Object whose entries to set in ApiRequest.params
	 */

	set(params) {
		Object
			.entries(params)
			.forEach(([key, value]) => this.params.set(key, value));

		return this;
	}

	/**
	 * Sign an API request
	 * @param {string} secret - API secret of an API account
	 * @returns {ApiRequest}
	 */

	sign(secret) {
		const paramsObj = {};

		this.params.forEach((value, key) => paramsObj[key] = value);

		// We must stringify then parse the params object so that the request signature is made from an identical set of paramaters that will be sent in the url

		const paramsObjParsed = querystring.parse(querystring.stringify(paramsObj));
		const paramsStr = Array.from(Object.entries(paramsObjParsed))
			.filter(([key]) => key !== "format" && key !== "callback")
			.sort(([a], [b]) => {
				for (let i = 0; i < a.length || i < b.length; i++) {
					const charCodeA = a.charCodeAt(i) || 0;
					const charCodeB = b.charCodeAt(i) || 0;

					if (charCodeA < charCodeB) {
						return -1;
					}

					if (charCodeA > charCodeB) {
						return 1;
					}
				}

				return 0;
			})
			.map(param => param.join(""))
			.join("");

		this.params.set(
			"api_sig",
			crypto
				.createHash("md5")
				.update(paramsStr + secret)
				.digest("hex")
		);

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

		if (this.params.has("callback")) {
			this.params.delete("callback");
		}

		const paramsObj = {};

		this.params.forEach((value, key) => paramsObj[key] = value);

		const paramsStr = querystring.stringify(paramsObj);
		const options = {
			hostname: "ws.audioscrobbler.com",
			path: "/2.0"
		};

		if (method === "POST") {
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
			const httpRequest = https.request(options, httpResponse => {
				let data = "";

				httpResponse.setEncoding("utf8");
				httpResponse.on("data", chunk => data += chunk);
				httpResponse.on("end", () => resolve(data));
				httpResponse.on("error", err => reject(err));
			});

			httpRequest.on("error", err => reject(err));

			if (method === "POST") {
				httpRequest.write(paramsStr);
			}

			httpRequest.end();
		}).then(apiResponse => {
			let data;

			try {
				data = JSON.parse(apiResponse);
			}
			catch (err) {
				throw new Error("Unable to parse API response to JSON");
			}

			if (data.error) {
				throw new Error(data.message);
			}

			return data;
		});

		if (callback) {
			apiRequest.then(data => callback(null, data), err => callback(err, null));

			return undefined;
		}

		return apiRequest;
	}
}

module.exports = ApiRequest;
