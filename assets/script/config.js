app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

app.constant('API', {
    CHANGE_STATUS: '/marketing/messenger-chatting/change-status',
    SEND_MSG:      '/marketing/messenger-chatting/admin-reply',
});
