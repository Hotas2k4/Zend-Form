$(document).ready(function() {

    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    var formId = $('#form_id').html();

    t      = '    ';
    tt     = '        ';
    ttt    = '            ';
    tttt   = '                ';
    ttttt  = '                    ';
    tttttt = '                        ';

    var form = JSON.parse(
        localStorage.getItem(formId)
    );

    var formElements = [];
    var formValidatorElements = [];

    for (var i = 0; i < form.length; i++){
        // form properties
        if(form[i].form_properties){
            var prop = form[i].form_properties[0];

            formElements.push(zfHead(prop));
            formValidatorElements.push(zfValidatorHead(prop));
        }

        // form line text
        if(form[i].line_text){
            var lineText = form[i].line_text[0];

            formElements.push(text(lineText));
            formValidatorElements.push(textValidator(lineText));
        }

        // form number
        if(form[i].line_number){
            var lineNumber = form[i].line_number[0];

            formElements.push(text(lineNumber));
            formValidatorElements.push(textValidator(lineNumber));
        }

        // form paragraph
        if(form[i].line_paragraph){
            var lineParagraph = form[i].line_paragraph[0];

            formElements.push(text(lineParagraph));
            formValidatorElements.push(textValidator(lineParagraph));
        }

        // form password
        if(form[i].line_password){
            var linePassword = form[i].line_password[0];

            formElements.push(text(linePassword));
            formValidatorElements.push(textValidator(linePassword));
        }

        // form password
        if(form[i].line_password_verify){
            var linePasswordVerify = form[i].line_password_verify[0];

            formElements.push(text(linePasswordVerify));
            formValidatorElements.push(textValidator(linePasswordVerify));
        }

        // form checkboxes
        if(form[i].line_checkbox ){
            var lineCheckboxes = form[i].line_checkbox[0];

            formElements.push(text(lineCheckboxes));
            formValidatorElements.push(textValidator(lineCheckboxes));
        }

        // form dropdown
        if(form[i].line_dropdown ){
            var lineDropdown = form[i].line_dropdown[0];

            formElements.push(text(lineDropdown));
            formValidatorElements.push(textValidator(lineDropdown));
        }

        // form radio
        if(form[i].line_radio ){
            var lineRadio = form[i].line_radio[0];

            formElements.push(text(lineRadio));
            formValidatorElements.push(textValidator(lineRadio));
        }

        console.log(form[i]);
    }

    formElements.push(csrf());
    formElements.push(zfFooter());

    formValidatorElements.push(zfValidatorFooter());

    $('#form_file').html( formElements );
    $('#form_file_validator').html( formValidatorElements );

    $('#form_controller').html(zfController(form[0]));
    $('#form_view').html(zfView());
    $('#form_view_helper').html(zfViewHelper());
});

var zfHead = function zfHead (prop){
    var file =
        'namespace ' + prop.namespace + '\\Form; <br>' +
            '<br>' +
            'use Zend\\Captcha; <br>' +
            'use Zend\\Form\\Element; <br>' +
            'use Zend\\Form\\Form; <br>' +
            '<br>' +
            'class ' + prop.class_name + ' extends Form <br>' +
            '<br>' +
            '{ <br>' +
            t + "public function __construct($name = null) <br>" +
            t + "{ <br>" +
                tt + "parent::__construct('" + prop.namespace.toLowerCase() + "'); <br>" +
                tt + "<br>" +
                tt + "$this->setAttribute('method', 'post'); <br>" +
                tt + "<br>";

    return (file);
};

var zfValidatorHead = function zfValidatorHead (prop){
    var file =
        'namespace ' + prop.namespace + '\\Form; <br>' +
            '<br>' +
            'use Zend\\InputFilter\\Factory as InputFactory; <br>' +
            'use Zend\\InputFilter\\InputFilter; <br>' +
            'use Zend\\InputFilter\\InputFilterAwareInterface; <br>' +
            'use Zend\\InputFilter\\InputFilterInterface; <br>' +
            '<br>' +
            'class ' + prop.class_name + 'Validator implements InputFilterAwareInterface <br>' +
            '<br>' +
            '{ <br>' +
            t + "protected $inputFilter; <br>" +
            t + "<br>" +
            t + "public function setInputFilter(InputFilterInterface $inputFilter) <br>" +
            t + "{ <br>" +
                tt + 'throw new \\Exception("Not used"); <br>' +
            t + "} <br>" +
            t + "<br>" +
            t + "public function getInputFilter() <br>" +
            t + "{ <br>" +
                tt + "if (!$this->inputFilter) <br>" +
                tt + "{ <br>" +
                    ttt + "$inputFilter = new InputFilter(); <br>" +
                    ttt + "$factory = new InputFactory(); <br>" +
                    ttt + "<br>" +
                tt + "<br>";

    return (file);
};

