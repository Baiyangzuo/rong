/*!
 * table For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-06
 */

import App from 'app';
import tbody from 'tbody.jade';
import template from 'table.jade';

class table extends App {

    constructor() {
        super();
        this.name = 'table';
        this.tbody = tbody;
        this.template = template;
    }

    onload() {
        let data = this.getData();
        let length = this.config('length');
        let total = data.list.length/length;
        this.config('total', total);
        this.config('data', this.getNewData(data));
        data.list = data.list.slice(0, length);
    }

    // app渲染到页面之前执行，用于预处理渲染内容
    prerender(app) {
        this.pagination()
    }

    // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
    postrender(app) {
        // app为模块的实例
    }

    // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
    pagerender(app) {
        // some code
    }

    getNewData(data) {
        return this.extend(true, {}, data)
    }

    getPageData(index) {
        let length = this.config('length');
        let skip = index * length;
        let data = this.getNewData(this.config('data'));
        data.list = data.list.slice(skip, skip+length);
        return data;
    }

    getCurrentPage(index) {
        this.find('tbody').replaceWith(this.tbody(this.getPageData(index)))
    }

    pagination() {
        this.find('.pagination').jqPaginator({
            totalPages: this.config('total'),
            visiblePages: 5,
            currentPage: 1,
            first: aimee.create('li.first>a{首页}'),
            last: aimee.create('li.last>a{尾页}'),
            prev: aimee.create('li.prev>a>i.fa.fa-angle-left'),
            next: aimee.create('li.next>a>i.fa.fa-angle-right'),
            page: aimee.create('li.page>a{{{page}}}'),
            onPageChange: (num, type) => {
                type !== 'change' || this.getCurrentPage(num-1)
            }
        })
    }
}

export default table;
