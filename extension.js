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
    localStorage.clear()

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
   myleads.push({
    address: tabs[0].url,
    message: inputEl2.value
   })
  // Save updated array into localStorage
    localStorage.setItem("myleads", JSON.stringify(myleads))
     // Update UI
    renderlead()
  
})
})


// ==============================
// INPUT BUTTON
// ==============================

// Saves user input from textbox
inputbtn.addEventListener("click", function () {

    // Add textbox value into leads array
    myleads.push({
        address: inputEl.value,
        message: inputEl2.value
    })
    // Save updated leads array into localStorage
    localStorage.setItem("myleads", JSON.stringify(myleads))

    // Update webpage UI
    renderlead()

    // Clear textbox after saving
    inputEl.value = ""
    inputEl2.value = ""
})


// ==============================
// RENDER FUNCTION
// ==============================

// Converts array data into HTML
// and displays it on the webpage
function renderlead() {

    // Clear old HTML before rerendering
    ListEl.innerHTML = ""

    // Loop through every lead in the array
    for (let i = 0; i < myleads.length; i++) {

        // Dynamically generate HTML list items
        ListEl.innerHTML += `
        <li>
            <a target='_blank' href='${myleads[i].address}'>
                ${myleads[i].address}
            </a>
            <p>${myleads[i].message}</p>
        </li>
        `
    }       
}