(function(win){
	var getJSONP = win.getJSONP = {
		jsonp: function(obj){
			var url = obj["url"];
			var jsonp = obj["jsonp"];
			var jsonpCallback = obj["jsonpCallback"];
			var data = obj["data"];
			var success = obj["success"];
			var dataStr = "";
			for (var prop in data) { 
				dataStr += ("&" + prop + "=" + data[prop]);
			}
			dataStr = ("?" + dataStr.slice(1));
			jsonp == null ? jsonp = "callback" : null;
			jsonpCallback == null ? jsonpCallback = "callbackFun" + (new Date).getTime(): null;
			var funStr = "&" + jsonp + "=" + jsonpCallback;
			var src = url + dataStr + funStr;
			var script = document.createElement('script');
	        script.setAttribute("type", "text/javascript");
	        script.src = src;
	        document.body.appendChild(script);
	        window[jsonpCallback] = success;
	        script.onload = script.onreadystatechange = function(){
				if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
	        		document.body.removeChild(script);
				}
			}
		},
		getScript: function(obj){
			var url = obj["url"];
			var data = obj["data"];
			var success = obj["success"];
			var dataStr = "";
			for (var prop in data) { 
				dataStr += ("&" + prop + "=" + data[prop]);
			}
			dataStr = ("?" + dataStr.slice(1));
			var src = url + dataStr;
			var script = document.createElement('script');
	        script.setAttribute("type", "text/javascript");
	        script.src = src;
	        document.body.appendChild(script);
	        script.onload = script.onreadystatechange = function(){
	        	success();
				if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
	        		document.body.removeChild(script);
				}
			}
		}
			
	}

})(window);