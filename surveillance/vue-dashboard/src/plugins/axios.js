"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// http://api.qingyunke.com/api.php?key=free&appid=0&msg=
let config = {
	// baseURL: "",
	timeout: 300 * 1000, // Timeout
	withCredentials: true
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
	function(config) {
		var newObject = config;
		//set csrg_token 
		var cookies = document.cookie;
		if (cookies.indexOf("csrf_token") > -1) {
			let array = cookies.split(";");
			array.map(item => {
				if (item.indexOf("csrf_token") > -1) {
					let csrf_token = item.replace(/[^0-9]/ig,"") ;
					newObject.headers["X-CSRF-Token"] = csrf_token;
					localStorage.setItem("csrf",csrf_token);
				}
			})
		}
		
		//set login auto 
		if (config.params && config.params.rememberMe) {
			newObject.headers["X-Life"] = "aweek";
		}
		
		//set body === params
		if (config.method == "post" || config.method == "patch") {
			config.data = config.params;
		}
		
		// config.data = config.params;
		// Do something before request is sent
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
_axios.interceptors.response.use(
	function(response) {
		if (response.status === 200) {
			return response.data
		} else {
			return Promise.reject(response.data.code);
		}
	},
	function(error) {
		let errorCode = error.response.status ; 
		if (errorCode==401){
			errorCode = error.response.data.code ; 
		}
		return Promise.reject(errorCode);
	}
);

Plugin.install = function(Vue, options) {
	Vue.axios = _axios;
	window.axios = _axios;
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios;
			}
		},
		$axios: {
			get() {
				return _axios;
			}
		},
	});
};

Vue.use(Plugin)

export default Plugin;
