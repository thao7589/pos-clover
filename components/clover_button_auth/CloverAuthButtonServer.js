var PageComponent=require("ds.base/PageComponent");
	
var CloverAuthButtonServer = PageComponent.create({
    "/": function(attributes, vars) {
		//var items=[];
		   var url="https://sandbox.dev.clover.com/oauth/authorize";
		   var clientId = Configuration.getParametricValue('dev.pos_clover','app_id');
		   var redirectUrl = Configuration.getParametricValue('dev.pos_clover','redirect_url');
		   var auth_url = url + '?client_id=' + clientId + '&redirect_uri=' + redirectUrl;
        return new StatusResponse('good', { url: auth_url });
    },
	type : "CloverAuthButtonServer"
});

module.exports = CloverAuthButtonServer;