var client_id = "tmep_FWx9w0";
var client_secret = "sMXrcuyUul8";
var user1 = {
    id: "user_1",
    first_name: "Atsushi",
    last_name: "Yamamoto",
    token: ""
};
// Only here to check the chatting functionality
var user2 = {
    id: "user_2",
    first_name: "John",
    last_name: "Doe",
    token: ""
};
var user3 = {
    id: "user_3",
    first_name: "Michael",
    last_name: "Jackson",
    token: ""
};
var user4 = {
    id: "user_4",
    first_name: "Bruh",
    last_name: "WHydidyoulosit",
    token: ""
};
var timestamp = new Date().getTime();
create_user(user2);
create_user(user3);

function create_user(user) {
    $.ajax({
        type: "POST",
        url: "https://apisandbox.moxtra.com/oauth/token",
        data: "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=" + "http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + user.id + "&timestamp=" + timestamp + "&firstname=" + user.first_name + "&lastname=" + user.last_name,
        success: function (data) {
            var accesstoken = data.access_token;
            user.token = accesstoken;
            console.log("user:" + user.first_name + " " + accesstoken);
        }
    });
}

$(document).ready(function () {
    //function getAccessToken(client_id, client_secret, user) {
    $.ajax({
        type: "POST",
        url: "https://apisandbox.moxtra.com/oauth/token",
        data: "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=" + "http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + user1.id + "&timestamp=" + timestamp + "&firstname=" + user1.first_name + "&lastname=" + user1.last_name,
        success: function (data) {
            var accesstoken = data.access_token;
            user1.token = accesstoken;
            init(accesstoken);
        }
    });
});


function init(accesstoken) {
    var options = {
        mode: "sandbox", //for production environment change to "production"
        client_id: client_id,
        access_token: accesstoken, //valid access token from user authentication
        invalid_token: function (event) {
            alert("Access Token expired for session id: " + event.session_id);
        }
    };
    Moxtra.init(options);
    $.ajax({
        type: "GET",
        url: "https://apisandbox.moxtra.com/v1/me/binders?access_token=" + accesstoken,
        success: function (data) {
            console.log(data);
        }
    })
    start_list(accesstoken);
};

function start_list(accesstoken) {
    var html_output = "";
    console.log("https://apisandbox.moxtra.com/v1/me/binders?filter=all&access_token=" + accesstoken);
    $.ajax({
        type: "GET",
        url: "https://apisandbox.moxtra.com/v1/me/binders?filter=all&access_token=" + accesstoken,
        success: function (response) {
            var obj = response;
            // console.log (obj.data.binders[0].binder.id);
            if (obj.data.binders !== 'undefined') {
                var binders = obj.data.binders;
                for (i = 0; i < binders.length; i++) {
                    console.log(binders[i].binder.id);
                    html_output = html_output + "<p><a href=javascript:open_chat('" + binders[i].binder.id + "')>" + binders[i].binder.name + "</a></p>"
                        // render_list(binders[i].binder.id,binders[i].binder.name);
                }
            }
            $("#timeline_container").html(html_output);
        }
    });
}



function open_chat(binderid) {
    var chat_options = {
        binder_id: binderid,
        iframe: true,
        tagid4iframe: "chat_container",
        iframewidth: "400px",
        iframeheight: "400px",
        autostart_meet: true,
        autostart_note: false,
        start_chat: function (event) {
            alert("Chat started session Id: " + event.session_id);
        },
        start_meet: function (event) {
            alert("Meet started session key: " + event.session_key + " session id: " + event.session_id);
        },
        end_meet: function (event) {
            alert("Meet end event");
        },
        invite_member: function (event) {
            alert("Invite member into binder Id: " + event.binder_id);
        },
        request_note: function (event) {
            alert("Note start request");
        },
        error: function (event) {
            alert("Chat error code: " + event.error_code + " error message: " + event.error_message);
        }
    };
    Moxtra.chat(chat_options);
}
