;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        window.Page = factory();
    }
}(function(){
    var Page = Aimee.create();
    Page.include({
        init: function(){

        },

        enter: function(){

        },

        reg: function(){
            this.init();
            this.enter();
        },

        bind: function(events) {
            var it = this;
            events = events || {};
            $.each(events, function(key, fn){
                var pair = key.split('@');
                var evts = pair[0].split(/,\s*/g);
                evts.forEach(function(type){
                    it.$dom.on(type, pair[1], fn);
                });
            });
        }
    });
    return Page;
}));
