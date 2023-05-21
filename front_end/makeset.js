var makeButton = document.getElementById("nextButton");
var cardContainer = document.getElementById("cardContainer");

makeButton.addEventListener("click", function() {
  var wordInput = document.getElementById("word").value;
  var descriptionInput = document.getElementById("description").value;

  if (wordInput.trim() !== "" && descriptionInput.trim() !== "") {
    createCard(wordInput, descriptionInput);
  } else {
    alert("Please enter both word and description.");
  }
});

function createCard(word, description) {
  var card = document.createElement("div");
  card.classList.add("card");

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", function() {
    card.remove(); // Remove the card when delete button is clicked
  });

  var wordElement = document.createElement("h2");
  wordElement.classList.add("word");
  wordElement.textContent = word;

  var descriptionElement = document.createElement("p");
  descriptionElement.classList.add("description");
  descriptionElement.textContent = description;

  card.appendChild(deleteButton);
  card.appendChild(wordElement);
  card.appendChild(descriptionElement);

  cardContainer.appendChild(card);

  // Clear the word and description inputs
  document.getElementById("word").value = "";
  document.getElementById("description").value = "";
}

document.getElementsByClassName("create-set-button")[0].addEventListener("click", function(event) {
  createNewSet(document.getElementById("setname").value, document.getElementsByClassName("card"));
});

function createNewSet(name, items) {
  var setJSON = { "set": name, "data": {} };

  for (var i = 1; i < items.length; i++) {
    var wordElement = items[i].querySelector(".word");
    var descriptionElement = items[i].querySelector(".description");

    if (wordElement && descriptionElement) {
      setJSON["data"][wordElement.textContent] = descriptionElement.textContent;
    }
  }

  fetch("/createNewSet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(setJSON)
  }).then(function(res) {
    if (res.status == 200) {
      window.location.href = res.url;
    } else {
      console.log("Unable to Create New Set!");
    }
  }).catch(function(err) {
    console.log("Error:", err);
  });
}
