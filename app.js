// Listen for form submit
const myForm=document.getElementById('myForm');
myForm.addEventListener('submit',saveBookmark);

// Save Bookmark
function saveBookmark(e) {

    // Get form values
    let siteName=document.getElementById('siteName').value;
    let siteUrl=document.getElementById('siteUrl').value;
    // console.log(siteName,siteUrl)

    if(!validateForm(siteName, siteUrl)){
        return false;
      }

    const bookmark={
        name:siteName,
        url:siteUrl,
    }
// Test if bookmarks is null
    if (localStorage.getItem("bookmarks")===null) {
        // Init array
        let bookmarks=[];
        // Add to array
        bookmarks.push(bookmark)
        // Set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))

        
    }
    else{
        // Get bookmarks from localStorage
        let bookmarks=JSON.parse(localStorage.getItem('bookmarks'))
        // Add bookmark to array
        bookmarks.push(bookmark)
        // Re-set back to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    
    }
     
    // Clear form
    const myForm=document.getElementById('myForm');

    myForm.reset();


    // Re-fetch bookmarks
      fetchBookmarks();    
            
    e.preventDefault()
    
}


//Delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(let i=0;i<bookmarks.length;i++){
        if (bookmarks[i].url===url) {
            //Remove from array
            bookmarks.splice(i,1);
            
        }
    }
     // Re-set back to localStorage
         localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

     // Re-fetch bookmarks
        fetchBookmarks();
    
}


// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // console.log(bookmarks)
    // Get output id
    let bookmarksResults = document.getElementById('bookmarksResults');
  
    // // Build output
    bookmarksResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++){
      let name = bookmarks[i].name;
      let url = bookmarks[i].url;
  
      bookmarksResults.innerHTML += `<div class="well">
                                    <h3>${name}
                                     <a class="btn btn-default" target="_blank" href="${url}">Visit</a>  
                                     <a onclick="deleteBookmark(\'${url}\')" class="btn btn-danger" href="#">Delete</a>  
                                    </h3>
                                    </div>`;
    }
   
}
// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  

    
