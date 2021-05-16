import {checkURL} from './js/checkURL'
import './styles/style.scss'


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


window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit-btn').addEventListener('click', submitForm);
})

function submitForm(e){
    e.preventDefault();
    const url = document.getElementById('article-url').value;
    alert('submitted: ' + url);
    if(checkURL(url)){
        console.log('Posting');
        try {
            postUrl('http://localhost:8081/data', {url: url}).then(
                (data) => {
                    console.log('back');
                    document.getElementById('text').innerHTML = data.sentence_list[0].text;
                    document.getElementById('agreement').innerHTML = data.agreement;
                    document.getElementById('subjectivity').innerHTML = data.subjectivity;
                    document.getElementById('confidence').innerHTML = data.confidence;
                    document.getElementById('irony').innerHTML = data.irony;
                    document.getElementById('score_tag').innerHTML = data.score_tag;
                },
                ()=>{
                    console.log('failed');
                }
            )    
        } catch (error) {
            console.log(error)
        }
    }
    else{
        alert('please enter a valid url');
    }
}