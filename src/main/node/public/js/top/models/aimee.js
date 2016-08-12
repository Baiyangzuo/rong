;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        window.Aimee = factory();
    }
}(function create(parent) {
    function Aimee(){
        this.constructor.apply(this, arguments)
    }
    if (parent) {
        var child = function(){};
        child.prototype = parent.prototype;
        Aimee.prototype = new child;
    };
    Aimee.prototype.constructor = function() {};
    Aimee.fn = Aimee.prototype;
    Aimee.extend = Aimee.fn.extend = function(){
        $.extend.apply(this, arguments);
        return this;
    };
    Aimee.include = function(obj){
        Aimee.fn.extend(obj);
    };
    Aimee.create = create;
    return Aimee;
}));
