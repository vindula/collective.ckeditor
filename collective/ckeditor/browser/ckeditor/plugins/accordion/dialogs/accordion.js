CKEDITOR.dialog.add( 'accordionDialog', function ( editor ) {
    return {
        title: 'Configuração do Accordion',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'number',
                        label: 'Número de seções do accordion',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Não pode ficar vazio" )
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;
            var sections = parseInt(dialog.getValueOf('tab-basic','number')); //Número de seções que serão criadas
            var section =  ''

            section += '<dt class="act">'
            section += '<img class="expandir" src="++resource++ckeditor_for_plone/icon-expandir.png"/>' +
                       '<img class="retrair" src="++resource++ckeditor_for_plone/icon-retrair.png"/>';
            section += ' Nome da Seção </dt>'
            section += "<dd> Insira o texto da seção do accordion aqui </dd>"
            intern = ""
            for (i=0;i<sections;i++){
                intern = intern + section
            }

            editor.insertHtml('<dl class="acc">'+ intern +'</dl>');

        }
    };
});
