let students = [
    ["Jack Schneider", "Computer Science", "JSCHNEIDER93339@uat.edu", "6/12/28", "Pink", "6/8/06", "JackSchneider.png"],
    ["John Smith", "AI and Robotics", "JSMITH12345@uat.edu", "6/12/28", "Red", "1/1/05", "johnsmith.jpg"],
    ["Daryl Richards", "Business Technology", "DRICHARDS12345@uat.edu", "6/12/28", "Blue", "1/2/05", "DarylRichards.webp"]
];
let ref = ["name", "major", "email", "grad", "color", "birthday", "image"]
let thing = ["Student: ", "Major: ", "Student Email: ", "Expected Graduation Date: ", "Favorite Color: ", "Birthday: ", "image"]
let colors = ["Pink", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black", "White"]
let rgbs = ["rgb(255, 145, 187)", "rgb(201, 0, 0)", "rgb(255, 150, 29)", "rgb(223, 219, 22)", "rgb(23, 163, 35)", "rgb(38, 95, 218)", "rgb(124, 44, 216)", "rgb(0, 0, 0)", "rgb(255, 255, 255)"]

for(let i=0; i<students.length; i++){
    let profile = document.createElement("div")
    profile.setAttribute("class", "profile")
    profile.setAttribute("id", "Profile"+i)
    for(let k=0; k<rgbs.length; k++){
        if(students[i][4]==colors[k]){
            profile.style.backgroundColor= rgbs[k]
        }
    }
    document.getElementById("johnnyDiv").appendChild(profile)
    for(let o=0; o<students[i].length; o++){
        if(o==6){
            let element = document.createElement("img")
            element.setAttribute("class", ref[o])
            element.setAttribute("src", students[i][o])
            document.getElementById("Profile"+i).appendChild(element)
        }
        else{
            let element = document.createElement("div")
            element.setAttribute("class", ref[o])
            element.textContent = thing[o]+students[i][o]
            document.getElementById("Profile"+i).appendChild(element)
        }
    }

}