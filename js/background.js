/*
 
 chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  console.log('token',token)
});
 
 */

back = new function(){
    var self = this;
    this.ready = function(callback){
        if('jQuery' in window && 'pevents' in window){
            callback();
        }else{
            setTimeout(function(){
                self.ready(callback);
            },100);
        }
    }
    
}

back.ready(function(){
    pevents.init()
        .on('getTags',function(){
            pevents.sendPage('getHashTags',{});
        })
        .on('sendTags',function(data){
            pevents.send('returnTags',{tags:data.tags});
        })
});

/*
 
 chrome.runtime.onMessage.addListener(
            function (request) {
                console.log('request send',request); return {act:"test",data:request}
            }
        )
 
 */
