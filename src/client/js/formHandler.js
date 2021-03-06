async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  //let formText = "\"{'message':";
  //formText = formText + "'" + document.getElementById("name").value + "'}\"";
  
  let formText = document.getElementById("name").value;
  let validInput =  Client.checkForName(formText);
  
  if(validInput){
    console.log("valid input");
    let jPost = {
        message: "testing message",
      };

      jPost.message = formText;

      console.log("::: Form Submitted :::  " + formText);
      const res = await fetch("http://localhost:8081/getInfo", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jPost),
      });

      try {
        const data = await res.json();
        console.log("return data " + data.agreement + " " + data.score_tag);
        document.getElementById("results").innerHTML ="Results: " +  data.agreement + " " + data.score_tag;
      } catch (error) {
        console.log("Error getting stuff", error);
      }
  }
  else{
    console.log("invalid input");
  }

}

export { handleSubmit };
