
//   Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCAvRDVKP4WkzHqUehuUiUI5vGyWmz1aAU",
    authDomain: "train-time-70387.firebaseapp.com",
    databaseURL: "https://train-time-70387.firebaseio.com",
    projectId: "train-time-70387",
    storageBucket: "",
    messagingSenderId: "294025448441",
    appId: "1:294025448441:web:f3954b068c157686"
  };

  
//   Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var trainName = "";

var destination = "";

var startTime = "";

var frequency = 0;


$("#submit").on("click", function(event) {

    event.preventDefault();
    
    if ($("#trainname").val().trim() === "" ||
        $("#destination").val().trim() === "" ||
        $("#firsttraintime").val().trim() === "" ||
        $("#frequency").val().trim() === "") {

        alert("fill in the blanks");

    } else {

        trainName = $("#trainname").val().trim();
        destination = $("#destination").val().trim();
        startTime = $("#firsttraintime").val().trim();
        frequency = $("#frequency").val().trim();

        $(".form-field").val("");

        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            startTime: startTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    }

});

database.ref().on("child_added", function(childSnapshot) {
    var startTimeConverted = moment(childSnapshot.val().startTime, "HH:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemain = timeDiff % childSnapshot.val().frequency;
    var minToArrival = childSnapshot.val().frequency - timeRemain;
    var nextTrain = moment().add(minToArrival, "minutes");
    var key = childSnapshot.key;

    $(".table").append("<tbody><tr id= tr><th scope= row >"+childSnapshot.val().trainName +"</th><td>"+childSnapshot.val().destination+"</td><td>"+childSnapshot.val().frequency +"</td><td>"+moment(nextTrain).format("LT")+"</td><td>"+minToArrival+"</td><td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></tr></tbody>");
  


    

});

$(document).on("click", ".arrival", function() {
    keyref = $(this).attr("data-key");
    database.ref().child(keyref).remove();
    window.location.reload();
});



setInterval(function() {
    window.location.reload();
}, 60000);



setInterval(function(){
    const now = moment();
    const timenow = now.format('h:mm:ss');
    globaltime = now.format('h:mm');
    document.getElementById("watch").innerHTML =timenow;
 
},1000)

