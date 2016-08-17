$(function(){
    var login = new Page;
    var selected = 'selected';
    var _selected = '.selected';

    login.extend({
        init: function(){
            this.$dom = $(document);
        },

        enter: function(){
            this.code();
            this.bind({
                'click@.btn-success': function(){
                    var msg;
                    var data = login.getFormData();

                    if(msg = login.check(data)){
                        return alert(msg)
                    }

                    login.post(data,
                        function(msg){
                            cookie.set('loginUsername', data.username);
                            location.href = '/rose';
                        },
                        function(err){
                            alert(404 + ': ' + err.responseText)
                        }
                    )
                },
                'click@.vcode-img': function(){
                    login.code()
                },
                'keypress@[name="vcode"]': e => {
                    if(e.keyCode === 13){
                        this.$dom.find('.btn-success').click()
                    }
                }
            })
        },

        post: function(data, succ, err) {
            $.ajax({
                url: '/rose/login',
                type: 'POST',
                data: data,
                success: succ,
                error: err
            })
        },

        check: function(data) {
            if(!data.username){
                return '请输入用户名'
            }
            if(!data.password){
                return '请输入密码'
            }
            if(!data.vcode){
                return '请输入验证码'
            }
            if(data.vcode !== this.vcode.code){
                return '验证码不正确'
            }
        },

        getFormData: function(data) {
            data = {};
            data.username = this.pure(this.$dom.find('[name="username"]').val());
            data.password = this.pure(this.$dom.find('[name="password"]').val());
            data.vcode = this.pure(this.$dom.find('[name="vcode"]').val());
            data.userguid = cookie.get('userId');
            data.password = cp.getEncryption(data.username, data.password, data.vcode);
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
        }
    })

    login.reg();
});
