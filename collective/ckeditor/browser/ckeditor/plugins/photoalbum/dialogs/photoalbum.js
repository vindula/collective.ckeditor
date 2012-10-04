(function()
{
    CKEDITOR.dialog.add( 'photoalbum', function( editor, dialogType )
        {
			// Load image preview.
            var regexGetSize = /^\s*(\d+)((px)|\%)?\s*$/i,
	            regexGetSizeOrEmpty = /(^\s*(\d+)((px)|\%)?\s*$)|^$/i,
	            pxLengthRegex = /^\d+px$/;
				
            return {
                title : 'Selecione o Álbum de Fotos',

                minWidth : CKEDITOR.env.ie && CKEDITOR.env.quirks ? 368 : 350,
                minHeight : 240,

                onShow : function(){
	                // Clear previously saved elements.
	                this.fakeImage = this.objectNode = this.embedNode = null;
	                previewPreloader = new CKEDITOR.dom.element( 'embed', editor.document );
	
	                // Try to detect any embed or object tag that has Flash parameters.
	                var fakeImage = this.getSelectedElement();
	                if ( fakeImage && fakeImage.data( 'cke-real-element-type' ) && fakeImage.data( 'cke-real-element-type' ) == 'photoalbum' )
	                {
	                    this.fakeImage = fakeImage;
	
	                    var realElement = editor.restoreRealElement( fakeImage ),
	                        objectNode = null, embedNode = null, paramMap = {};
                        
						if ( realElement.getName() == 'cke:embed' ){
						  	this._.contents.Link.txtUrl.setValue(realElement.getAttribute('classid'));
                            this._.contents.Link.txtWidth.setValue(realElement.getAttribute('width'));
                            this._.contents.Link.txtHeight.setValue(realElement.getAttribute('height'));
                            this._.contents.Link.txtTime.setValue(realElement.getAttribute('time'));
						}
                    }

			    },
                onOk : function(){
					
	                var objectNode = null
                    objectNode = CKEDITOR.dom.element.createFromHtml( '<cke:embed></cke:embed>', editor.document );
                    var attributes = {
						id : 'photoalbum',
                        classid : this._.contents.Link.txtUrl.getValue(),
						width : this._.contents.Link.txtWidth.getValue(),
                        height : this._.contents.Link.txtHeight.getValue(),
						time : this._.contents.Link.txtTime.getValue()
                    };
                    objectNode.setAttributes( attributes );
	
	                // Refresh the fake image.
	                var newFakeImage = editor.createFakeElement( objectNode, 'cke_flash', 'flash', true );
	
	                // Refresh the fake image.
	                var newFakeImage = editor.createFakeElement( objectNode,  'cke_photoalbum', 'photoalbum', true );
	                if ( this.fakeImage )
	                {
	                    newFakeImage.replace( this.fakeImage );
	                    editor.getSelection().selectElement( newFakeImage );
	                }
	                else
	                    editor.insertElement( newFakeImage );
					
				},

                contents :
                [
                    {
					   	id: 'Link',
	                    label : editor.lang.link.title,
	                    padding : 0,
	                    elements :
	                    [
	                        {
	                            id : 'txtUrl',
	                            type : 'text',
	                            label : editor.lang.common.url,
	                            style : 'width: 100%;margin:5px 0;',
	                            'default' : '',
	                            validate : CKEDITOR.dialog.validate.notEmpty( 'Selecione um album de foto' )
	                        },
	                        {
	                            type : 'button',
	                            id : 'browse',
	                            filebrowser :
	                            {
	                                action : 'Browse',
	                                target: 'Link:txtUrl',
	                                url: editor.config.filebrowserAlbumBrowseUrl
	                            },
	                            style : 'float:right',
	                            hidden : true,
	                            label : editor.lang.common.browseServer
		                    },
							{
                                type : 'text',
                                'default': '500px',
                                id : 'txtWidth',
                                style : 'width:50%;margin:5px 0;',
                                label : editor.lang.common.width + ' em pixel ou porcetagem',
                                validate : function()
                                {
                                    var aMatch  =  this.getValue().match( regexGetSizeOrEmpty ),
                                        isValid = !!( aMatch && parseInt( aMatch[1], 10 ) !== 0 );
                                    if ( !isValid )
                                        alert( 'A Largura tem que ser um número em pixel ou porcentagem' );
                                    return isValid;
                                }
                            },
							{
		                        type : 'text',
		                        'default': '500px',
		                        id : 'txtHeight',
								style : 'width:50%;margin:5px 0;',
		                        label : editor.lang.common.height + ' em pixel',
		                        validate : function()
		                        {
		                            var aMatch  =  this.getValue().match( pxLengthRegex ),
		                                isValid = !!( aMatch && parseInt( aMatch[1], 10 ) !== 0 );
		                            if ( !isValid )
		                                alert( 'A altura tem que ser um número em pixel' );
		                            return isValid;
		                        }

		                    },
		                    {
		                        type : 'text',
		                        id : 'txtTime',
		                        'default': '8000',
								style : 'width:50%;margin:5px 0;',
		                        label : 'Velocidade da rotação',
		                        validate : CKEDITOR.dialog.validate.integer('Tempo Invalido')
		                    }
							
					    ]
				    }

					
				]
            };
        });
})();
