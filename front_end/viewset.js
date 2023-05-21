
fetch("/viewSets", {
    method: "POST", 
    headers: {
        "Content-Type": "application/json"
    }
}).then(function(res) {
    return res.json()
}).then(function(data) {
    console.log(data)
    for (i = 0; i < Object.keys(data).length; i++) {
        var card = document.createElement("div")
        //card.style.fontWeight = "bold";
        var set_name = document.createElement("div")
        set_name.style.fontWeight = "bold";
        set_name.textContent = "Set "+ (i+1) + ": " + data[i]["set"]
        card.appendChild(set_name)

        var a = Object.keys(data[i]["data"])
        var sections = document.createElement("div")  
        sections.setAttribute("class", "set-card2")
        var button = document.createElement("button");
        button.textContent = "Quiz Me!";
        button.addEventListener("click", function() {
            window.location.href = "quiz.html";
          });
        button.setAttribute("class", "create-set-button")
          card.appendChild(button);
        //every i make a new body
        card.setAttribute("class", "set-card")
        for (j = 0; j < a.length; j++) {
            var key = a[j]  
            var body = document.createElement("div")
            var new_div = document.createElement("div")
            
            new_div.textContent ="Term: " + key
            body.textContent = "Definition: "+ data[i]["data"][a[j]]
            
           
            sections.appendChild(new_div)
            sections.appendChild(body)
            document.getElementsByClassName("set-container")[0].appendChild(sections)
            
        
        }

        card.appendChild(sections)
        document.getElementsByClassName("set-container")[0].appendChild(card)
        card.classList.add('hidden-object');
        
    }
}).catch(function(err) {
    console.log("Error: ", err)
})




//For tyring to make the cards appear one by one
function createDivWithScrollAnimation() {
    var card = document.createElement("div");
    // ... Add content and styles to the card ...
  
    // Apply scroll animation to the dynamically created div
    card.classList.add('hidden-object');
    document.body.appendChild(card);
  }
  
  window.addEventListener('scroll', function() {
    var viewportHeight = window.innerHeight;
    var cards = document.getElementsByClassName("hidden-object");
  
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var cardTop = card.getBoundingClientRect().top;
      var cardBottom = card.getBoundingClientRect().bottom;
  
      if (cardTop < viewportHeight && cardBottom > 0) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    }
  });
  
  