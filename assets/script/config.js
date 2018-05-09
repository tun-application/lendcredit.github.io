app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

app.constant('PAGE', {
    LOGIN:          1,
    REGISTER:       2,
    FINISH_PROFILE: 3,
    PEOPLE_BORROW:  4,
    PEOPLE_SUPPORT: 5,
    PROFILE:        6,
});

app.constant('API', {
    CHANGE_STATUS: '/marketing/messenger-chatting/change-status',
    SEND_MSG:      '/marketing/messenger-chatting/admin-reply',
});