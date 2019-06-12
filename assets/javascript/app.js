//create an array of strings, 
//each one related to a topic that interests you.
var pastryOpt = ["Cupcake", "Cookie", "Pie", "Bread"]

// Function for displaying gifS data
function renderButtons() {
    console.log("got into renderButtons");
    // Deleting the pastry-button before to adding new gif button
    // 
    $("#button-contain").empty();

    // Looping through the array of pastry opt
    for (var i = 0; i < pastryOpt.length; i++) {
        console.log("building a button");
      // Then dynamicaly generating buttons for each option in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("button btn-outline- btn-lg img-responsive m-1 buttonS button queryButton");
      // Adding a data-attribute with a value of the pastryOpt at index i
      a.attr("data-name", pastryOpt[i]);
      // Providing the button's text with a value of the pastryOpt at index i
      a.text(pastryOpt[i]);
      // Adding the button to the HTML
      $("#button-contain").append(a);
    }
  }

  
  // This function handles events where one button is clicked
  $("#add-pastry").on("click", function(event) {
    console.log("got into click function");
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    
    // This line will grab the text from the input box
    var gif = $("#pastry-input").val().trim();
    // The term from the textbox is then added to our array
    pastryOpt.push(gif);
    
    // calling renderButtons which handles the processing of our gif array
    renderButtons();
    
    newButtons();
    
    resetForm();
  });
  
  function resetForm() {
    document.getElementById("gif-form").reset();
  }
  // Calling the renderButtons function at least once to display the initial list of pastries
  renderButtons();
  
  newButtons();
  function newButtons(){
    //Start of function to make api call
    $(".queryButton").click(function() {
      // var person = $(this).attr("data-name");
      // use the line of code from above to grab the name not a . this 
      var name = $(this).text().trim();
      console.log(name)
      
      
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      name + "&api_key=9cCKc62OZDddZ0RUg9LA97G7jrfitNpq&limit=10";
      
      $.ajax({
        url: queryURL,
        method: "GET"
      })
    .then(function(response) {
      var results = response.data;
      console.log(response, "response")
      
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        
        var rating = results[i].rating;
        
        var p = $("<p>").text("Rating: " + rating);
        
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif");
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);
        
        $("#gifs-appear-here").prepend(gifDiv);
      }
      console.log("index 4",pastryOpt[4])
// this bit of code taken from an activity should load in the gifs as still and then animate them 
//on a click
      $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
  });
});
  };