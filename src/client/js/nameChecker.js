function checkForName(inputText) {
  console.log("::: Running checkForName :::", inputText);
 
  //const btn = document.getElementById("submit");
  //btn.s

  if (inputText === "") {
    alert("Input can't be empty");
    const txtBox =  document.getElementById("name");
    txtBox.focus();
    return false;

  }

  return true;
}

export { checkForName };
