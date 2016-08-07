/*!
 * conversion For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-07
 */

import App from 'app';
import template from 'conversion.jade';

class conversion extends App {

    constructor() {
        super();
        this.name = 'conversion';
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
        app.find("#sparkline_bar").sparkline([8, 9, 10, 11, 10, 10, 12, 10, 10, 11, 9, 12, 11], {
            type: 'bar',
            width: '100',
            barWidth: 6,
            height: '45',
            barColor: '#F36A5B',
            negBarColor: '#e02222'
        });

        app.find("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11], {
            type: 'bar',
            width: '100',
            barWidth: 6,
            height: '45',
            barColor: '#5C9BD1',
            negBarColor: '#e02222'
        });
    }
}

export default conversion;
