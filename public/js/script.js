$(document).ready(function(){
    console.log(`ready`);
    
    var socket = io();
    
    socket.on('welcome', function(color){
        $('body').css('background-color', color);
    });


    socket.on('update', function(color){
        console.log(`Updated color: ${color}`);
        
        $('body').css('background-color', color);
    });

    $("button").click(function(){
        let colorVal = $(this).attr('data-value');
        socket.emit('color_change', colorVal);  
    });


});