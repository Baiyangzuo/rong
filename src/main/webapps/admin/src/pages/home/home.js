/*!
 * home For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-page
 * Date: 2016-08-06
 */

import Page from 'page';
import template from 'home.jade';
import * as Map from 'map';

class home extends Page {

    constructor() {
        super();
        this.name = 'home';
        this.template = template;
    }

    get ajaxconfig() {
        return {
            url: '/rose/api/getUsers?date=0',
            dataType: 'json'
        }
    }

    onload() {
        aimee.app.loading2.show().center()
    }

    prerender(data) {
        console.group('今天注册数据：')
        console.log(data)
        console.groupEnd()

        this.exports('header footer')
        this.exports('header-bar')
        // this.exports('breadcrumb')

        this.use({
            // // 构建基础统计
            // 'panel^1': app => {
            //     app
            //         .init({title: 'STATS'})
            //         .config('action.date', true)
            //         .config('icon.className', 'icon-bar-chart theme-font')
            //         .render().addClass('col-md-6 col-sm-12');
            //     this.use('stats')
            //         .init().render(app.find('.portlet-body'));
            // },
            //
            // // 构建转化率
            // 'panel^2': app => {
            //     app
            //         .init({title: 'CONVERSION'})
            //         .config('action.date', true)
            //         .config('icon.className', 'icon-bar-chart theme-font')
            //         .render().addClass('col-md-6 col-sm-12');
            //     this.use('conversion')
            //         .init()
            //         .render(app.find('.portlet-body'));
            // },

            // 构建用户表
            'panel^3': app => {
                app
                    .init({title: 'USER'})
                    .config('action.date', true)
                    .config('icon.className', 'fa fa-user font-green-sharp')
                    .render()
                    .addClass('col-md-12 panel-user')
                    .find('.portlet-body')
                    .append(aimee.create('#today'))
                    .append(aimee.create('#week'))
                    .append(aimee.create('#month'))
                    .append(aimee.create('#all'));
                this.use('table')
                    .init(data.data)
                    // 日期类型
                    .config('datetype', 0)
                    // 单页长度
                    .config('page.length', 15)
                    .config('ctrl', 'delete')
                    .render(app.find('#today'));
            }
        })

        this.bind({
            'click@.btn-date': e => {
                this.loadData($(e.target).attr('data-type') || 0);
            },

            'click@.lincoapp-header-bar': e => {
                // console.log(99)
            },

            'click@.btn-sm': function(){
                let it = $(this);
                let i = it.index();
                let parent = it.parents('.lincoapp-panel');
                let tables = parent.find('.lincoapp-table');
                it.addClass('active').siblings('.active').removeClass('active');
                tables.eq(i).length ?
                    tables.eq(i).show().siblings().hide():
                    tables.hide();
            }
        })

    }

    postrender(data) {
        this.autoscreen();
    }

    enter() {
        aimee.app.loading2.hide();
    }

    leave() {

    }

    // Full page
    autoscreen() {
        let container = this.find('.page-container');
        let headerHeight = this.query('header').getApp().height();
        let footerHeight = this.query('footer').getApp().height();
        let minHeight = window.innerHeight - headerHeight - footerHeight;
        container.css('min-height', minHeight + 'px');
    }

    loadData(type) {
        let $dom = this.find('.panel-user').find(Map.dateType[type]);
        if($dom.length){
            aimee.app.loading2.show();
            $.ajax({
                url: '/rose/api/getUsers?date=' + type,
                type: 'GET',
                success: data => {
                    this.use('table')
                    .init(data.data)
                    .config('page.length', 15)
                    .config('datetype', type)
                    .render($dom);
                    aimee.app.loading2.hide();
                },
                error: err => {
                    console.log(err)
                    alert(err)
                }
            })
        }
    }

    loadMonthData() {

    }
}

export default new home;
