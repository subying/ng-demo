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


//监听事件
$(document).on('click','.gCardShareBtn',function(){//分享按钮
	var _gCardTips = $('#gCardTips')
	;
	
	_gCardTips.css('display','block');
	maskPad.show();
})
.on('click','.showMask',function(){//隐藏
	var _gCardTips = $('#gCardTips')
	;
	_gCardTips.css('display','none');
	maskPad.hide();

	if(selectTextPad.enabled){
		selectTextPad.hide();
	}
})
.on('click','.gCardSTBtn',function(){
	if(!selectTextPad.enabled){
		selectTextPad.show();
	}
})
.on('click','.gCardSTClose',function(){
	selectTextPad.hide();
})

var selectTextPad = {
	enabled:false
	,show:function(){
		var gCardSTCover = $('#gCardSTCover');
		gCardSTCover.css('display','block');

		maskPad.show();

		this.enabled = true;
		this.bindFn();
	}
	,hide:function(){
		var gCardSTCover = $('#gCardSTCover');
		gCardSTCover.css('display','none');

		maskPad.hide();

		this.enabled = false;
		this.unbindFn();
	}
	,bindFn:function(){
		var _self = this;
		$('#gCardSTList').on('click','.itemSTCon',_self.selFn);
	}
	,unbindFn:function(){
		var _self = this;
		$('#gCardSTList').off('click','.itemSTCon',_self.selFn);
	}
	,selFn:function(){
		var _this = $(this)
			,_li = _this.parent()
		;
		if(_this.hasClass('on')){
			_this.removeClass('on');
		}else{
			_this.addClass('on');
			_li.siblings().children('.itemSTCon').removeClass('on');
		}
	}
};

var maskPad = {
	show:function(){
		$('#mask').css('display','block');
	}
	,hide:function(){
		$('#mask').css('display','none');
	}
}