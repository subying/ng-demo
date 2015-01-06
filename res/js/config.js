var config = {},basePath,_location=window.location;
config.action = {
	cardIndex:'/res/json/cinfo.json'//贺卡管理首页
	,cardCategory:'/res/json/category.json'//贺卡分类
	,cardList:'/res/json/clist.json' //贺卡列表
	,sendList:'/res/json/clist.json' //已发送
	,receiveList:'/res/json/clist.json' //已接收
	,cardDetail:'/res/json/cdetail.json'//详情
}
basePath = _location.protocol+'//' + _location.host +':' + (_location.port || 80)+'/';
_location = null;