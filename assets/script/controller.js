'use strict';

app.controller('controller', function (
    PAGE, API, $timeout,
    $scope, $firebaseArray,
    $firebaseObject, $http, Notify) {

    var db              = firebase.database();
    $scope.account      = $firebaseArray(db.ref('account/'));
    $scope.PAGE         = PAGE;
    $scope.step         = PAGE.LOGIN;
    $scope.title        = '';
    $scope.subTitle     = '';
    $scope.show_loading = true;
    $scope.user         = { email: '', password: '' };
    $scope.isLogin      = $scope.step !== PAGE.LOGIN &&
                         $scope.step !== PAGE.REGISTER;

    $scope.login = function()
    {
        firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(res) {
            $scope.isLogin = true;
        }).catch(function(er) {
            return Notify.error(er.message);
        });
    };

    $scope.register = function()
    {
        if (!$scope.login_username || !$scope.login_password) return Notify.error('Tên đăng nhập & mật khẩu không được để trống!!!');
        loading.show();
        firebase.auth().createUserWithEmailAndPassword($scope.login_username, $scope.login_password).then(function(res) {
            loading.hide();
        }).catch(function(er) {
            loading.hide();
            if (er) return Notify.error(er.message);
        });
    };

    $scope.logout = function()
    {
        firebase.auth().signOut().then(function() {
            $scope.isLogin = false;
            $scope.step    = PAGE.LOGIN;
        }).catch(function(error) {
            return Notify.error(error.message);
        });
    };

    firebase.auth().onAuthStateChanged(function(user)
    {
        loading.hide();
        if (! user) return;
        if (! user.emailVerified) return verifyEmail(user);
        $scope.isLogin = true;
        $scope.step    = PAGE.PEOPLE_BORROW;
    });

    var verifyEmail = function(user)
    {
        user.sendEmailVerification();
        return Notify.info('Vui lòng kiểm tra email để xác thực tài khoản của bạn.');
    };

    $scope.$watch('step', function()
    {
        switch ($scope.step) {
            case PAGE.LOGIN:
                $scope.title = 'Đăng nhập';
                break;
            case PAGE.REGISTER:
                $scope.title = 'Đăng ký';
                break;
            case PAGE.FINISH_PROFILE:
                $scope.title = 'Hoàn thành thông tin cá nhân';
                break;
            case PAGE.PEOPLE_BORROW:
                $scope.title = 'Người cần vay';
                break;
            case PAGE.PEOPLE_SUPPORT:
                $scope.title = 'Người tư vấn';
                break;
            case PAGE.PROFILE:
                $scope.title = 'Thông tin cá nhân';
                break;
            default:
                break;
        }
    });

    var loading = {
        show: function() {
            $scope.show_loading = true;
        },
        hide: function() {
            $timeout(function() {
                $scope.show_loading = false;
            }, 1000);
        }
    };

});