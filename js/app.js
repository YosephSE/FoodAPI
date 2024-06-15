var queryURLbase =
  "https://api.edamam.com/search?&app_id=4a5d81a2&app_key=379308ab9da9a8ee47f63563d2774ac4&from=0&to=9&q=";

var userInput, label, sourceLink;
var from = 0;
var to = 9;

function testAjax(queryURL) {
  fetch(queryURL)
    .then((resp) => resp.json())
    .then(function (data) {
      for (var i = 0; i < 9; i++) {
        //create recipe card.
        var card = $("<div>");

        card.addClass("card col s12 m6 l4");

        var cardImg = $("<div>");
        cardImg.addClass("card-image recipe-image");

        //Create variable for recipe image and append to card.
        var img = $("<img>");
        imgAPI = data.hits[i].recipe.image;
        img.attr("src", imgAPI);
        cardImg.append(img);
        card.append(cardImg);

        var cardContent = $("<div>");
        cardContent.addClass("card-content");

        //Variable for the recipe title/label.
        var spanTitle = $("<span>");
        spanTitle.addClass("card-title");
        label = data.hits[i].recipe.label;
        //This appends the recipe title/label to the recipe image.
        cardImg.append(spanTitle);

        var pRecipe = $("<p>");
        for (var j = 0; j < 20; j++) {
          var recipeUgly = data.hits[i].recipe.ingredientLines[j];
          var newIng = $("<p>");
          newIng.text(recipeUgly);
          pRecipe.append(newIng);
        }
        cardImg.after(cardContent);

        // Use Materialize css card reveal feature to reveal ingredients upon button click.
        // Add the class activator to an element inside the card to allow it to open the card reveal.
        img.addClass("activator");

        // Create span element to hold the button that opens the card reveal.
        activateIngredients = $("<span>");

        // Add the class activator and add "Ingredients" text.
        activateIngredients
          .addClass("card-title activator")
          .text(label);

        // Create button that will open the card reveal and show the ingredients.
        revealIngredientsIcon = $("<i>");

        // Add data attributes to display tooltip text. data-position=top shows tooltip text above button.
        // data-tooltip is the tooltip text that appears when user hovers over button.
        revealIngredientsIcon
          .addClass("material-icons right tooltipped")
          .text("more_vert")
          .attr("data-position", "top")
          .attr("data-tooltip", "Click to view ingredients.");

        // Initialize tooltip for show Ingredients button.
        $(".tooltipped").tooltip({ delay: 30 });
        activateIngredients.append(revealIngredientsIcon);

        // Append the card reveal button to the card.
        cardContent.append(activateIngredients);

        // Create div for card reveal.
        var cardReveal = $("<div>");
        cardReveal.addClass("card-reveal");

        // Create title for card reveal.
        var cardRevealTitle = $("<span>");
        cardRevealTitle.addClass("card-title").text("Ingredients");

        // Create icon that allows users to close card reveal and return to cardContent.
        var closeRevealIcon = $("<i>");
        closeRevealIcon.addClass("material-icons right").text("close");
        cardRevealTitle.append(closeRevealIcon);

        // Append the title of card reveal to card reveal div.
        cardReveal.append(cardRevealTitle);

        // Append the card reveal div to the card.
        card.append(cardReveal);

        // Append the ingredients to the card reveal.
        cardReveal.append(pRecipe);

        var cardAction = $("<div>");
        cardAction.addClass("card-action");

        // Dynamically create external recipe link and open the link in a new tab.
        var link = $("<a>");
        link.text("More info");
        sourceLink = data.hits[i].recipe.url;
        link.attr("href", sourceLink);
        // Adding attribute to link so that recipe link opens in a new tab window.
        link.attr("target", "_blank");

        cardAction.append(link);
        cardContent.after(cardAction);
        $("#recipe-list").append(card);
      }
    });
}

$("#submit").on("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  //Grab the user input from the main word search text box.
  userInput = $("#user-input").val().trim().toLowerCase();

  // Integrate user input into our ajax request
  var searchURL = queryURLbase + userInput;
  testAjax(searchURL);

  // Clear previous search
  $("#recipe-list").empty();
  $("#user-input").val("");

  // Reset the display of the load more button to its initial state
  $("#load-more").css("display", "initial");
});

$("#load-more").on("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  //Grab the user input from the main word search text box.
  from += 10;
  to += 10;

  // URL restatement
  var queryURLnext =
    "https://api.edamam.com/search?&app_id=4a5d81a2&app_key=379308ab9da9a8ee47f63563d2774ac4&q=" +
    userInput +
    "&from=" +
    from +
    "&to=" +
    to;
  testAjax(queryURLnext);
});
