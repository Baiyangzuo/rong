/*!
 * table For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-06
 */

import g from 'g';
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
        };
        let profiles = 'username tel score gender sid client loan city education professional has_social_security has_accumulation_fund house_property car'.split(' ');
        let profiles_cn = '姓名 手机 评分 性别 渠道 终端 贷款金额 城市 学历 职业 社保 公积金 房产 汽车'.split(' ');

        // 缓存数据
        this.config('data', this.clone(this.getData()));
        // 是否开启分页
        this.config('page') && this.pagination();

        // 重建Map
        if(!data.map){
            data.map = {};
            g.getKeyArray(data.list[0]).forEach(key => {
                // 在注册字段之前插入个人资料字段
                if(key === 'createdAt'){
                    profiles.forEach((item, i) => {
                        data.map[item] = profiles_cn[i]
                    })
                    data.map[key] = '注册时间'
                }
                else{
                    data.map[key] = key
                }
            })
        }

        delete data.map.profile;
        data.profileField = profiles;
    }

    prerender(app) {
        this.ctrl();
        this.getExcel();
        this.paginator();
        // 表格格式化
        this.format();
    }

    postrender(app) {

    }

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
        if(!this.config('page')) return;
        let data = this.getData();
        let length = this.config('page.length');
        let total = Math.ceil(data.list.length/length);
        this.config('page.total', total);
        data.list = data.list.slice(0, length);
    }

    // 加载分页模块
    paginator() {
        this.find('.pagination').jqPaginator({
            totalPages: this.config('page.total') || 1,
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
                    this.format();
                }
            }
        })
    }

    getExcel() {
        let type = this.config('datetype');
        if(type === undefined) return;
        this.on('click', '.glyphicon-save', e => {
            $.ajax({
                url: '/rose/getExcel',
                type: 'POST',
                data: {date: type},
                success: id => {
                    location.href = '/rose/getExcel?id=' + id;
                },
                error: xhr => {
                    alert(xhr.status + ': ' + xhr.responseText)
                }
            })
        })
    }

    ctrl() {
        if(!this.config('ctrl')) return;
        // Add ctrl
        this.find('thead [data-type="ctrl"]').length ||
        this.find('thead > tr').append(
            aimee.$('th[data-type="ctrl"]').html(
                aimee.create('button.btn.btn-default.glyphicon.glyphicon-save')
            )
        )
        this.find('tbody> tr').each((i, tr) => {
            $(tr).append(aimee.$('td[data-type="ctrl"]>.inner').html(
                aimee.$('button.btn.btn-default.glyphicon.glyphicon-trash')
            ))
        })
    }

    format() {
        // Format Gender
        this.find('td[data-type="gender"] .inner').each(function(){
            var text = this.innerText;
            text === 'Male' ?
                $(this).html(aimee.$('span').addClass('label label-sm label-info').text(text)):
                $(this).html(aimee.$('span').addClass('label label-sm label-pink').text(text));
        });
        this.find('td[data-type="score"] .inner').each(function(){
            var num = !isNaN(this.innerText) ?
                    Number(this.innerText) : 0;

            if(num < 3){
                $(this).html(aimee.$('span').addClass('label label-sm label-danger').text(num));
            }
            if(num >= 3 && num <= 5){
                $(this).html(aimee.$('span').addClass('label label-sm label-warning').text(num));
            }
            if(num > 5 && num <= 7){
                $(this).html(aimee.$('span').addClass('label label-sm label-success').text(num));
            }
            if(num > 7){
                $(this).html(aimee.$('span').addClass('label label-sm label-high').text(num));
            }
        });
    }
}

export default table;
