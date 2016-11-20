/*!
 * panel For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-06
 */

import App from 'app';
import template from 'panel.jade';

class panel extends App {

    constructor() {
        super();
        this.name = 'panel';
        this.template = template;
    }

    onload() {
        // 默认显示滚动条
        localStorage.isScroll === undefined ? localStorage.isScroll = true : false;
        // 检查缓存是否显示表格滚动条
        this.isScroll = localStorage.isScroll === 'true' ? true : false;
    }

    // app渲染到页面之前执行，用于预处理渲染内容
    prerender(app) {
        this.find('.btn-scroll').on('click', function(){
            $(this).hasClass('selected') ? app.removeScroll() : app.addScroll();
        })
    }

    // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
    postrender(app) {
        this.isScroll ? app.addScroll() : app.removeScroll();
    }

    // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
    pagerender(app) {
        // some code
    }

    addScroll() {
        this.page.addClass('overflow')
        this.find('.btn-scroll').addClass('selected')
        localStorage.isScroll = true;
    }

    removeScroll() {
        this.page.removeClass('overflow')
        this.find('.btn-scroll').removeClass('selected')
        localStorage.isScroll = false;
    }
}

export default panel;
