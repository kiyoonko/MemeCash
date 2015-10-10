function init() {
    var options = {
        mode: "sandbox", //for production environment change to "production"
        client_id: i91BSAwt5Lw,
        access_token: jP0XCSpdvFA, //valid access token from user authentication
        invalid_token: function(event) {
            alert("Access Token expired for session id: " + event.session_id);
        }
    };

    Moxtra.init(options);
}

var client_id = tmep_FWx9w0;
var client_secret = sMXrcuyUul8;

var user = {
    id: user_id,
    first_name: Atsushi,
    last_name: Yamamoto
}

function getAccessToken(client_id, client_secret, user) {
    $.ajax({
        url: "https://apisandbox.moxtra.com/oauth/token",
        method: "POST",
        data: {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: "http://www.moxtra.com/auth_uniqueid",
            uniqueid: user.id,
            timestamp: 1444510889000,
            firstname: user.first_name,
            lastname: user.last_name
        },
        headers: {
            Content_type: "Token " + token
        },
        success: function (data) {
            var result = getResult(data);
            renderResult(result);
        }
    })
}

var options = {
    binder_id: BINDER_ID,
    iframe: true,
    tagid4iframe: "container",
    iframewidth: "920px",
    iframeheight: "650px",
    autostart_meet: true,
    autostart_note: false,
    start_chat: function(event) {
        alert("Chat started session Id: " + event.session_id);
    },
    start_meet: function(event) {
        alert("Meet started session key: " + event.session_key + " session id: " + event.session_id);
    },
    end_meet: function(event) {
        alert("Meet end event");
    },
    invite_member: function(event) {
        alert("Invite member into binder Id: " + event.binder_id);
    },
    request_note: function(event) {
        alert("Note start request");
    },
    error: function(event) {
        alert("Chat error code: " + event.error_code + " error message: " + event.error_message);
    }
};
Moxtra.chat(options);
