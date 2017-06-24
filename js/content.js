app = new function(){
    var self = this;
    
    this.ready = function (callback) {
        if ('jQuery' in window && 'app' in window) {
            callback();
        } else {
            setTimeout(function () {
                self.ready(callback);
            }, 100);
        }
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
    
    this.getHashTags = function(){
        
        var arr = [];
        
        $('.coub__tags-wrap a').each(function(n,i){ 
            var t = $(i).text(); 
            t = t.replace(/[^0-9A-Za-zА-Яа-я]/gim,' ');
            var list = t.split(" ");
            for(var i=0;i<list.length;i++){
                if(list[i]){
                    list[i] = self.capitalize(list[i]);
                }else{
                    delete(list[i]);
                }
            }
            
            var tag = list.join('');
            if(self.stops.indexOf(tag)==-1){
                arr.push( "#"+tag );
            }
        });
        
        return "#abmv #anime #аниме #coub \n" +
                arr.join(" ") + "\n"
                + location.href;
    }
    
}

app.ready(function(){
    pevents.init()
        .on('getHashTags',function(){
             var tags = app.getHashTags();
             pevents.send('sendTags',{tags:tags});
        })
});