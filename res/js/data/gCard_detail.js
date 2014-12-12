var gCardApp = angular.module('gCardApp',['ngRoute']);
gCardApp.config(['$routeProvider',function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'res/tpl/gCard_detail.html'
        ,title:'贺卡详情-UTVGO电视自由行'
        ,controller: 'cardDetail'
      })
      .when('/send', {
        templateUrl: 'res/tpl/gCard_detail_send.html'
        ,title:'赠送贺卡-UTVGO电视自由行'
        ,controller: 'cardDetailSend'
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

        //
        selectTextPad._data={};
        selectTextPad._data.img = _data.img;
        selectTextPad._data.name = _data.name;
        selectTextPad._data.text = _data.text;
    });

    //监听事件
	$(document).on('click','.gCardShareBtn',function(){//分享按钮
		var _gCardTips = $('#gCardTips')
		;
		
		_gCardTips.css('display','block');
		maskPad.show();
	})
	.on('click','.gCardSTBtn',function(){
		if(!selectTextPad.enabled){
			selectTextPad.show();
		}
	})
	.on('click','.gCardSTClose',function(){
		selectTextPad.hide();
	})
	.on('click','.showMask',function(){
		var _gCardTips = $('#gCardTips');
		_gCardTips.css('display','none');
		maskPad.hide();

		if(selectTextPad.enabled){
			selectTextPad.hide();
		}
	})
	;
	
	var selectTextPad = {
		enabled:false
		,show:function(){
			if(!this.box){
				this.box = new utv.plugins.simBox($('#gCardSTCover'))
			}
			//
			this.box.show();

			this.enabled = true;
			this.bindFn();
		}
		,hide:function(){
			this.box.close();

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
		,box:null
	};
});

gCardApp.controller('cardDetailSend',function($scope,$http) {
	$scope.data = selectTextPad._data;


	$scope.update = function (data) {
		$scope.friends = data; 
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
		    $scope.$apply();
		}
	}

	var box = new utv.plugins.simBox($('#gCardFD'))
		,inputBox = new utv.plugins.simBox($('#inputKeyNo'))
	;
	friendPad.box = box;
	friendPad.inputBox = inputBox;

	$scope.selcetOwner = function(){
		friendPad.getData(function(data){
			$scope.update(data);
			box.show();
		});
	}

	$scope.addOwner = function(){
		inputBox.show();
		//prompt('请输入智能卡号或者广电号');
	}
});

//过滤器
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

var friendPad={
	getData:function(cb){
		var _url = config.action.friendList
			,_self = this
		;
		/**/
		if(_self.data){
			cb(_self.data);
			return false;
		}

		if(friendPad._req && friendPad._req.abort){
			return false;
		}


		_self._req = $.getJSON(_url,function(data){
			_self.data = data;
			cb(data);
			_self.req = null;
		});
	}
	,_req:null
	,data:null
	,box:null
	,inputBox:null
}

var maskPad = {
	show:function(){
		$('#mask').css('display','block');
	}
	,hide:function(){
		$('#mask').css('display','none');
	}
}
