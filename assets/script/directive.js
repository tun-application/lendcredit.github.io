app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});


app.directive('onFinishRender', ['$timeout', '$parse', function($timeout, $parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                    if (!!attr.onFinishRender) {
                        $parse(attr.onFinishRender)(scope);
                    }
                });
            }
            if (!!attr.onStartRender) {
                if (scope.$first === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatStarted');
                        if (!!attr.onStartRender) {
                            $parse(attr.onStartRender)(scope);
                        }
                    });
                }
            }
        }
    }
}]);

app.service('Notify', function () {
    this.success = function(mes) {
        $.notify({
            message: mes
        },{
            type: 'success',
            timer: 1000,
            placement: {
                from: 'bottom',
                align: 'center',
            }
        });
    };

    this.error = function(mes) {
        $.notify({
            message: mes
        },{
            type: 'danger',
            timer: 1000,
            placement: {
                from: 'bottom',
                align: 'center',
            }
        });
    };

    this.info = function(mes) {
        $.notify({
            message: mes
        },{
            type: 'info',
            timer: 1000,
            placement: {
                from: 'bottom',
                align: 'center',
            }
        });
    };

});