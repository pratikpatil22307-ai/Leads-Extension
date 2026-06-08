# Link & Notes Saver Chrome Extension

A lightweight Chrome extension that allows users to save useful URLs, capture the currently active browser tab, and attach personal notes to each saved link. All data is stored locally using the browser's localStorage, ensuring saved entries persist between sessions.

## Features

* Save custom URLs manually
* Save the currently active browser tab with one click
* Attach notes or descriptions to saved links
* Open saved links in a new browser tab
* Persistent storage using localStorage
* Delete all saved entries with a double-click action
* Simple and lightweight user interface

## Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Chrome Extension APIs
* Browser Local Storage

## How It Works

1. Enter a URL in the link input field.
2. Optionally add a note describing the link.
3. Click **Save Input** to store the entry.
4. Click **Save Tab** to save the URL of the currently active browser tab.
5. Saved entries are displayed as clickable links along with their associated notes.
6. All data remains available after refreshing the browser thanks to localStorage.

## Project Structure

```text
project/
│
├── index.html
├── index.css
├── index.js
├── manifest.json
└── README.md
```

## Data Structure

Saved entries are stored as objects inside an array:

```javascript
[
  {
    address: "https://github.com",
    message: "Useful repository"
  },
  {
    address: "https://developer.chrome.com",
    message: "Chrome Extension Documentation"
  }
]
```

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/your-repository-name.git
```

2. Open Chrome and navigate to:

```text
chrome://extensions
```

3. Enable **Developer Mode**.

4. Click **Load unpacked**.

5. Select the project folder.

6. The extension is now ready to use.

## Future Improvements

* Edit existing entries
* Delete individual links
* Search and filter saved links
* Categories and tags
* Export and import saved data
* Cloud synchronization
* Improved UI and responsive design

## Learning Outcomes

This project helped reinforce:

* DOM manipulation
* Event handling
* Arrays and objects in JavaScript
* Local Storage APIs
* Chrome Extension APIs
* Dynamic rendering of data
* State management in vanilla JavaScript

## Author

Pratik Patil

Built as a learning project to explore JavaScript fundamentals and Chrome Extension development.
