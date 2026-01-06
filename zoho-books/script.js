// document.querySelector("#myForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   console.log("Form submission started", this);

//   function getParameterByName(name) {

//     const value1 = new URLSearchParams(window.location.search).get(name);

//     console.log(`Parameter ${name}:`, value1);

//     return value1;
//   }

//   // Populate hidden fields with UTM parameters from the URL
//   document.getElementById("utm_id").value = getParameterByName("utm_id");
//   document.getElementById("utm_source").value = getParameterByName("utm_source");
//   document.getElementById("utm_medium").value = getParameterByName("utm_medium");
//   document.getElementById("utm_campaign").value = getParameterByName("utm_campaign");
//   document.getElementById("utm_term").value = getParameterByName("utm_term");
//   document.getElementById("utm_content").value = getParameterByName("utm_content");

//   console.log("UTM parameters", {
//     utm_id: getParameterByName("utm_id"),
//     utm_source: getParameterByName("utm_source"),
//     utm_medium: getParameterByName("utm_medium"),
//     utm_campaign: getParameterByName("utm_campaign"),
//     utm_term: getParameterByName("utm_term"),
//     utm_content: getParameterByName("utm_content"),
//   });

//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//     return null;
//   }

//   // Collect form data
//   let formData = new FormData(this);

//   const hsContext = {
//     hutk: getCookie("hubspotutk"),
//     pageUrl: window.location.href,
//     pageName: document.title,
//   };

//   formData.append("hs_context", JSON.stringify(hsContext));

//   console.log("HubSpot context", hsContext);

//   console.log(
//     "FormData entries",
//     Array.from(formData.entries()).map(([key, value]) => [key, value])
//   );

//   // Send post request to the server
//   fetch(
//     "https://forms.hubspot.com/uploads/form/v2/23736002/688d8b8a-37c8-4bf1-bd94-9e2e31d4c0d8",
//     {
//       method: "POST",
//       body: formData,
//     }
//   )
//     .then((response) => {
//       console.log("Submission response status", response.status);
//       if (response.status >= 200 && response.status < 300) {
//         // Show success message
//         document.querySelector("#thankYou").innerHTML =
//           "Thank you for submitting the form!";
//         document.querySelector("#thankYou").style.color = "green";
//         document.querySelector("#thankYou").style.display = "block";
//       } else {
//         // Show error message
//         document.querySelector("#thankYou").innerHTML =
//           "An error occurred while submitting the form. Please try again later.";
//         document.querySelector("#thankYou").style.color = "red";
//         document.querySelector("#thankYou").style.display = "block";
//       }

//       // Remove form
//       this.remove();
//     })
//     .catch((error) => {
//       console.error(error);
//       console.log("Submission error details", error);
//       // Show error message
//       document.querySelector("#thankYou").innerHTML =
//         "Something went wrong, please try again later.";
//       document.querySelector("#thankYou").style.color = "red";
//       document.querySelector("#thankYou").style.display = "block";
//       // Remove form
//       this.remove();
//     });
// });

document.querySelector("#myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  //Add UTM to document
  function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var url = window.location.href;
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  // Populate hidden fields with UTM parameters from the URL
  document.getElementById('utm_id').value = getParameterByName('utm_id');
  document.getElementById('utm_source').value = getParameterByName('utm_source');
  document.getElementById('utm_medium').value = getParameterByName('utm_medium');
  document.getElementById('utm_campaign').value = getParameterByName('utm_campaign');
  document.getElementById('utm_term').value = getParameterByName('utm_term');
  document.getElementById('utm_content').value = getParameterByName('utm_content');

  // Collect form data


  // Add hs_context to the formData

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }


  let formData = new FormData(this);


  const hsContext = {
    hutk: getCookie('hubspotutk'), // include the HubSpot user token if available
    pageUrl: window.location.href, // captures the current page URL
    pageName: document.title // captures the page title
  };

  // Add hs_context to formData as a JSON string
  formData.append('hs_context', JSON.stringify(hsContext));

  // Send post request to the server
  fetch(
    "https://forms.hubspot.com/uploads/form/v2/23736002/688d8b8a-37c8-4bf1-bd94-9e2e31d4c0d8",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => {

      if (response.status >= 200 && response.status < 300) {
        // Show success message
        document.querySelector("#thankYou").innerHTML =
          "Thank you for submitting the form!";
        document.querySelector("#thankYou").style.color = "green";
        document.querySelector("#thankYou").style.display = "block";
      } else {
        // Show error message
        document.querySelector("#thankYou").innerHTML =
          "An error occurred while submitting the form. Please try again later.";
        document.querySelector("#thankYou").style.color = "red";
        document.querySelector("#thankYou").style.display = "block";
      }

      // Remove form
      this.remove();
    })
    .catch((error) => {
      console.error(error);

      // Show error message
      document.querySelector("#thankYou").innerHTML =
        "Something went wrong, please try again later.";
      document.querySelector("#thankYou").style.color = "red";
      document.querySelector("#thankYou").style.display = "block";
      // Remove form
      this.remove();
    });
});




// Slider fade
const slider = document.getElementById("slider")
const fadeRight = document.getElementById("slider-fade-right")

function checkScrollEnd() {
  const atEnd =
    slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1

  fadeRight.classList.toggle("hidden", atEnd)

}

slider.addEventListener("scroll", checkScrollEnd)

// Run on load
checkScrollEnd();


