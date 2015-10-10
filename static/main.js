var client_id = "tmep_FWx9w0";
var client_secret = "sMXrcuyUul8";
var user = {
    id: "user_1",
    first_name: "Atsushi",
    last_name: "Yamamoto"
}
var timestamp = new Date().getTime();

alert(timestamp);

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
    Moxtra.chat(options);
};

$(document).ready(function () {
    //function getAccessToken(client_id, client_secret, user) {
    $.ajax({
        type: "POST",
        url: "https://apisandbox.moxtra.com/oauth/token",
        data: "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=" + "http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + user.id + "&timestamp=" + timestamp + "&firstname=" + user.first_name + "&lastname=" + user.last_name,
        success: function (data) {
            var accesstoken = data.access_token;
            alert(accesstoken);
            init(accesstoken);
        }
    });
});




var options = {
    binder_id: BINDER_ID,
    iframe: true,
    tagid4iframe: "container",
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

