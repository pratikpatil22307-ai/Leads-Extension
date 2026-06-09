// ==============================
// APPLICATION STATE (WORKING MEMORY)
// ==============================

// This array stores all leads currently being used by the app.
// It is temporary runtime memory.
let myleads = []

// This is an array containing objects.
// Each object has a url property.
//this was for testing save button noe i am commenting this block
//const tabs = [
 //   {
 //       url: "https://www.youtube.com/watch?v=LzMnsfqjzkA&t=43738s"
 ////   }
// ]


// ==============================
// DOM ELEMENT REFERENCES
// ==============================

const inputbtn = document.getElementById("input-btn")
const ListEl = document.getElementById("list")
const inputEl = document.getElementById("input-el")
const deletebtn = document.getElementById("delete-btn")
const tabbtn = document.getElementById("tab-btn")
const inputEl2 = document.getElementById("input-el2")

// ==============================
// LOCAL STORAGE
// ==============================



// Load saved leads from localStorage
const leadsFromLocalStorage = localStorage.getItem("myleads")


// ==============================
// RESTORE SAVED DATA AFTER REFRESH
// ==============================

// If localStorage contains saved leads,
// convert the stored string back into an array
// and restore it into working memory.
if (leadsFromLocalStorage) {

    myleads = JSON.parse(leadsFromLocalStorage)

    // Render restored leads onto the webpage
    renderlead()
}


// ==============================
// DELETE BUTTON
// ==============================

// Double click deletes all saved leads
deletebtn.addEventListener("dblclick", function () {

    // Clear browser storage
    localStorage.removeItem("myleads")

    // Clear working memory array
    myleads = []

    // Rerender empty UI
    renderlead()
})


// ==============================
// SAVE TAB BUTTON
// ==============================

// Saves the url from the tabs array
tabbtn.addEventListener("click", function () {
  
  
   //grab the url of current tab
// Source - https://stackoverflow.com/a/17826527
// Posted by Jonathan Dumaine, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-25, License - CC BY-SA 4.0

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // since only one tab should be active and in the current window at once
  // the return variable should only have one entry
  // Push tab url into leads array
const exists = myleads.some(function (lead) {

    return lead.address === tabs[0].url;
})
if(!exists){
   myleads.push({
    address: tabs[0].url,
    message: inputEl2.value || "saved from current tab"
   })

    // Save updated array into localStorage
    localStorage.setItem("myleads", JSON.stringify(myleads))
     // Update UI
    renderlead()
  
}else{
    alert("This URL is already saved.")
}
 
})
})


// ==============================
// INPUT BUTTON
// ==============================

// Saves user input from textbox
inputbtn.addEventListener("click", function () {

    const exists=myleads.some(function(lead){
        return lead.address === inputEl.value;
    })
    if(!exists){
        // Add textbox value into leads array
        myleads.push({
            address: inputEl.value,
            message: inputEl2.value
        })
         // Save updated leads array into localStorage
    localStorage.setItem("myleads", JSON.stringify(myleads))

    // Update webpage UI
    renderlead()
    }else{
        alert("This URL is already saved.")
    }
   

    // Clear textbox after saving
    inputEl.value = ""
    inputEl2.value = ""
})
// ============================== // EDIT MESSAGE // ==============================
function editlead(index){
    const newmessage=prompt("Edit Message: ",myleads[index].message)
    if(newmessage!==null){
        myleads[index].message=newmessage
        localStorage.setItem("myleads",JSON.stringify(myleads))
        renderlead()
    }

}


// ==============================
// RENDER FUNCTION
// ==============================

// Converts array data into HTML
// and displays it on the webpage
function deleteLead(index) {

    // Remove the lead at the specified index from the array
    myleads.splice(index, 1)
    // Save the updated array to localStorage
    localStorage.setItem("myleads", JSON.stringify(myleads))
    // Update the UI
    renderlead()
}

function renderlead() {

    // Clear old HTML before rerendering
    ListEl.innerHTML = ""

    // Loop through every lead in the array
    for (let i = 0; i < myleads.length; i++) {

        // Dynamically generate HTML list items
        ListEl.innerHTML += `
        <li><div class="outer-container">
        <div class="lead-header">
            <a target='_blank' href='${myleads[i].address}'>
                ${myleads[i].address}
            </a>
            <button class="delete-btn" data-index="${i}">X</button>
            </div>
            <div class="lead-message">
            <p>${myleads[i].message}</p>
           <button class="edit-btn" data-index="${i}">edit</button>
            </div>
            </div>
        </li>
        `
    }       
    // After rendering, the delete and edit buttons are now part of the DOM.
    // Add event listeners to delete buttons
    //you couldnt do onclick becouse chrome doesnt allow inline event handlers in extensions for security reasons. So we have to add event listeners after the elements are rendered.
   const deletebutton=document.querySelectorAll(".delete-btn")
    deletebutton.forEach(function(button){
        button.addEventListener("click",function(){
            deleteLead(Number(button.dataset.index))
        })
    })

    // Add event listeners to edit buttons
    const editbutton=document.querySelectorAll(".edit-btn")
    editbutton.forEach(function(button){
        button.addEventListener("click",function(){
            editlead(Number(button.dataset.index))
        })
    })
   }
   





