CKEDITOR.plugins.add( 'accordion', {
    icons: 'accordion',
    init: function( editor ) {
        //adicionando o comando
        editor.addCommand( 'accordionDialog', new CKEDITOR.dialogCommand( 'accordionDialog' ) );

        //setando o botão
        editor.ui.addButton('Accordion', {
            label: 'Inserir Accordion',
            command: 'accordionDialog',
            toolbar: 'insert',
            icon: this.path + '/icons/accordion.gif'
        });

        //Adicionando a janela de dialogo
        CKEDITOR.dialog.add( 'accordionDialog', this.path + 'dialogs/accordion.js' );


    }
});
