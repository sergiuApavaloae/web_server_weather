console.log('Client side javascript')
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
messageOne.textContent=''

fetch('http://puzzle.mead.io/puzzle').then(
    (response)=>{
        response.json().then((data)=>{
            console.log(data)
        })
    }
)

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    const url='http://localhost:3000/weather?address='+location
    fetch(url).then(
    (response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
                console.log(data.error)
            }
            else{
                messageOne.textContent=data.forecast;
            console.log(data)
            }
        })
    }
)
})