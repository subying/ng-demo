var gCardApp = angular.module('gCardApp',['ngRoute']);
gCardApp.config(['$routeProvider',function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'res/tpl/gCard_detail.html'
        ,title:'贺卡详情-UTVGO电视自由行'
        ,controller: 'cardDetail'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

//定义控制器 管理首页
gCardApp.controller('cardDetail',function($scope,$http) {
	$scope.conLabel='<img src="" />';
    var p = $http({
      method: 'GET'
      ,url: config.action.cardDetail
    });
    p.success(function(response, status, headers, config){
        var _data = response || {};

        if(_data.type==1){
        	_data.label = '<img class="gCard_detail_scon" src="'+ _data.img +'" />';
        }

        $scope.data = _data;
    });
});

gCardApp.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


//当url改变时
gCardApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        //先判断  否则在 redirectTo 时 出现title未定义的错误
        if(current.$$route && current.$$route.title){
          $rootScope.title = current.$$route.title;
        }
    });
}]);