
/***** Ouvrir caméra  *****/

    navigator.mediaDevices.getUserMedia({ audio: false, video: {facingMode:'environment'}}).then(function(mediaStream) {

     var video = document.getElementById('sourcevid');
     video.srcObject = mediaStream;

     video.onloadedmetadata = function(e) {
      video.play();
     };
      
    }).catch(function(err) { console.log(err.name + ": " + err.message)});
   


/***** Capture photo  *****/
   
   function photo(){

    var vivi = document.getElementById('sourcevid');

    var canvas1 = document.getElementById('cvs')
    var ctx =canvas1.getContext('2d');
    canvas1.height=vivi.videoHeight
    canvas1.width=vivi.videoWidth
    ctx.drawImage(vivi, 0,0, vivi.videoWidth, vivi.videoHeight);

    var base64_img=canvas1.toDataURL("image/png"); 
    $("#container-images").append('<div class="img-item"><img src="'+base64_img+'"><div class="action-icons"><i class="fa fa-eye" aria-hidden="true"></i><i class="fa fa-trash-o" aria-hidden="true"></i></div></div>');



   }

   /***** supprimer  photo  *****/

$( "#container-images" ).on( "click",'.fa-trash-o', function() {
    $(this).parent().parent().remove();
});

$( "#container-images" ).on( "click",'.fa-eye', function() {
  var img =$(this).parent().parent().find('img').attr('src') 
  $("#img-container-modal img").remove()
  $("#img-container-modal").append('<img src="'+img+'">')
  $("#myModal").css("display","block")
});



/***** Switch caméra  *****/

function switch_cam(){

    var facingMode =  $("#facingMode").text()

    if(facingMode=="environment"){
        mode = "user"
    }else if(facingMode=="user") {
        mode = "environment"
    }


    $("#facingMode").text(mode)

    navigator.mediaDevices.getUserMedia({ audio: false, video: {facingMode:mode}}).then(function(mediaStream) {

        var video = document.getElementById('sourcevid');
        video.srcObject = mediaStream;
   
        video.onloadedmetadata = function(e) {
         video.play();
        };
         
       }).catch(function(err) { console.log(err.name + ": " + err.message)});

}



/*** modal */


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}