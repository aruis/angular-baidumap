/**
 * Created by liurui on 15/11/21.
 */
angular.module('demo', ['angular-baidumap-aruis'])
    .controller('mainCtrl', function ($scope, $timeout) {


        $scope.point = {
            lng: 116.387112,
            lat: 39.9209777,
            zoom: 16
        }

    })
