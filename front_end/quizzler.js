var loginForm = document.getElementById("loginForm");
var registerButton = document.getElementById("registerButton");
var registerSubmitButton = document.getElementById("registerSubmitButton")
var registerModal = document.getElementById("registerModal");
var closeBtn = document.querySelector(".close");

registerButton.addEventListener("click", function() {
  registerModal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
  registerModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
});

registerSubmitButton.addEventListener("click", function(event) {
	addUser(document.getElementById("newUsername").value, document.getElementById("newPassword").value)
	registerModal.style.display = "none"
})

loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
	testLogin(document.getElementById("username").value, document.getElementById("password").value)
});


function testLogin(usernameIn, passwordIn) {
  
   fetch("/", {
    method: "POST", 
    headers: {
      'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify({username: usernameIn, password: passwordIn})
  }).then(function(res) {
    if (res.status == 200) {
      window.location.href = res.url
    }
    else {
      alert("Not a valid password! Please try registering instead!")
    }
  })
}

function addUser(usernameIn, passwordIn) {
	fetch("/register", {
		method: "POST", 
		headers: {
			"Content-Type" : "application/json"
		}, 
		body: JSON.stringify({username: usernameIn, password: passwordIn})
	}).then(function(res) {
		if (res.status == 200) {
			alert("You are registered! Attempt to login again")
		}
		else {
			alert("You were unable to register! Try again.")
		}
	}).catch(function(err) {
		alert("Error", err)
	})
}

function submitSet(object) {
  fetch("/create", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(object)
  }).then(function(res) {
      if (res.status == 200) {
        return res.body
      }
      else {
        alert("Unable to publish the set!!")
      }
  }).catch(function(err) {
    alert("Error: ", err)
  }) 
}
