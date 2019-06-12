
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
  
database.ref().on("child_added", function(snapshot) {
 
    var trainn = snapshot.val().trainn;
    var des = snapshot.val().des;
    var freqe = snapshot.val().freqe;
    var firstdepart = snapshot.val().firstdepart;
    var nimaway = snapshot.val().nimaway;
    var nextrain = snapshot.val().nextrain;


    $(".table").append("<tbody><tr><th scope= row >"+trainn+"</th><td>"+des+"</td><td>"+freqe+"</td><td>"+nextrain+"</td><td>"+nimaway+"</td></tr></tbody>");
    
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

 
  




$("#submit").on("click",function(){
    var fr=0;
    var freq=0;
    var trainname =$("#trainname").val();
    var destination =$("#destination").val();
    var firsttraintime =$("#firsttraintime").val();
    var frequency =$("#frequency").val();


 if (trainname == "" || destination == "" || firsttraintime == "" || frequency == ""){
    console.log("empty");
 }else{
   
    var startTime = moment();
    var next = moment(firsttraintime,'h:mm').add(frequency, 'minutes');
    var minnexttr = (next.hour()*60)+next.minute();
    var strtime = (startTime.hour()*60)+startTime.minute();
    console.log(minnexttr);
    console.log(strtime);
    fr= parseInt(frequency);
    freq=fr
    
        while(minnexttr < strtime){
        freq=freq+fr
        
        next = moment(firsttraintime,'h:mm').add(freq.toString(), 'minutes')
        minnexttr = (next.hour()*60)+next.minute();
        strtime = (startTime.hour()*60)+startTime.minute();
        console.log("yess");
        }
    var duration = moment.duration(next.diff(startTime));
    var min = duration.asMinutes();
    var minaw = Math.round(min);
    var nerttr =next.format('h:mm');
    console.log(minaw);
    console.log(nerttr);
    // $(".table").append("<tbody><tr><th scope= row >"+trainname+"</th><td>"+destination+"</td><td>"+frequency+"</td><td>"+nerttr+"</td><td>"+minaw+"</td></tr></tbody>");
    
    database.ref().push({
        trainn: trainname,
        des: destination,
        freqe : frequency,
        firstdepart :firsttraintime,
        nimaway : minaw,
        nextrain : nerttr,
      });
 }
 
    
 
})



setInterval(function(){
    const now = moment();
    const timenow = now.format('h:mm:ss');
    globaltime = now.format('h:mm');
    document.getElementById("watch").innerHTML =timenow;
 
},1000)

