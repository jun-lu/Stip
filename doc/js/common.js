var Common = {
	tmpl : function tmpl(str, data){
				var fn = !/\W/.test(str) ?
				  cache[str] = cache[str] ||
					tmpl(document.getElementById(str).innerHTML) :
				  
				  new Function("obj",
					"var p=[],print=function(){p.push.apply(p,arguments);};" +
					"with(obj){p.push('" +
					
					str
					  .replace(/[\r\t\n]/g, " ")
					  .split("<%").join("\t")
					  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
					  .replace(/\t=(.*?)%>/g, "',$1,'")
					  .split("\t").join("');")
					  .split("%>").join("p.push('")
					  .split("\r").join("\\'")
				  + "');}return p.join('');");
				  
				return data ? fn( data ) : fn;
		 },
	mix : function(a, b){
		for(var i in b){
			if(b.hasOwnProperty(i)){a[i] = b[i]};
		}
		return a;
	}
};


//----------------

var Page = {
	init:function(){
		this.showH1();
		this.showNav();
		this.showCopyRight();
	},
	navHTMLItem:'<div class="nav-group">\
						<h2><%=title%></h2>\
						<ul>\
						<%for(var i=0,l=list.length,item; i< l;i++){%>\
							<li><a href="<%=list[i].href%>" target="<%=list[i].target%>"><%=list[i].text%></a></li>\
						<%}%>\
						</ul>\
					</div>',
	getNavHTML:function(){
		var data = this.nav;
		var itemHTML = this.navHTMLItem;
		var html = '';
		for(var i=0,l=data.length; i< l; i++){
			html += Common.tmpl(itemHTML, data[i]);
		};
		return html;
	},
	showNav:function(id){
		$(id || '#sideNav').html( Page.getNavHTML() );
	},
	showCopyRight:function(id){
		$(id || '#copyRight').html("2011-08-01 by lujun");
	},
	showH1:function(id){
		$(id || '#H1').text('Stip');
	},
	ie:function(){
		$('#doc').css('fontSize','24pt').html('我应该说服你放弃它吗？');
	},
	nav:[
		{
			title:"Say hello",
			list:[
				{href:'index.html',text:'Hello World', target:'_self'}
			]
		},
		{
			title:"API",
			list:[
				{href:'apishow.html',text:'API演示', target:'_self'},
				{href:'apidoc.html',text:'API文档', target:'_self'}
			]
		},
		{
			title:"扩展",
			list:[
				{href:'checkform.html',text:'表单验证', target:'_self'},
				{href:'regexample.html',text:'注册案例', target:'_self'}
			]
		},
		{
			title:"其他",
			list:[
				{href:'download.html',text:'下载', target:'_self'},
				{href:'about.html',text:'关于', target:'_self'}
			]
		}
	]
}