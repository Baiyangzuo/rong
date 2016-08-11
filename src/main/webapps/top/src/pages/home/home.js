/*!
 * home For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-page
 * Date: 2016-08-10
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

    }

    prerender(data) {
        this.exports('apply')
    }

    postrender(data) {

    }

    enter() {

    }

    leave() {

    }
}

export default new home;
