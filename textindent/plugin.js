CKEDITOR.plugins.add( 'textindent', {
	icons: 'textindent',
    availableLangs: {'pt-br':1, 'en':1},
    lang: 'pt-br, en',
	init: function( editor ) {

        var indentation = editor.config.indentation;

        if(typeof(indentation) == 'undefined')
            indentation = '50';

        if(editor.ui.addButton){

            editor.ui.addButton( 'textindent', {
                label: editor.lang.textindent.labelName,
                command: 'insert',
                toolbar: 'insert',
            });
        }

        editor.on( 'selectionChange', function()
            {
                var style_textindente = new CKEDITOR.style({
                        element: 'p',
                        styles: { 'text-indent': indentation+'px' },
                        overrides: [{
                            element: 'text-indent', attributes: { 'size': indentation+'0'}
                        }]
                    });

                if( style_textindente.checkActive(editor.elementPath(), editor) )
                   editor.getCommand('insert').setState(CKEDITOR.TRISTATE_ON);
                else
                   editor.getCommand('insert').setState(CKEDITOR.TRISTATE_OFF);

        })

        editor.addCommand("insert", {
            allowedContent: 'p{text-indent}',
            requiredContent: 'p',
            exec: function() {

                var style_textindente = new CKEDITOR.style({
                        element: 'p',
                        styles: { 'text-indent': indentation+'px' },
                        overrides: [{
                            element: 'text-indent', attributes: { 'size': '0'}
                        }]
                    });

                var style_no_textindente = new CKEDITOR.style({
                        element: 'p',
                        styles: { 'text-indent': '0' },
                        overrides: [{
                            element: 'text-indent', attributes: { 'size': indentation+'px' }
                        }]
                    });

                if( style_textindente.checkActive(editor.elementPath(), editor) ){
                    editor.fire('saveSnapshot');
                    editor.applyStyle(style_no_textindente);
                }
                else{
                    editor.fire('saveSnapshot');
                    editor.applyStyle(style_textindente);
                }

            }
        });
	}

});
