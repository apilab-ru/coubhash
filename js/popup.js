;ui = new function(){
    var self = this;
    
    this.check = function(){
        pevents.send('getTags',{});
        /*chrome.extension.sendMessage({act: 'getHashTags'}, function (tags) {
            console.log(tags);
            $('.res').val( tags );
        });*/
    }
    
    this.capitalize = function (s)
    {
        return s[0].toUpperCase() + s.slice(1);
    }
    
    this.stops = [
        'Anime',
        'Аниме',
        'Coub',
        'Coubamv',
        'Amvcoub',
        'Амв'
    ];
    
    this.convert = function(){
        var t = $('.res').val();
        t = t.replace(/[^0-9A-Za-zА-Яа-я]/gim, ' ');
        var list = t.split(" ");
        for (var i = 0; i < list.length; i++) {
            if (list[i]) {
                list[i] = self.capitalize(list[i]);
            } else {
                delete(list[i]);
            }
        }

        var tag = list.join('');
        if (self.stops.indexOf(tag) == -1) {
            $('.res').val( tag ).focus();
        }
    }
};
$(function(){
    actionCheck.onclick = ui.check;
    actionConvert.onclick = ui.convert;
    pevents.init()
            .on('returnTags',function(data){
                $('.res').val( data.tags ).focus();
            });
            chrome.browserAction.onClicked.addListener(function(tab) {
                ui.check();
            });
    /*pevents.init()
        .on('toBack',function(data){
            console.log('to back',data);
            pevents.send('getBack',data);
        })
        .on('returnBack',function(data){
            //pevents.send('returnContent',data);
            console.log('return back');
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    act: "returnContent", data: data
                }, function () {
                    //console.log(response);
                });
            });
        })*/
});

