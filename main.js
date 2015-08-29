var scratchPads = [];

$(function(){
  scratchPads.push(CodeMirror($("#scratch")[0]));
  
  
  console.log = function(thing){
    $("#run").append("<span class='input'>" + thing.toString().split(/\n/).join("<br />")+"</span><br />");
  };
  
  var execute = function(code){
    console.log(code);
    var output = "";
    if($("#language").val()=="Javascript"){
      output = eval(code);
    } else if($("#language").val()=="Coffeescript"){
      output = eval(CoffeeScript.compile(code));
    }
    $("#run").append("<span class='output'>" + output + "</span><br />");
  };
  
  $("#current").keydown(function(e){
    if(e.keyCode == 13){
      execute($(this).text());
      $(this).text("");
    }
  });
  
  $("#execute button").click(function(e){
    var code = "";
    if(this.innerTHML == "Selection"){
      code = scratchPads[0].getSelection();
    } else if (this.innerHTML == "Line") {
      code = scratchPads[0].getLine(scratchPads[0].getCursor().line);
    } else {
      code = scratchPads[0].getValue();
    }
    execute(code);
  })
  
});