$.fontDetector=(function(){
	var _private={
		fonts: {},
		c: $('<div class="jq-olf"></div>')
	};
	var _public={
		watch: function(font){
			if(arguments.length==0) font='inherit';
			if(_private.fonts[font]!==undefined) return; else _private.fonts[font]={};
			var el=$('<div class="jq-ofl-one">font</div>');
			el.css('font-family','_');
			_private.c.append(el);
			_private.fonts[font].width=el.width();
			_private.fonts[font].height=el.height();
			el.css('font-family',font);
			_private.fonts[font].interval=setInterval(function(){
				if(
					_private.fonts[font].width!=el.width()
					||
					_private.fonts[font].height!=el.height()
				){
					$(document).trigger('fontload',{
						name: font
					});
					clearInterval(_private.fonts[font].interval);
				}
			},10);
		}
	};
	$('head').append('<style>.jq-olf{position:absolute;top:0px;left:0px;width:100%;height:0px;overflow:scroll;}.jq-ofl-one{font-size:1000px;visibility:hidden;}</style>');
	$('body').append(_private.c);
	_public.watch();
	return _public;
})();