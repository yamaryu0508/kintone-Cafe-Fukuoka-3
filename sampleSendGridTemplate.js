(function () {

    "use strict";
    
    var API_USER = 'SendGridのユーザー名';
    var API_KEY = 'APIキー';
    var TO_NAME = encodeURIComponent('送信者名');
    var FROM = encodeURIComponent('送信者メールアドレス');

    function sendMail(event){
        var rec = event.record;
        var url = 'https://sendgrid.com/api/mail.send.json';
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        var contents = 'api_user='+API_USER+
                             '&api_key='+API_KEY+
                             '&to='+encodeURIComponent(rec['to']['value'])+
                             '&toname='+TO_NAME+
                             '&subject='+encodeURIComponent(rec['subject']['value'])+
                             '&text='+encodeURIComponent(rec['text']['value'])+
                             '&from='+FROM;
        kintone.proxy(url, 'POST', headers, contents, function(body, status, headers) {
            console.log(status, body);
            if(status===200) {
                alert("メール送信しました！");
            } else {
                alert("メール送信に失敗しました！");
            }          
        });
        return event;
    }

    kintone.events.on('app.record.detail.show', function(event){
        var check = document.getElementsByName('sendmail');
        if (check.length == 0) {
            var button = document.createElement("button");
            button.appendChild(document.createTextNode("メール送信"));
            button.setAttribute("name", "sendmail");

            var span = document.createElement("span");
            span.appendChild(button);
            
            var elButtonSpace = kintone.app.record.getHeaderMenuSpaceElement();
            elButtonSpace.appendChild(span);
            
            button.addEventListener('click', function () {
                sendMail(event);
            });
        }
    }); // kintone.events.on('app.record.detail.show')

})();
