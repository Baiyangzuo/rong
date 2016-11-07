/*!
 * apply For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-11-07
 */

import App from 'app';
import Form from 'form';
import template from 'apply.jade';

class apply extends App {

    constructor() {
        super();
        this.name = 'apply';
        this.template = template;
    }

    onload() {

    }

    // app渲染到页面之前执行，用于预处理渲染内容
    prerender(app) {
        var form = new Form;
        var gender = {
            male: '先生',
            female: '女士',
            default: 'male'
        };

        form.load('input').attr({name: 'username', class: 'input'})
        form.load('input').attr({name: 'telphone', class: 'input'})
        form.load('input').attr({name: 'vcode', class: 'input'})
        form.load('checkbox').attr({name: 'gender'}).create(gender).action()

        form.render(this.getApp());

        this.find('.btn-submit').on('click', e => console.log(form.getData()))
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

export default apply;
