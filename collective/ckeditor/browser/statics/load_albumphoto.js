$j = jQuery.noConflict();

function aleatorio(){
	var inferior = 1,
	    superior = 1000,
        numPossibilidades = superior - inferior,
        aleat = Math.random() * numPossibilidades;
    aleat = Math.floor(aleat);
    return parseInt(inferior) + aleat;
};

$j(document).ready(function(){
    
	$j('#photoalbum').each(function(){
		var ctx = $j(this), 
		    url = ctx.attr('classid'),
		    width = ctx.attr('width'),
		    height = ctx.attr('height'),
			time = ctx.attr('time'),
			id = 'photoalbum-'+aleatorio(),
			new_div = $j('<div />');
		
		new_div.attr('id',id);
		$j.get(url,function(data){
			var dom = $j(data),
                content = dom.find('#galleria');
            
			new_div.append(content.children());
			
			dom.filter('link#galleria-js').each(function(){
				$j('head').append(this);
			});
			if (height.indexOf('px') == -1){
				height += 'px';
			};
			
			var style = '<style rel="stylesheet" type="text/css" media="screen" >';
            style += '#'+id +'{ background: #000; height:'+height +'; width:'+width+';}';
            $j('head').append(style);
			
			Galleria.loadTheme('/++resource++vindula.content/js/galleria/themes/twelve/galleria.twelve.min.js')
			Galleria.run('#'+id,{
				// Localized strings, modify these if you want tooltips in your language
				_locale: {
				show_thumbnails: "Mostrar Miniaturas",
				hide_thumbnails: "Esconder Miniaturas",
				play: "Iniciar Slideshow",
				pause: "Pausar Slideshow",
				enter_fullscreen: "Tela Cheia",
				exit_fullscreen: "Sair Tela Cheia",
				popout_image: "Image em Popup",
				showing_image: "Mostra image %s de %s"
				},
				// Initialize Galleria
				autoplay:time,
				height:height,
				width:width
			});
			
		});
		
		ctx.replaceWith(new_div);
		
	});
});