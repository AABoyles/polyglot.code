var scratchPads = [];

$(function(){
  scratchPads.push(
    CodeMirror($("#scratch")[0], {
      mode: $("#language").val().toLowerCase(),
      lineNumbers: true
    })
  );
  
  var jqconsole = $('#console').jqconsole('Hi\n', '>');

  var startPrompt = function () {
    jqconsole.Prompt(true, function (input) {
      var output = execute(input);
      if(typeof output != "undefined"){
        jqconsole.Write(output + '\n', 'jqconsole-output');
      }
      startPrompt();
    });
  };

  console.log = function(thing){
    jqconsole.Write(thing.toString() + '\n', 'jqconsole-output');
  };
  
  var execute = function(code){
    var output = "";
    switch($("#language").val()){
      case "CoffeeScript":
        output = eval(CoffeeScript.compile(code));
        break;
      case "Javascript":
        output = eval(code);
        break;
      default:
        output = "Error: Unrecognized Language!";
    }
    return output;
  };
  
  $("#execute button").click(function(e){
    var code = "";
    if(this.innerHTML == "Selection"){
      code = scratchPads[0].getSelection();
    } else if (this.innerHTML == "Line") {
      code = scratchPads[0].getLine(scratchPads[0].getCursor().line);
    } else {
      code = scratchPads[0].getValue();
    }
    jqconsole.Write(code + '\n', 'jqconsole-output');
    var output = execute(code);
    if(typeof output != "undefined"){
      jqconsole.Write(output + '\n', 'jqconsole-output');
    }
  })
  
  startPrompt();
  
});
