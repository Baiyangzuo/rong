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
        // 配置文件数据模型
        let CONFIGMODEL = {
            // 所有数据
            data: {},
            // 是否需要分页
            page: {
                // 单页数据量，用户配置
                length: 10,
                // 总页数，自动计算
                totalPages: 10
            },
            // 操作列 删除-复制-编辑
            ctrl: 'delete.copy.edit'
        }

        // 缓存数据
        this.config('data', this.clone(this.getData()));
        // 是否开启分页
        this.config('page') && this.pagination();
    }

    // app渲染到页面之前执行，用于预处理渲染内容
    prerender(app) {
        this.config('page') && this.paginator();
        this.config('ctrl') && this.ctrl();
    }

    // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
    postrender(app) {
        // app为模块的实例
    }

    // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
    pagerender(app) {
        // some code
    }

    // 获取当前分页的数据
    getPageData(index) {
        let data = this.clone(this.config('data'));
        let length = this.config('page.length');
        let listLength = data.list.length;
        let skip = index * length;
        let page = skip + length;
        data.list = data.list.slice(skip, page <= listLength ? page : listLength);
        return data;
    }

    // 渲染当前分页
    getCurrentPage(index) {
        this.find('tbody').replaceWith(this.tbody(this.getPageData(index)))
    }

    // 计算分页
    pagination() {
        let data = this.getData();
        let length = this.config('page.length');
        let total = data.list.length/length;
        this.config('page.total', total);
        data.list = data.list.slice(0, length);
    }

    // 加载分页模块
    paginator() {
        this.find('.pagination').jqPaginator({
            totalPages: this.config('page.total'),
            visiblePages: 5,
            currentPage: 1,
            first: aimee.create('li.first>a{首页}'),
            last: aimee.create('li.last>a{尾页}'),
            prev: aimee.create('li.prev>a>i.fa.fa-angle-left'),
            next: aimee.create('li.next>a>i.fa.fa-angle-right'),
            page: aimee.create('li.page>a{{{page}}}'),
            onPageChange: (num, type) => {
                if(type === 'change'){
                    this.getCurrentPage(num-1);
                    this.config('ctrl') && this.ctrl();
                }
            }
        })
    }

    ctrl() {
        // Add ctrl
        this.find('thead [data-type="ctrl"]').length ||
        this.find('thead > tr').append(
            aimee.$('th[data-type="ctrl"]').text('Control')
        )
        this.find('tbody> tr').each((i, tr) => {
            $(tr).append(aimee.$('td[data-type="ctrl"]>.inner').html(
                aimee.$('button.btn.btn-default.glyphicon.glyphicon-trash')
            ))
        })
    }
}

export default table;
