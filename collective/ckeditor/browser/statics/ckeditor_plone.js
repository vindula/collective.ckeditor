/* Standard CKeditor tips for non compatible browsers 
   Must be i18nized */

if ( typeof console != 'undefined' )
	console.log();

if ( window.CKEDITOR ){
	(function(){
		var showCompatibilityMsg = function()
		{
			var env = CKEDITOR.env;
			var html = '<p><strong>Your browser is not compatible with CKEditor.</strong>';
			var browsers =
			{gecko : 'Firefox 2.0',
				ie : 'Internet Explorer 6.0',
				opera : 'Opera 9.5',
				webkit : 'Safari 3.0'
			};
			var alsoBrowsers = '';
			for ( var key in env ){
				if ( browsers[ key ] ){
					if ( env[key] )
						html += ' CKEditor is compatible with ' + browsers[ key ] + ' or higher.';
					else
						alsoBrowsers += browsers[ key ] + '+, ';
				}
			}
			alsoBrowsers = alsoBrowsers.replace( /\+,([^,]+), $/, '+ and $1' );
			html += ' It is also compatible with ' + alsoBrowsers + '.';
			html += '</p><p>With non compatible browsers, you should still be able to see and edit the contents (HTML) in a plain text field.</p>';
			document.getElementById( 'alerts' ).innerHTML = html;
		};
		var onload = function(){
			// Show a friendly compatibility message as soon as the page is loaded,
			// for those browsers that are not compatible with CKEditor.
			if ( !CKEDITOR.env.isCompatible )
				showCompatibilityMsg();
		};
		// Register the onload listener.
		if ( window.addEventListener )
			window.addEventListener( 'load', onload, false );
		else if ( window.attachEvent )
			window.attachEvent( 'onload', onload );
	})();
}
/* End Standard CKeditor tips for non compatible browsers  */


/* Plone specific ckeditor launcher using jQuery */
var editor = null;
launchCKInstances = function() {
    jQuery('.ckeditor_plone').each(function(){
        ckid = jQuery(this).attr('id');
        cke_config_url = jQuery('.cke_config_url', jQuery(this).parent()).val();
        /* Here starts the local js overload of settings by a field widget */
        /* for now it only works with at rich widget : basehref width and height are the only attributes */
        /* TODO improve it for any possible widget settings with jQuery.each('',jQuery(this).parent()) ... */
        
        if (!CKEDITOR.instances)
            CKInstances(this);
        else if (!CKEDITOR.instances[ckid]){
            CKInstances(this);
        }
        
    })    
}
jQuery(document).ready(launchCKInstances);


function CKInstances (e){
    
    if (jQuery('.cke_iswidget', jQuery(e).parent()).length) {
        cke_width = jQuery('.cke_width', jQuery(e).parent()).val();
        cke_height = jQuery('.cke_height', jQuery(e).parent()).val();
        cke_baseHref = jQuery('.cke_baseHref', jQuery(e).parent()).val();
        
        editor = CKEDITOR.replace( ckid,
                  { customConfig : cke_config_url,
                    width : cke_width,
                    height : cke_height,
                    baseHref : cke_baseHref
                  });
        }
    else  {
        editor = CKEDITOR.replace( ckid,
          {
            customConfig : cke_config_url
          });
        }


}

function removeEditor(){
    // Destroy the editor.
    if (editor){ 
        editor.destroy();
        editor = null;
    };
}

function carregaEditor(obj) {
        ckid = obj.id;
        cke_config_url = jQuery('.cke_config_url').val();

        if (jQuery('.cke_iswidget').length) {
            cke_width = jQuery('.cke_width').val();
            cke_height = jQuery('.cke_height').val();
            cke_baseHref = jQuery('.cke_baseHref').val();
            
            editor = CKEDITOR.replace( ckid,
                      { customConfig : cke_config_url,
                        width : cke_width,
                        height : cke_height,
                        baseHref : cke_baseHref
                      });
        } else {
            editor = CKEDITOR.replace( ckid,
              {
                customConfig : cke_config_url
              });
        }
}

function CKupdate(){
    for ( instance in CKEDITOR.instances )
        CKEDITOR.instances[instance].updateElement();
}
