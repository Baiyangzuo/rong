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
            this.init()
            this.enter()
        },

        bind: function(events) {
            events = events || {};
            $.each(events, (key, fn) => {
                let pair = key.split('@');
                let evts = pair[0].split(/,\s*/g);
                evts.forEach((type) => {
                    this.$dom.on(type, pair[1], fn)
                })
            })
        }
    });
    return Page;
}));
