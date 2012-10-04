(function() {
	
	function createFakeElement(editor, realElement) {
        var fakeElement = editor.createFakeParserElement(realElement, 'cke_photoalbum', 'photoalbum', true);
        return fakeElement;
    }
    
	
    CKEDITOR.plugins.add('photoalbum',
	 {
	 	requires: ['fakeobjects'],
		
		init: function(editor) {
		    editor.addCommand('PhotoAlbum', new CKEDITOR.dialogCommand('photoalbum'));
			editor.ui.addButton('PhotoAlbum', {label: 'Álbum de Fotos',
							                   command: 'PhotoAlbum',
							                   icon: this.path + 'photoalbum.png'
						       });
		    CKEDITOR.dialog.add( 'photoalbum', CKEDITOR.getUrl( this.path + 'dialogs/photoalbum.js' ) );
		
		    editor.addCss(
		        'img.cke_photoalbum' +
		        '{' +
		            'background-image: url(' + CKEDITOR.getUrl( this.path + 'images/placeholder.png' ) + ');' +
		            'background-position: center center;' +
		            'background-repeat: no-repeat;' +
		            'border: 1px solid #a9a9a9;' +
		            'background-color: #CCCCCC;'+
					'opacity: 0.7;'+
		        '}'
		        );
	            // If the "menu" plugin is loaded, register the menu items.
	            if ( editor.addMenuItems )
	            {
	                editor.addMenuItems(
	                    {
	                        photoalbum :
	                        {
	                            label : editor.lang.photoalbum.properties,
	                            command : 'photoalbum',
	                            group : 'photoalbum'
	                        }
	                    });
	            }
	
	            editor.on( 'doubleclick', function( evt )
	                {
	                    var element = evt.data.element;
	
	                    if ( element.is( 'img' ) && element.data( 'cke-real-element-type' ) == 'photoalbum' )
	                        evt.data.dialog = 'photoalbum';
	                });
	
	            // If the "contextmenu" plugin is loaded, register the listeners.
	            if ( editor.contextMenu )
	            {
	                editor.contextMenu.addListener( function( element, selection )
	                    {
	                        if ( element && element.is( 'img' ) && !element.isReadOnly()
	                                && element.data( 'cke-real-element-type' ) == 'photoalbum' )
	                            return { photoalbum : CKEDITOR.TRISTATE_OFF };
	                    });
	            }				
				
		
		},
		afterInit: function(editor){
			var dataProcessor = editor.dataProcessor,
			    dataFilter = dataProcessor && dataProcessor.dataFilter;
		
		    if (dataFilter) {
                dataFilter.addRules({
                    elements: {
                        'cke:embed': function (element) {
                            var fake = createFakeElement(editor, element);
                            fake.attributes.alt = element.attributes.src;
                            fake.attributes["data-cke-realelement"] = fake.attributes["data-cke-realelement"].replace(/%26amp%3B/gi, '%26'); //fix double encoding on ampersands in src
                            return fake;
                        }
                    }
                }, 5);

            }
		
		
		}

										
     });
})();