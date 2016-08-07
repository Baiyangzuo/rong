/*!
 * loading2 For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-07-27
 */

import App from 'app';
import template from 'loading2.jade';

class loading2 extends App {

    constructor() {
        super();
        this.name = 'loading2';
        this.template = template;
    }

    // app渲染到页面之前执行，用于预处理渲染内容
    prerender(app) {
        // app为模块的实例
        // your code
    }

    // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
    postrender(app) {
        // app为模块的实例
    }

    // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
    pagerender(app) {
        // some code
    }

    msg(val) {
        this.find('.msg').text(val);
        return this;
    }

    center() {
        var top = -this.getApp().height()/2 + 'px';
        var left = -this.getApp().width()/2 + 'px';
        this.getApp().addClass('ap').css({marginLeft: left, marginTop: top});
        return this;
    }
}

export default loading2;
