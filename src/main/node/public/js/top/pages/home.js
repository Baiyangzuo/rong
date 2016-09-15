$(function(){
    var home = new Page;
    var selected = 'selected';
    var _selected = '.selected';

    home.extend({
        init: function(){
            this.$dom = $(document);
            this.regTel = /^1\d{10}/;
            this.css = this.$dom.find('link.main');
        },

        isMobile: function(){
            return home.css.hasClass('m');
        },

        enter: function(){
            // For PC
            var pc = $('.lincoapp-userfile').eq(0).addClass('pc');
            var mobile = $('.lincoapp-userfile').eq(1).addClass('mobile');
            var inst = pc.show().remodal();

            this.code();
            this.bind({
                // 提交基础信息
                'click@.btn-submit': function(){
                    var msg;
                    var data = home.getFormData();

                    if(msg = home.check(data)){
                        return alert(msg);
                    };

                    home.post(data,
                        function(msg){
                            var num = Number(cookie.get('userRegSuccess') || 0);
                            cookie.set('userRegSuccess', ++num, { expires: 7*365, path: '/' });
                            cookie.set('username', data.username, { expires: 7*365, path: '/' });
                            home.$dom.find('.username strong').text(data.username);
                            home.reset();
                            inst.open();
                        },
                        function(err){
                            console.log(err.status);
                            console.log(err.responseText);
                            alert('注册失败，请刷新再试一次');
                        }
                    );
                },
                // 提交完整信息
                'click@.btn-full': function(){
                    var msg;
                    var data = home.getFullData();

                    data.username = cookie.get('username');

                    if(msg = home.checkFull(data)){
                        return alert(msg);
                    };

                    home.postFull(data,
                        function(msg){
                            console.log(msg);
                            home.reset();
                            inst.close();
                        },
                        function(err){
                            console.log(err.status);
                            console.log(err.responseText);
                        }
                    );
                },
                'click@.gender': function(){
                    if(!$(this).hasClass(selected)){
                        $(this).addClass(selected)
                            .siblings(_selected).removeClass(selected);
                    }
                },
                'touchend@.gender': function(){
                    if(!$(this).hasClass(selected)){
                        $(this).addClass(selected)
                            .siblings(_selected).removeClass(selected);
                    }
                },
                'click@.vcode-img': function(){
                    home.code();
                },
                'keypress@[name="vcode"]': function(e){
                    if(e.keyCode === 13){
                        home.$dom.find('.btn-success').click();
                    };
                },
                'click@.apply': function(e){
                    var bm = home.$dom.find('body').hasClass('m');
                    var lm = home.$dom.find('link.main').hasClass('m');
                    if(lm || bm){
                        window.scrollTo(0, 1600);
                    }
                    else{
                        home.$dom.find('[name="username"]').focus();
                    };
                }
            });

            // PC <=> MOBILE
            window.onresize = this.detector;
        },

        detector: function(){
            if(window.innerWidth < 1000 && !home.css.hasClass('m')){
                console.log('Change to Mobile');
                home.css.addClass('m').attr('href', '/css/top/m.css');
            };
            if(window.innerWidth >= 1000 && home.css.hasClass('m')){
                console.log('Change to PC');
                home.css.removeClass('m').attr('href', '/css/top/home.css');
            };
            home.$dom.find('body').show();
        },

        post: function(data, succ, err) {
            $.ajax({
                url: '/api/apply',
                type: 'POST',
                data: data,
                success: succ,
                error: err
            });
        },

        postFull: function(data, succ, err) {
            $.ajax({
                url: '/api/applyFull',
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
            if(!data.gender){
                data.gender = 'male';
            }
            if(!data.vcode){
                return '请输入验证码';
            }
            if(data.vcode.toLowerCase() !== this.vcode.code){
                return '验证码不正确';
            }
        },

        checkFull: function(data){
            if(data.vcode.toLowerCase() !== this.vcode.code){
                return '验证码不正确';
            }
        },

        // 获取基础表单信息
        getFormData: function(data) {
            data = {};
            data.username = this.pure(this.$dom.find('[name="username"]').val());
            data.tel = this.pure(this.$dom.find('[name="telphone"]').val());
            data.gender = this.$dom.find('.gender.selected').attr('data-value');
            data.vcode = this.pure(this.$dom.find('[name="vcode"]').val());
            data.userguid = cookie.get('userId');
            return data;
        },

        // 获取完整表单信息
        getFullData: function(data){
            data = {};
            data.city = this.$dom.find('[name="city"]').val();
            data.job = this.$dom.find('[name="job"]').find('option:selected').val();
            data.edu = this.$dom.find('[name="edu"]').find('option:selected').val();
            data.soc = this.$dom.find('[name="soc"]').find('option:selected').val();
            data.acc = this.$dom.find('[name="acc"]').find('option:selected').val();
            data.car = this.$dom.find('[name="car"]').find('option:selected').val();
            data.house = this.$dom.find('[name="house"]').find('option:selected').val();
            data.vcode = this.$dom.find('[name="vcodefull"]').val();
            return data;
        },

        pure: function(string){
            string = string.replace(/-*/g, '');
            string = string.replace(/\s*/g, '');
            return string;
        },

        code: function(){
            this.vcode = vcode.create();
            this.$dom.find('.vcode-img').attr('src', this.vcode.dataURL);
        },

        reset: function(){
            home.code();
            // Base
            this.$dom.find('[name="username"]').val('');
            this.$dom.find('[name="telphone"]').val('');
            this.$dom.find('[name="vcode"]').val('');
            // Full
            this.$dom.find('[name="city"]').val('');
            this.$dom.find('[name="job"]').find('option:selected').val('');
            this.$dom.find('[name="edu"]').find('option:selected').val('');
            this.$dom.find('[name="soc"]').find('option:selected').val('');
            this.$dom.find('[name="acc"]').find('option:selected').val('');
            this.$dom.find('[name="car"]').find('option:selected').val('');
            this.$dom.find('[name="house"]').find('option:selected').val('');
            this.$dom.find('[name="vcodefull"]').val('');
        }
    });

    home.reg();
    window.home = home;
});
