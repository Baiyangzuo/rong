/*!
 * home For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-page
 * Date: 2016-08-06
 */

import Page from 'page';
import template from 'home.jade';

class home extends Page {

    constructor() {
        super();
        this.name = 'home';
        this.template = template;
    }

    get ajaxconfig() {
        return {
            url: '/tmp/test.json',
            dataType: 'json'
        }
    }

    onload() {
        aimee.app.loading2.show().center()
    }

    prerender(data) {
        let Table = require('table')
        data = data || this.getData()

        this.exports('header footer')
        this.exports('header-bar')
        this.exports('breadcrumb')

        this.use({
            // 构建基础统计
            'panel^1': app => {
                app
                    .init({title: 'STATS'})
                    .config('action.date', true)
                    .config('icon.className', 'icon-bar-chart theme-font')
                    .render().addClass('col-md-6 col-sm-12');
                this.use('stats')
                    .init().render(app.find('.portlet-body'));
            },

            // 构建转化率
            'panel^2': app => {
                app
                    .init({title: 'CONVERSION'})
                    .config('action.date', true)
                    .config('icon.className', 'icon-bar-chart theme-font')
                    .render().addClass('col-md-6 col-sm-12');
                this.use('conversion')
                    .init()
                    .render(app.find('.portlet-body'));
            },

            // 构建用户表
            'panel^3': app => {
                app
                    .init({title: data.table.title})
                    .config('action.date', true)
                    .config('icon.className', 'fa fa-user font-green-sharp')
                    .render().addClass('col-md-12');
                this.use('table')
                    .init(data.table)
                    .config('page.length', 1)
                    .config('ctrl', 'delete')
                    .render(app.find('.portlet-body'));
            }
        })
    }

    postrender(data) {
        this.autoscreen()
    }

    enter() {
        aimee.app.loading2.hide()
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
}

export default new home;
