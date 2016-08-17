/*!
 * header For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-06
 */

import App from 'app';
import cookie from 'cookie';
import template from 'header.jade';

class header extends App {

    constructor() {
        super();
        this.name = 'header';
        this.template = template;
    }

    onload() {

    }

    // app渲染到页面之前执行，用于预处理渲染内容
    prerender(app) {
        this.on('click', '.linkto', function(){
            $.get('/rose/logout', msg => {
                location.reload()
            })
        })
        // Show login username
        this.find('.username').text(cookie.get('loginUsername'))
    }

    // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
    postrender(app) {
        // app为模块的实例
    }

    // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
    pagerender(app) {
        // some code
    }
}

export default header;
