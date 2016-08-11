/*!
 * apply For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-10
 */

import App from 'app';
import cookie from 'cookie';
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
        this.bind({
            'click@.btn-submit': () => {
                var msg;
                var data = this.getFormData();

                if(msg = this.check(data)){
                    return alert(msg)
                }

                this.post(
                    data,
                    msg => {
                        console.log(msg)
                    },
                    err => {
                        console.log(err.status)
                        console.log(err.responseText)
                    }
                )
            }
        })
    }

    // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
    postrender(app) {
        // app为模块的实例
    }

    // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
    pagerender(app) {
        // some code
    }

    post(data, succ, err) {
        $.ajax({
            url: '/api/apply',
            type: 'POST',
            data: data,
            success: succ,
            error: err
        })
    }

    check(data) {
        if(!data.username){
            return '请输入用户名'
        }
        if(!data.tel){
            return '请输入手机号'
        }
        if(!data.gender){
            data.gender = 'male';
        }
    }

    getFormData(data) {
        data = {};
        data.username = this.find('[name="username"]').val();
        data.tel = this.find('[name="telphone"]').val();
        data.gender = this.find('.gender.selected').attr('data-value');
        data.userguid = cookie.get('userId');
        return data;
    }
}

export default apply;
