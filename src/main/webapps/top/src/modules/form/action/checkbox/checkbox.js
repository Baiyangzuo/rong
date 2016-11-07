import App from 'form/app';
import guid from 'guid';

class Input extends App{

    constructor() {
        super();
        this.guid = guid();
        this.template = require('checkbox.jade');
        // 初始化
        this.attr({class: 'checkbox', guid: this.guid});
    }

    reset() {
        this.$dom.val('');
        return this;
    }

    create(map) {
        var prop, data, defaultItem, index;

        // 缓存data
        this.data = data = [];
        // 缓存dataMap
        this.dataMap = map;

        defaultItem = map['default'];

        for(prop in map){
            if(prop !== 'default'){
                if(prop === defaultItem){
                    data.push({
                        value: prop,
                        alias: map[prop],
                        selected: true
                    })
                }
                else{
                    data.push({
                        value: prop,
                        alias: map[prop]
                    })
                }
            }
        };

        // 渲染SELECT
        this.$dom.append(this.template({list: data}));

        return this;
    }

    getData() {
        return this.$dom.find('.selected').attr('data-value');
    }

    action() {
        this.$dom.delegate('.item', 'click', function(){
            $(this).addClass('selected').siblings().removeClass('selected')
        })
    }
}

export default Input;
