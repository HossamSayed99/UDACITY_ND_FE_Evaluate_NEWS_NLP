import {checkURL} from './js/checkURL'
import './styles/style.scss'

// A helper function to handle post function. I have re-used function I have written in the previous track
const postUrl = async ( url = '', data = {})=>{

   const response = await fetch(url, {
   method: 'POST', // *GET, POST, PUT, DELETE, etc.
   credentials: 'same-origin', 
   headers: {
       'Content-Type': 'application/json',
   },
   body: JSON.stringify(data), // body data type must match "Content-Type" header        
 });
   try {
        console.log('Waiting');
        const newData = await response.json();
        console.log('finished');
        return newData;
   }catch(error) {
        console.log("error", error);
   }
}

// Adding the click event listener to the submit button after the window is loaded.
window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit-btn').addEventListener('click', submitForm);
})

// Event handler function that performs the post request, gets back the data and update the UI
function submitForm(e){
    e.preventDefault(); // preventing default functionality of data
    const url = document.getElementById('article-url').value; // getting url typed by user
    if(checkURL(url)){
        console.log('Posting');
        postUrl('http://localhost:8081/data', {url: url}).then( // performng post request
            (data) => { // updating UI
                console.log('back');
                console.log(data);
                    document.getElementById('text').innerHTML = `Text is: ${data.text}`;
                    document.getElementById('agreement').innerHTML = `Agreement state: ${data.agreement}`;
                    document.getElementById('subjectivity').innerHTML = `Subjectivity sate: ${data.subjectivity}`;
                    document.getElementById('confidence').innerHTML = `Degree of confidence: ${data.confidence}`;
                    document.getElementById('irony').innerHTML = `Irony state: ${data.irony}`;
                    document.getElementById('score_tag').innerHTML = `Score Tag: ${data.score_tag}`;
            },
            (err)=>{
                console.log(err);
            }
        )    
    }
    else{ // If url is not valid, show aler and clear form
        alert('please enter a valid url'); 
        document.getElementById('article-url').value = '';
    }
}

export {postUrl, submitForm}