var zfFooter = function zfFooter (){
    var file =
            tt + "<br>" +
        t + "} <br>" +
    '} <br>';

    return (file);
};

var zfValidatorFooter = function zfFooter (){
    var file =
                ttt + "<br>" +
            tt + "} <br>" +
        t + "} <br>" +
    '} <br>';

    return (file);
};

var csrf = function csrf (){
    var csrfForm =
    tt + "$this->add(array( <br>" +
        ttt + "'name' => 'csrf', <br>" +
        ttt + "'type' => 'Zend\\Form\\Element\\Csrf', <br>" +
    tt + "));";
    return (csrfForm);
};

var hidden = function hidden (){
    var hiddenForm =
    tt + "$this->add(array( <br>" +
        ttt + "'name' => 'hidden', <br>" +
        ttt + "'type' => 'Zend\\Form\\Element\\Hidden', <br>" +
    tt + "));";
    return (hiddenForm);
};

/**
 * text field
 * @param lineText
 * @return {String}
 */
var text = function text (lineText){
    var textForm =
    tt + "$this->add(array( <br>" +
        ttt + "'name' => '" + lineText.name + "', <br>" +
        ttt + "'type' => '" + lineText.type + "', <br>" +
        ttt + "'attributes' => array( <br>" +
            formAttr(lineText.data) +
        ttt + "), <br>" +
        ttt + "'options' => array( <br>" +
            formOptions(lineText.data) +
        ttt + "), <br>" +
    tt + ")); <br> <br>";
    return (textForm);
};

/**
 * text field validator
 * @param lineText
 * @return {String}
 */
var textValidator = function textValidator (lineText){

    var hasRequired = lineText.data.required ? ttt + "'required' => " + lineText.data.required + ", <br>" : '';

    var textForm =
    tt + "$inputFilter->add($factory->createInput([ <br>" +
        ttt + "'name' => '" + lineText.name + "', <br>" +
        hasRequired +
        ttt + "'filters' => array( <br>" +
            tttt + "array('name' => 'StripTags'), <br>" +
            tttt + "array('name' => 'StringTrim'), <br>" +
        ttt + "), <br>" +
        ttt + "'validators' => array( <br>" +
            formValidatorLength(lineText.data.length) +
            formValidatorNumber(lineText.data) +
            formValidatorToken(lineText.data) +
        ttt + "), <br>" +
    tt + "])); <br> <br>";
    return (textForm);
};

/**
 * @param l
 * @return {String}
 */
var formValidatorLength = function formValidatorLength (l){
    var lMin = '', lMax = '', lengthForm = '';

    if(l && l.min != ''){
        lMin = tttttt + "'min' => '" + l.min  + "', <br>";
    }
    if(l && l.max != ''){
        lMax = tttttt + "'max' => '" + l.max  + "', <br>";
    }

    if(lMin != '' || lMax != ''){
        lengthForm =
            tttt + "array ( <br>" +
                ttttt + "'name' => 'StringLength', <br>" +
                ttttt + "'options' => array( <br>" +
                    tttttt + "'encoding' => 'UTF-8', <br>" +
                    lMin + lMax
                ttttt + "), <br>" +
            tttt + "), <br>" +
            "<br>";
    }
    return (lengthForm);
};

/**
 * @param p
 * @return {String}
 */
var formValidatorToken = function formValidatorToken (p){
    var token = '', tokenForm = '';

    if(p && p.token != ''){
        tokenForm =
            tttt + "array ( <br>" +
                ttttt + "'name' => 'identical', <br>" +
                ttttt + "'options' => array( <br>" +
                    tttttt + "'token' => '" + p.token  + "', <br>" +
                ttttt + "), <br>" +
            tttt + "), <br>" +
            "<br>";
    }
    return (tokenForm);
};

