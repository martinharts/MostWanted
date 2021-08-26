"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person); 
    break;
    case "family":
    // TODO: get person's family
    displayFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

//Trait

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars).toLowerCase();
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the trait they entered
  return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("What is the person's height?", chars);
  let foundPerson = people.filter(function(person){  
    if(person.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight?", chars);
  let foundPerson = people.filter(function(person){  
    if(person.weight == weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the trait they entered
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", chars);
  let foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the trait they entered
  return foundPerson;
}


function searchByTrait(people){
  let resultTrait = people;
  do{
    let searchTrait = promptFor('What trait would you like to search?\nGender\nWeight\nEye Color\nHeight\nOccupation',chars);
    switch(searchTrait){ 
      case 'gender':
      resultTrait = searchByGender(people);
      displayPeople(resultTrait);
        break;
      case 'weight':
        resultTrait =   searchByWeight(people);
        displayPeople(resultTrait);
        break;
      case 'eye color':
        resultTrait = searchByGender(people);
        displayPeople(resultTrait);
        break;
      case "height":
        resultTrait = searchByHeight(people);
        displayPeople(resultTrait);
        break;  
      case "occupation":
        resultTrait = searchByOccupation(people);
        displayPeople(resultTrait);
        break;
      default:
    }
  }
  while(resultTrait.length > 1);
  return resultTrait
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
//includes 
function displayFamily(person, people){
let personsID = person.id;
let foundPerson = people.filter(function(person){
  if(person.currentSpouse === personsID || person.parents.includes(personsID)){
    return true;
  }
  else{
    return false;
  }
})
displayPeople(foundPerson);
}

function displayDescendants(person, people){
  let personsID = person.id;
  let arrDescendants = [];
  let foundPerson = people.filter(function(person){
    if(person.parents.includes(personsID)){
      return true;
    }
    else{
      return false;
    }
  })

     for(let i = 0; i < foundPerson.length; i++){
      //  arrDescendants.push(foundPerson[i]);
      displayDescendants(foundPerson[i],people)
      //think we need to arrDescentants = foundperson
      
     }
     displayPeople(foundPerson)
}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
