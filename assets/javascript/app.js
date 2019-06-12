
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

function time() {
    var currentTime = moment().format('LT');
    // $("#time").html(currentTime);
    setTimeout(time, 1000);
};

$(".form-field").on("keyup", function() {
    var trainFld = $("#trainname").val().trim();
    var cityFld = $("#destination").val().trim();
    var timeFld = $("#firsttraintime").val().trim();
    var freqFld = $("#frequency").val().trim();

    sessionStorage.setItem("train", trainFld);
    sessionStorage.setItem("city", cityFld);
    sessionStorage.setItem("time", timeFld);
    sessionStorage.setItem("freq", freqFld);
});

$("#trainname").val(sessionStorage.getItem("train"));
$("#destination").val(sessionStorage.getItem("city"));
$("#firsttraintime").val(sessionStorage.getItem("time"));
$("#frequency").val(sessionStorage.getItem("freq"));

$("#submit").on("click", function(event) {
    event.preventDefault();

    if ($("#trainname").val().trim() === "" ||
        $("#destination").val().trim() === "" ||
        $("#firsttraintime").val().trim() === "" ||
        $("#frequency").val().trim() === "") {

        alert("Please fill in all details to add new train");

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

        sessionStorage.clear();
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
    // var newrow = $("<tr>");
    // newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
    // newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
    // newrow.append($("<td class='text-center'>" + childSnapshot.val().frequency + "</td>"));
    // newrow.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
    // newrow.append($("<td class='text-center'>" + minToArrival + "</td>"));
    // newrow.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));

    if (minToArrival < 6) {
        $("#tr").addClass("info");
    }

    

});

$(document).on("click", ".arrival", function() {
    keyref = $(this).attr("data-key");
    database.ref().child(keyref).remove();
    window.location.reload();
});

time();

setInterval(function() {
    window.location.reload();
}, 60000);



setInterval(function(){
    const now = moment();
    const timenow = now.format('h:mm:ss');
    globaltime = now.format('h:mm');
    document.getElementById("watch").innerHTML =timenow;
 
},1000)

