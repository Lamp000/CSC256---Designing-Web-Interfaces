function saveInfo(){
    // create the shortcut/nicknames for the HTML elements
    let txtUserName = document.getElementById("txtUserName");
    let txtSkill = document.getElementById("txtSkill");
    let numHealth = document.getElementById("numHealth");
    let numPoints = document.getElementById("numPoints");

    // build a string with the titles and the users inputs
    let output = "User Name: " + txtUserName.value + "\n\n" + 
        "Special Skill: " + txtSkill.value + "\n\n" + 
        "Health: " + numHealth.value + "\n\n" + 
        "Point Total: " + numPoints.value;

    // add the output to the textarea
    document.getElementById("textahero").value = output;

    // clean out all the textboxes
    txtUserName.value = "";
    txtSkill.value = "";
    numHealth.value = "";
    numPoints.value = "";
}