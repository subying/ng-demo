
var config = {},basePath,_location=window.location;
config.action = {
	cardIndex:'/res/json/cinfo.json'//贺卡管理首页
	,cardCategory:'/res/json/category.json'//贺卡分类
	,cardList:'/res/json/clist.json' //贺卡列表
	,sendList:'/res/json/clist.json' //已发送
	,receiveList:'/res/json/clist.json' //已接收
	,cardDetail:'/res/json/cdetail.json'//详情
	,friendList:'/res/json/friend.json' //好友列表
}
basePath = _location.protocol+'//' + _location.host +':' + (_location.port || 80)+'/';
_location = null;

/*alert*/
utv.plugins.alert = function(options){
	var _def={
		timeout:3000
		,beforShow:function(){}
		,afterClose:function(){}
	}
	,_opt = $.extend(_def,options)
	;

	this.opts = _opt;
};
utv.plugins.alert.prototype={
	init:function(){
		var _self = this
			,_elem
			,_winWidth = $(window).width()
			,_div
		;
		var _divStr = [
			'<div class="utv_alert">'
			,'</div>'
		].join('');
		_div = $(_divStr);

		$('body').append(_div);

		_self.elem = _div;

		_self.isInit = true;
		_self.timer = null;
		
	}

	//显示弹窗
	,show:function(){
		var _self = this
			,_elem = _self.elem
			,_width = 0
			,_height = 0
			,_win = $(window)
			,_winWidth = _win.width()
			,_winHeight = _win.height()
			,_stop = _win.scrollTop()
			,_opts = _self.opts
			,_time = _opts.timeout
		;
		//_self.elem.fadeIn();
		_elem.css({display:'block'});

		_width = _elem.width();
		_height = _elem.height();
		_elem.css({left:(_winWidth-_width)/2,bottom:(_winHeight-_height)/2,display:'none'});

		_self.elem.fadeIn();

		clearTimeout(_self.timer);

		_self.timer = setTimeout(function(){
			_self.hide();
		},_time);
	}

	//隐藏弹窗
	,hide:function(){
		var _self = this;
		_self.elem.fadeOut();
	}
	,isInit:false
	,alert:function(str){
		var _self = this;

		if(!_self.isInit){
			_self.init();
		}

		_self.elem.html(str);
		_self.show();
	}
};

/*simple box*/
utv.plugins.simBox = function(box,mask){
	var _box = box,_mask = mask || $('#mask');

	if(!_box) return false;

	this.isInit = false;
	this.box = _box;
	this.mask = _mask;
};
utv.plugins.simBox.prototype={
	show:function(){
		var _self = this;
		_self.box.show();
		_self.mask.css('display','block');

		if(!_self.isInit){
			_self.initStyle();
		}
	}
	,close:function(){
		var _self = this;
		_self.box.hide();
		_self.mask.css('display','none');
	}
	,initStyle:function(){
		var winWidth = $(window).width()
			,_self = this
			,docHeight = $(document).height()
			,winHeight = $(window).height()
			,boxHeight = _self.box.height()
			,_mask = $('<div class="mask" id="mask"></div>')
		;

		if(_self.mask.length===0){
			$('body').append(_mask);
			_self.mask = _mask;
			_mask.css('display','block');
		}

		_mask.css({height:docHeight});
		_self.box.css({top:(winHeight-boxHeight)/2});

		_self.isInit = true;
		_self.box.on('tap click','.close',function(){
			_self.close();
		});
	}
<<<<<<< HEAD
};
>>>>>>> origin/master
=======
};
>>>>>>> origin/master
