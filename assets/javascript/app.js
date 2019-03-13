
// adding firebase info 
var config = {
    apiKey: "AIzaSyCENTyE5FAschXgGqJVIaBCDYpsjlLyin4",
    authDomain: "train-scheduler-1872b.firebaseapp.com",
    databaseURL: "https://train-scheduler-1872b.firebaseio.com",
    projectId: "train-scheduler-1872b",
    storageBucket: "train-scheduler-1872b.appspot.com",
    messagingSenderId: "982199595729"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
// starting the on click for the submit button to add information to firebase
  $("#submit-info").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    // making it so all train info must be entered or it returns an alert
        if (trainName != "" &&
            destination != "" &&
            firstTrain != "" &&
            frequency != "") {

            database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
            });

        } else {

        alert ("please enter all train information");
        $("input").val("");
        return false;
        }

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");

    });

database.ref().on("child_added", function (childSnapshot) {
    
    var name = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;
    var arrivalMinutes;
    var arrivalTime;

    
    var trainTime = moment(firstTrain, "hh:mm").subtract(1, "years");

    
    var minuteDifference = moment().diff(moment(trainTime), "minutes");
    var remainder = minuteDifference % frequency;
    arrivalMinutes = frequency - remainder;

    var nextTrain = moment().add(arrivalMinutes, "minutes");
    arrivalTime = moment(nextTrain).format("hh:mm");


    var newRow = $("<tr>").append(
        
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(arrivalTime),
            $("<td>").text(arrivalMinutes)
        );
    
    $("#table > tbody").append(newRow);
});
// function deleteDocument(documentId) {
//     database.ref().child(documentId).set(null);
//     alert("Train successfully deleted!");
//     location.reload();
// }