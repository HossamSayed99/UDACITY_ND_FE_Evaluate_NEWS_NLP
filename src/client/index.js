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
    if(checkURL(url)){
        console.log('Posting');
        postUrl('http://localhost:8081/data', {url: url}).then(
            (data) => {
                console.log('back');
                console.log(data);
                    document.getElementById('text').innerHTML = `Text is: ${data.text}`;
                    document.getElementById('agreement').innerHTML = `Agreement state: ${data.agreement}`;
                    document.getElementById('subjectivity').innerHTML = `Subjectivity sate: ${data.subjectivity}`;
                    document.getElementById('confidence').innerHTML = `Degree of confidence: ${data.confidence}`;
                    document.getElementById('irony').innerHTML = `Irony state: ${data.irony}`;
                    document.getElementById('score_tag').innerHTML = `Score Tage: ${data.score_tag}`;
            },
            (e)=>{
                console.log(e);
            }
        )    
    }
    else{
        alert('please enter a valid url');
    }
}