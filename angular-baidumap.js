/**
 * Created by liurui on 15/11/21.
 */
angular.module('angular-baidumap-aruis', [])
    .directive('baiduMap', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div style="width:100%;height:100%;"></div>',
            replace: true,
            scope: {
                bmapMarker: '='
            },
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var map = new BMap.Map(element[0]);    // 创建Map实例
                    var city = attrs.bmapCity == null ? new BMap.Point(116.404, 39.915) : attrs.bmapCity;
                    var zoom = attrs.bmapZoom == null ? '10' : attrs.bmapZoom;

                    map.centerAndZoom(city, zoom);  // 初始化地图,设置中心点坐标和地图级别

                    if (attrs.hasOwnProperty('bmapNavCtrl')) {
                        map.addControl(new BMap.NavigationControl());
                    }

                    if (attrs.hasOwnProperty('bmapTypeCtrl')) {
                        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                    }

                    if (attrs.hasOwnProperty('bmapScaleCtrl')) {
                        map.addControl(new BMap.ScaleControl());
                    }

                    if (attrs.hasOwnProperty('bmapOverviewCtrl')) {
                        map.addControl(new BMap.OverviewMapControl());
                    }

                    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

                    var marker;
                    scope.$watch('bmapMarker', function (_new) {
                        if (_new == undefined || _new == null) {
                            if (marker) {
                                map.removeOverlay(marker);
                            }
                            return;
                        }

                        var point = new BMap.Point(_new.lng, _new.lat);
                        map.centerAndZoom(point, _new.zoom > 0 ? _new.zoom : 16)

                        if (marker) {
                            marker.setPosition(point)
                        } else {
                            marker = new BMap.Marker(point);        // 创建标注
                        }
                        map.addOverlay(marker);
                    }, true)


                    //map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的

                });

            }
        }
    })