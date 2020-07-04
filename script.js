$(function(){
    var reading = 0;
    var myArray;
    var counter;
    var speed;
    var action;
    var progressPercent
    $("#text").focus();
    $("#start").click(function(){
        myArray = $("#text").val().split(/\s+/);
        myArray = myArray.filter(function(str) {
    return /\S/.test(str);
});
//        console.log(myArray);
        if(myArray.length >1){
            $("#error").hide(); 
            $(this).hide();
            $("#sliders form").show();
            $("#new").show();
            $("#words").show();

            $("#pause").show();
            reading =1;
            $("#text").hide();
            $("#progress").attr("max",myArray.length-1);
            counter = 0;
            $("#words").text(myArray[counter]);
        speed =200;
        action = setInterval(showWord,speed);
            
        }
        else{
            $("#error").show();
        $("#text").focus();
        $("textarea").val('')
        }
    });
    $("#new").click(function(){
        location.reload();
    });
    $("#pause").click(function(){
        clearInterval(action);
        $("#resume").show();
        $(this).hide();
        reading = 0;
    });
    $("#resume").click(function(){
        action = setInterval(showWord,speed);
        $("#pause").show();
        $(this).hide();
        reading = 1;
    });
    
    $("#font").on("slidestop",function(event,ui){
        $("#font").slider("refresh");
        var value = $("#font").val();
//       console.log(value);
$("#words").css("fontSize",parseInt(value)); 
        $("#fontsize").text(value);
    });
    $("#speed").on("slidestop",function(event,ui){
        $("#speed").slider("refresh");
        speed = Math.round(60000/parseInt($("#speed").val()));
//       console.log(value);

        $("#wpm").text(parseInt($("#speed").val()));
        clearInterval(action);
        if(reading){
            action = setInterval(showWord,speed);
        }
    });
    $("#progress").on("slidestop",function(event,ui){
        $("#progress").slider("refresh");
        progressPercent = Math.round($("#progress").val()/(myArray.length-1)*100);
        $("#percent").text(progressPercent);
        clearInterval(action);
        counter = parseInt($("#progress").val());
        $("#words").text(myArray[counter]);
        if(reading){
           action = setInterval(showWord,speed); 
        }
    });
    
    
    function showWord(){
        if(counter == myArray.length-1){
            $("#pause").hide();
            clearInterval(action);
            reading = 0;
            $("#words").hide();
        }else{
            counter++;
            $("#words").text(myArray[counter]);
           progressPercent = Math.round(counter/(myArray.length-1)*100);
       $("#percent").text(progressPercent); $("#progress").val(counter).slider("refresh");
        }
    }
});