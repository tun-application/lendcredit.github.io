'use strict';

app.controller('controller', function (
    API, $timeout,
    $scope, $firebaseArray,
    $http, Notify) {

    var db              = firebase.database();
    $scope.waiting      = $firebaseArray(db.ref('waiting/'));
    $scope.show_loading = false;
    $scope.user         = {};
    $scope.lend         = {};
    $scope.tableLend    = [];

    $scope.typeReceive  = [
        { id: 1, name: 'Chuyển khoản qua ngân hàng' },
        { id: 2, name: 'Nhận tiền mặt' }
    ];
    
    $scope.address  = [
        { id: "TP Hồ Chí Minh", name: "TP Hồ Chí Minh" },
        { id: "Hà Nội", name: "Hà Nội" },
        { id: "Bình Dương", name: "Bình Dương" },
    ];

    $scope.register = function()
    {
        // if (! $scope.user.fullname || ! $scope.user.phone || ! $scope.user.address || ! $scope.user.salary || ! $scope.user.typeReceive) {
        if (! $scope.user.fullname || ! $scope.user.phone || ! $scope.user.address) {
            return Notify.error('Vui lòng nhập đầy đủ các thông tin bên dưới.');
        }
        $scope.user.called = false;
        $scope.user.date   = now();
        loading.show();
        $scope.waiting.$add($scope.user);
        loading.hide();
        Notify.success('Đăng ký nhận tư vấn thành công, chúng tôi sẽ liên hệ sau ít phút.');
        $scope.user = {};
    };

    $scope.updateStatus = function(id)
    {
        var index                    = indexOfArr(id);
        $scope.waiting[index].called = $scope.waiting[index].called ? false : true;
        $scope.waiting.$save(index);
    };

    $scope.calculate = function()
    {
        $scope.tableLend  = [];
        var totalMoney    = $scope.lend.totalMoney;
        var goc_moi_thang = Math.round(totalMoney / $scope.lend.totalMonth);
        var lai_moi_thang = Math.round(totalMoney * ($scope.lend.percent / 100) / $scope.lend.totalMonth);
        totalMoney        = totalMoney - goc_moi_thang;

        $scope.tableLend.push({
            ky: 'Kỳ thứ 1',
            goc: goc_moi_thang,
            lai: lai_moi_thang,
            tong: goc_moi_thang + lai_moi_thang
        });

        for (var i = 2; i <= $scope.lend.totalMonth; i++) {
            lai_moi_thang = Math.round(totalMoney * ($scope.lend.percent / 100) / $scope.lend.totalMonth);
            $scope.tableLend.push({
                ky: 'Kỳ thứ ' + i,
                goc: goc_moi_thang,
                lai: lai_moi_thang,
                tong: goc_moi_thang + lai_moi_thang
            });
            totalMoney = totalMoney - goc_moi_thang;
        }
    };

    function indexOfArr(id)
    {
        var result = null;
        angular.forEach($scope.waiting, function(value, key) {
            if (value.$id === id) {
                return result = key;
            }
        });
        return result;
    };

    function now()
    {
        var currentdate = new Date();
        return currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
    }

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
