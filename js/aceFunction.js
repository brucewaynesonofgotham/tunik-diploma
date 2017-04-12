/*Запускайте через http-server (npm install http-server -g)*/
const pathToCode = "http://127.0.0.1:8080/js/functionForTest.js";
const pathToSpecs = "http://127.0.0.1:8080/js/specs.js";

/*Функции для подключения редакторов*/
function aceDescr() {
    var editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().on('change', function () {
        currentDescrContent = editor.getValue();
    });
    editor.setValue('describe("Проверка факториала", function() {\n\tit("Факториал 5", function() {\n\t\t' +
        'assert.equal(factorial(5), 120);\n\t});\n\tit("факториал 4", function() {\n\t\tassert.equal(factorial(4),24);' +
        '\n\t});\n})');
}
function aceFunc() {
    var editor = ace.edit("editorFunc");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().on('change', function () {
        currentFuncContent = editor.getValue();
    });
    editor.setValue('function factorial(n) {\n\treturn (n != 1) ? n * factorial(n - 1) : 1;\n}')
}

/*Переменные для innerHTML*/
var currentDescrContent = '';
var currentFuncContent = '';

/*Добавляем скрипт со спеками и запускаем mocha*/
function startSpec() {
    saveCode(pathToSpecs,currentDescrContent);
    eval(currentFuncContent);
    eval(currentDescrContent);
    mocha.run();
}

/*Добавляем скрипт с функцией*/
function saveCode(path,content) {
    if(isScriptExist(path)){
        removeScript(path);
        appendScript(path,content);
    }else{
        appendScript(path,content);
    }
}

/*Добавление, удаление и проверка наличия скрипта*/
function appendScript(pathToScript,inner) {
    var js = document.createElement("script");
    js.innerHTML = inner;
    js.type = "text/javascript";
    js.src = pathToScript;
    document.body.appendChild(js);
}
function removeScript(pathToScript) {
    scripts = document.body.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var js = scripts[i];
        if (js.src == pathToScript) {
            document.body.removeChild(js);
            break;
        }
    }
}
function isScriptExist(pathToScript) {
    scripts = document.body.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var js = scripts[i];
        if (js.src == pathToScript) {
            value = true;
            break;
        }
        else{
            value = false;
        }
    }
    return value;
}
var value = true;
var scripts = '';


aceFunc();
aceDescr();