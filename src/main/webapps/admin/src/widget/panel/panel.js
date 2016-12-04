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
        this.initScroll()
        this.initFields()
    }

    // app渲染到页面之前执行，用于预处理渲染内容
    prerender(app) {
        this.find('.btn-scroll').on('click', function(){
            $(this).hasClass('selected') ? app.removeScroll() : app.addScroll();
        })
        this.find('.btn-fields').on('click', function(){
            $(this).hasClass('selected') ? app.hideFields() : app.showFields();
        })
    }

    // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
    postrender(app) {
        this.isScroll ? app.addScroll() : app.removeScroll();
        this.isFields ? app.showFields() : app.hideFields();
    }

    // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
    pagerender(app) {
        // some code
    }

    initScroll() {
        // 默认显示滚动条
        localStorage.isScroll === undefined ? localStorage.isScroll = true : false;
        // 检查缓存是否显示表格滚动条
        this.isScroll = localStorage.isScroll === 'true' ? true : false;
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

    initFields() {
        // 默认隐藏非必要字段
        localStorage.isFields === undefined ? localStorage.isFields = true : false;
        // 检查缓存是否显示非必要字段
        this.isFields = localStorage.isFields === 'true' ? true : false;
    }

    showFields() {
        this.page.addClass('hideFields')
        this.find('.btn-fields').addClass('selected')
        localStorage.isFields = true;
    }

    hideFields() {
        this.page.removeClass('hideFields')
        this.find('.btn-fields').removeClass('selected')
        localStorage.isFields = false;
    }
}

export default panel;
