/*
При этом будет обязательно показано окно «Сохранить как...»
Курить здесь chrome.downloads
 */
var result = JSON.stringify(localStorage, "", 4),
        obj = {
            "filename": "localStorage.json",
            "url": 'data:application/json;charset=utf-8,' + encodeURIComponent(result),
            "conflictAction": "prompt",
            "saveAs": true
        };
chrome.downloads.download(obj);

/*
 * 
 */
chrome.extension.sendMessage({data:'vasa'}, function(backMessage){
	console.log(backMessage);
});
/**/
chrome.extension.onMessage.addListener(function(request, sender, callback){
		console.log('request', request);
		callback({data:{name:'test'}});
});