var formValidatorNumber = function formValidatorNumber (digits){
    var digitsName = '';
    if(digits.validators && digits.validators.name){
        digitsName = tttt + "array ( <br>" +
            ttttt + "'name' => '" + digits.validators.name + "', <br>" +
        tttt + "), <br>" +
        " <br>";
    }

    var digitsForm = digitsName;
    return (digitsForm);
};

/**
 * form attr validator
 * @param attr
 * @return {String}
 */
var formAttr = function formAttr (attr){
    var attrClass = '',
        attrId = '',
        attrPlaceholder = '',
        attrRequired = '';

    if(attr.class != ''){
        attrClass = tttt + "'class' => '" + attr.class  + "', <br>";
    }
    if(attr.id != ''){
        attrId = tttt + "'id' => '" + attr.id + "', <br>";
    }
    if(attr.placeholder != ''){
        attrPlaceholder = tttt + "'placeholder' => '" + attr.placeholder + "', <br>";
    }
    if(attr.required != 'false'){
        attrRequired = tttt + "'required' => 'required', <br>";
    }
    var attrForm = attrClass + attrId + attrPlaceholder + attrRequired;

    return (attrForm);
};

/**
 * @param opt
 * @return {String}
 */
var formOptions = function formOptions (opt){
    var optLabel = '';

    if(opt.label != ''){
        optLabel = tttt + "'label' => '" + opt.label  + "', <br>";
    }
    var optForm = optLabel;

    return (optForm);
};

/**
 * @param prop
 * @return {String}
 */
function zfController(prop){
    var props = prop.form_properties[0];
    var file =
        "namespace " + props.namespace + "\\Controller; <br>" +
        "<br>" +
        "use Zend\\Mvc\\Controller\\AbstractActionController; <br>" +
        "use Zend\\View\\Model\\ViewModel; <br>" +
        "use " + props.namespace + "\\Form\\" + props.class_name + "; <br>" +
        "use " + props.namespace + "\\Form\\" + props.class_name + "Validator; <br>" +
        "use " + props.namespace + "\\Model\\" + props.model_name + "; <br>" +
        "<br>" +
        "public function indexAction() <br>" +
        "{ <br>" +
            t + "$form = new " + props.class_name + "(); <br>" +
            t + "$request = $this->getRequest(); <br>" +
            '<br>' +
            t + "if($request->isPost()) <br>" +
            t + "{ <br>" +
                tt + "$user = new " + props.model_name + "(); <br>" +
                tt + "<br>" +
                tt + "$formValidator = new " + props.class_name + "Validator(); <br>" +
                tt + "{ <br>" +
                    ttt + "$form->setInputFilter($formValidator->getInputFilter()); <br>" +
                    ttt + "$form->setData($request->getPost()); <br>" +
                tt + "} <br>" +
                tt + " <br>" +
                tt + "if($form->isValid()){ <br>" +
                tt + "{ <br>" +
                    ttt + "$user->exchangeArray($form->getData()); <br>" +
                tt + "} <br>" +
            t + "} <br>" +
            t + "<br>" +
            t + "return ['form' => $form]; <br>" +
        "} <br>" +
        '<br>';

    return (file);
}
/*
    if($request->isPost())
    {
        if($form->isValid()){
            $user->exchangeArray($form->getData());
        }
    }

    return ['form' => $form];

*/
function zfView(){
    var file =
        "echo $this->formLabel($form->get('email')) . PHP_EOL; <br>" +
        '<br>' +
        "echo $this->formInput($form->get('email')) . PHP_EOL; <br>" +
        '<br>' +
        "echo $this->formElementErrors($form->get('email')) . PHP_EOL; <br>" +
        '<br>' +
        "echo $this->formRow($form->get('email')) . PHP_EOL; <br>" +

        '<br>';

    return (file);
}

function zfViewHelper(){
    var file =
        'namespace Formgen\\View\\Helper; <br>' +
        '<br>' +
        'use Zend\\View\\Helper\\AbstractHelper; <br>' +
        '<br>' +
        'class RenderForm extends AbstractHelper <br>' +
        '<br>' +
        '{ <br>' +
        '&nbsp; public function __invoke($form) <br>' +
        '&nbsp; { <br>' +
        "&nbsp; &nbsp; $form->prepare(); <br>" +
        '&nbsp; &nbsp; <br>' +
        "&nbsp; &nbsp; return $output; <br>" +
        '&nbsp; } <br>' +
        '} <br>';

    return (file);
}
