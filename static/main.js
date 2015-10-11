var client_id = "tmep_FWx9w0";
var client_secret = "sMXrcuyUul8";
var user1 = {
    id: "user_1",
    first_name: "Atsushi",
    last_name: "Yamamoto"
};
// Only here to check the chatting functionality
var user2 = {
    id: "user_2",
    first_name: "john",
    last_name: "doe"
};
var timestamp = new Date().getTime();
create_user(user2);

function create_user(user) {
    alert(timestamp);
    $.ajax({
        type: "POST",
        url: "https://apisandbox.moxtra.com/oauth/token",
        data: "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=" + "http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + user.id + "&timestamp=" + timestamp + "&firstname=" + user.first_name + "&lastname=" + user.last_name,
        success: function (data) {
            var accesstoken = data.access_token;
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
            alert(accesstoken);
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
    Moxtra.init(options)
        //    start_chat(user2);
    open_timeline();
};



function start_chat(user) {
    var chat_options = {
        unique_id: user.id,
        iframe: true,
        tagid4iframe: "chat_container",
        iframewidth: "920px",
        iframeheight: "650px",
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

function open_timeline() {
    var options = {
        //    binder_id: binderid.value,
        iframe: true,
        tagid4iframe: "timeline_container",
        iframewidth: "920px",
        iframeheight: "650px",
        autostart_meet: true,
        autostart_note: true,
        extension: {
            "show_dialogs": {
                "meet_invite": true
            },
            "menus": [{
                    "add_page": [
                        {
                            "menu_name": "Do MemeCash",
                            "position": "bottom"
                        }]
            }]
        },
        start_timeline: function (event) {
            alert("Timeline started session Id: " + event.session_id + " binder id: " + event.binder_id);
        },
        view_binder: function (event) {
            alert("Binder switched session Id: " + event.session_id + " binder id: " + event.binder_id);
        },
        invite_member: function (event) {
            alert("Invite member into binder Id: " + event.binder_id);
        },
        start_meet: function (event) {
            alert("Meet started session key: " + event.session_key + " session id: " + event.session_id);
        },
        end_meet: function (event) {
            alert("Meet end event");
        },
        save_meet: function (event) {
            alert("Meet saved on binder: " + event.binder_id);
        },
        start_note: function (event) {
            alert("session key: " + event.session_key + " session id: " + event.session_id);
        },
        save_note: function (event) {
            alert("Note saved on binder: " + event.destination_binder_id);
        },
        cancel_note: function (event) {
            alert("Note cancelled");
        },
        error: function (event) {
            alert("Timeline error code: " + event.error_code + " error message: " + event.error_message);
        }
    };
    Moxtra.timeline(options);
}
