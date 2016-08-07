/*!
 * stats For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-07
 */

import App from 'app';
import template from 'stats.jade';

class stats extends App {

    constructor() {
        super();
        this.name = 'stats';
        this.template = template;
    }

    onload() {

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
        Morris.Area({
            element: 'sales_statistics',
            padding: 0,
            behaveLikeLine: false,
            gridEnabled: false,
            gridLineColor: false,
            axes: false,
            fillOpacity: 1,
            data: [{
                period: '2011 Q1',
                sales: 1400,
                profit: 400
            }, {
                period: '2011 Q2',
                sales: 1100,
                profit: 600
            }, {
                period: '2011 Q3',
                sales: 1600,
                profit: 500
            }, {
                period: '2011 Q4',
                sales: 1200,
                profit: 400
            }, {
                period: '2012 Q1',
                sales: 1550,
                profit: 800
            }],
            lineColors: ['#399a8c', '#92e9dc'],
            xkey: 'period',
            ykeys: ['sales', 'profit'],
            labels: ['Sales', 'Profit'],
            pointSize: 0,
            lineWidth: 0,
            hideHover: 'auto',
            resize: true
        });
    }
}

export default stats;
