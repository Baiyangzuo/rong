/*!
 * demo For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-page
 * Date: 2016-08-06
 */

import Page from 'page';
import template from 'demo.jade';

class demo extends Page {

    constructor() {
        super();
        this.name = 'demo';
        this.template = template;
    }

    get ajaxconfig() {
        return {
            url: '/tmp/test.json',
            dataType: 'json'
        }
    }

    onload() {
        
    }

    prerender(data) {
        this.exports('header')
    }

    postrender(data) {

    }

    enter() {

    }

    leave() {

    }
}

export default new demo;
