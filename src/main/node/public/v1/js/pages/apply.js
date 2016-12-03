$(function(){
    function Apply() {
        this.init.apply(this, arguments)
    }

    Apply.prototype = {

        init: function() {
            this.$dom = $(document);
            this.regTel = /^1\d{10}/;
            this.recover(this.getPreData());
            this.succ = this.$dom.find('.succ').removeClass('dn').remodal();
            this.fail = this.$dom.find('.fail').removeClass('dn').remodal();
        },

        bind: function(events){
            var it = this;
            events = events || {};
            $.each(events, function(key, fn){
                var pair = key.split('@');
                var evts = pair[0].split(/,\s*/g);
                evts.forEach(function(type){
                    it.$dom.on(type, pair[1], fn);
                });
            });
        },

        isMobile: function(){
            location.href = '/m';
        },

        reg: function() {
            this.saveSourceId();
            this.enter();
        },

        enter: function() {
            var page = this;

            this.bind({
                // 提交基础信息
                'click@.btn-apply': function(){
                    var msg;
                    var pre = page.getPreData();
                    var top = page.getTopData();
                    var data = page.getFormData();
                    var fulldata = $.extend({}, top, data);

                    // 二次个更新需要tel作为查询字段
                    data.tel = top.tel;

                    console.log('full data:', fulldata);

                    // 检查 username & tel
                    if(!pre.isReg){
                        if(msg = page.check(top)){
                            return alert(msg);
                        }
                    }

                    // 注册
                    page.post(pre.isReg ? data : fulldata,
                        function(msg){
                            // 获取当前浏览器注册次数
                            var num = Number(cookie.get('userRegSuccess') || 0);
                            // 更新当前浏览器注册次数
                            cookie.set('userRegSuccess', ++num, { expires: 7*365, path: '/' });
                            // 设置当前注册用户名
                            cookie.set('username', data.username, { expires: 7*365, path: '/' });
                            // 清空注册缓存
                            localStorage.removeItem('user');
                            page.succ.open();
                        },
                        function(err){
                            console.log(err.status);
                            console.log(err.responseText);
                            page.fail.open();
                        }
                    )
                },
                'click@.vcode-img': function(){
                    page.code();
                },
                'keypress@[name="vcode"]': function(e){
                    if(e.keyCode === 13){
                        page.$dom.find('.btn-success').click();
                    };
                },
                'click@.succ .icon-close': function(e){
                    page.succ.close();
                },
                'click@.fail .icon-close': function(e){
                    page.fail.close();
                },
                'closing,closed@.remodal': function(e){
                    if($(this).hasClass('succ')){
                        location.href = '/';
                    }
                }
            });
        },

        post: function(data, succ, err) {
            $.ajax({
                url: '/api/apply?sid=' + this.getSourceId(),
                type: 'POST',
                data: data,
                success: succ,
                error: err
            });
        },

        postFull: function(data, succ, err) {
            $.ajax({
                url: '/api/applyFull?sid=' + this.getSourceId(),
                type: 'POST',
                data: data,
                success: succ,
                error: err
            });
        },

        check: function(data) {
            if(!data.username){
                return '请输入用户名';
            }
            if(!data.tel || !this.regTel.test(data.tel) || data.tel.length !== 11){
                return '请输入正确的手机号';
            }
            // if(!data.gender){
            //     data.gender = 'male';
            // }
            // if(!data.vcode){
            //     return '请输入验证码';
            // }
            // if(data.vcode.toLowerCase() !== this.vcode.code){
            //     return '验证码不正确';
            // }
        },

        recover: function(data) {
            // Base
            this.$dom.find('[name="username"]').val(data.username);
            this.$dom.find('[name="telphone"]').val(data.tel);
        },

        getUrlArguments: function() {
            var args = {}, arr;
            if(location.search){
                arr = location.search.slice(1).split('&');
                arr.forEach(function(item){
                    var tmp = item.split('=');
                    args[tmp[0]] = tmp[1];
                    tmp = null;
                })
            }
            return args;
        },

        getPreData: function() {
            var data = {};
            var args = this.getUrlArguments();
            if(localStorage.user){
                try{
                    data = JSON.parse(localStorage.user);
                    data.isReg = true;
                }
                catch(e){
                    localStorage.removeItem('user');
                }
            }
            else if(!$.isEmptyObject(args)){
                data = args;
                data.isReg = true;
                data.username = decodeURI(data.username);
            }
            return data;
        },

        getTopData: function(data) {
            data = {};
            data.username = this.pure(this.$dom.find('[name="username"]').val());
            data.tel = this.pure(this.$dom.find('[name="telphone"]').val());
            data.sid = this.getSourceId();
            return data;
        },

        getFormData: function(data) {
            data = {};
            data.city = this.$dom.find('[name="city"]').val();
            data.loan = this.$dom.find('[name="number"]').val();
            data.job = this.$dom.find('[name="job"]').find('option:selected').val();
            data.edu = this.$dom.find('[name="edu"]').find('option:selected').val();
            data.soc = this.$dom.find('[name="soc"]').find('option:selected').val();
            data.acc = this.$dom.find('[name="acc"]').find('option:selected').val();
            data.car = this.$dom.find('[name="car"]').find('option:selected').val();
            data.house = this.$dom.find('[name="house"]').find('option:selected').val();
            return data;
        },

        pure: function(string){
            string = string.replace(/-*/g, '');
            string = string.replace(/\s*/g, '');
            return string;
        },

        // code: function(){
        //     this.vcode = vcode.create();
        //     this.$dom.find('.vcode-img').attr('src', this.vcode.dataURL);
        // },
        //
        // reset: function(){
        //     this.code();
        //     // Base
        //     this.$dom.find('[name="username"]').val('');
        //     this.$dom.find('[name="telphone"]').val('');
        //     this.$dom.find('[name="vcode"]').val('');
        // },

        getSourceId: function(){
            return cookie.get('sid') || this.getUrlArguments().sid || 0;
        },

        saveSourceId: function(){
            var sid = this.getSourceId();
            !sid || cookie.set('sid', sid);
        }
    };

    new Apply().reg();
});
