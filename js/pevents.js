pevents = new function(){
    
    var self   = this;
    this.sender = null;
    
    this.init = function(){
        chrome.runtime.onMessage.addListener(
            function (request,sender) {
                //console.info('runtime message',request,sender);
                request.data.sender = sender;
                self.call(request.act,request.data);
            }
        )
        return this;
    }
    
    this.list = {};
    
    this.on = function(act,callback){
        self.list[act] = callback;
        return this;
    }
    
    this.call = function(act,data){
        if(self.list[act]){
            self.list[act](data);
        }
        return this;
    }
    
    this.send = function(act,data,callback){
        var res = chrome.runtime.sendMessage({
            act    : act,
            data   : data
        });
        if(callback){
            callback(res);
        }
    }
    
    this.sendPage = function(act,data){
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            //console.log('sendPage',tabs);
            chrome.tabs.sendMessage(tabs[0].id, {
                act    : act,
                data   : data
            }, function () {
                    //console.log(response);
                });
            });
    }
}


