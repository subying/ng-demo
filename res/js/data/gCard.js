var gCardApp = angular.module('gCardApp',['ngRoute']);
gCardApp.config(['$routeProvider',function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'res/tpl/gCard_index.html'
        ,title:'贺卡管理-UTVGO电视自由行'
        ,controller: 'userInfoPad'
      })
      .when('/category', {
          templateUrl: 'res/tpl/gCard_category.html'
          ,title:'贺卡礼物-UTVGO电视自由行'
          ,controller: 'categoryPad'
      })
      .when('/list/:id', {
          templateUrl: 'res/tpl/gCard_list.html'
          ,title:'贺卡礼物-UTVGO电视自由行'
          ,controller: 'listPad'
      })
      .when('/send', {
          templateUrl: 'res/tpl/gCard_send.html'
          ,title:'已发送贺卡-UTVGO电视自由行'
          ,controller: 'sendPad'
      })
      .when('/receive', {
          templateUrl: 'res/tpl/gCard_send.html'
          ,title:'贺卡信箱-UTVGO电视自由行'
          ,controller: 'receivePad'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);


//定义控制器 管理首页
gCardApp.controller('userInfoPad',function($scope,$routeParams,$http) {
    var p = $http({
      method: 'GET'
      ,url: '/res/json/cinfo.json'
    });
    p.success(function(response, status, headers, config){
        $scope.data = response;
    });
});


//定义控制器 贺卡分类
gCardApp.controller('categoryPad',function($scope,$routeParams,$http) {
    var p = $http({
      method: 'GET'
      ,url: '/res/json/category.json'
    });
    p.success(function(response, status, headers, config){
        $scope.items = response;
    });
});

//定义控制器 贺卡列表
gCardApp.controller('listPad',function($scope,$routeParams,$http) {
    var p = $http({
      method: 'GET'
      ,url: '/res/json/clist.json'
    });
    p.success(function(response, status, headers, config){
        var _data = [];
        $.each(response||[],function(i,obj){
            _data[i] = obj;
            _data[i].tclass=obj.type?'show':'';
        });

        $scope.items = _data;
    });
});


//定义控制器 已发送列表
gCardApp.controller('sendPad',function($scope,$routeParams,$http) {
    var p = $http({
      method: 'GET'
      ,url: '/res/json/clist.json'
    });
    p.success(function(response, status, headers, config){
        var _data = [];
        $.each(response||[],function(i,obj){
            _data[i] = obj;
            _data[i].tclass=obj.type?'show':'';
        });

        $scope.items = _data;
    });
});


//定义控制器 已接收列表
gCardApp.controller('receivePad',function($scope,$routeParams,$http) {
    var p = $http({
      method: 'GET'
      ,url: '/res/json/clist.json'
    });
    p.success(function(response, status, headers, config){
        var _data = [];
        $.each(response||[],function(i,obj){
            _data[i] = obj;
            _data[i].tclass=obj.type?'show':'';
        });

        $scope.items = _data;
    });
});


//当url改变时
gCardApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);


//已发送、接收中的编辑按钮
$(document).on('click','.grsEditBtn',function(){ 
	grsPad.setMode('edit');
})
.on('click','.grsCalBtn',function(){ 
	grsPad.setMode('normal');
})

var grsPad = { 
	mode:'normal'
	,setMode:function(mode){ 
		var _mode = mode || 'normal'
			,grsList = $('#grsList')
			,grsBtnsCover = $('#grsBtnsCover')
			,_self = this
		;

		if(_mode==='edit'){ 
			grsList.addClass('edit_mode');
			grsBtnsCover.addClass('edit_mode');
			_self.bindFn();
		}else{ 
			grsList.removeClass('edit_mode');
			grsBtnsCover.removeClass('edit_mode');
			_self.unbindFn();
			grsList.children().removeClass('sel_mode');
		}

		_self.mode = _mode;
	}
	,bindFn:function(){ 
		var _self = this;
		$('#grsList').on('click','.mCover',_self.selFn)
		.on('click','.mCal',_self.calFn)
		;
	}
	,unbindFn:function(){ 
		var _self = this;
		$('#grsList').off('click','.mCover',_self.selFn)
		.off('click','.mCal',_self.calFn)
		;
	}
	,selFn:function(e){
		if(grsPad.mode != 'edit')  return false;

		var _this = $(this)
			,_li = _this.parents('li')
		;
		_li.addClass('sel_mode');		

		e.stopPropagation();
	}
	,calFn:function(e){ 
		if(grsPad.mode != 'edit')  return false;

		var _this = $(this)
			,_li = _this.parents('li')
		;
		_li.removeClass('sel_mode');
		e.stopPropagation();
	}
}