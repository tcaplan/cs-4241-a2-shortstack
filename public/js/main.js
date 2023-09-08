// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )
  
try{
  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })
  const text = await response.json()

  console.log( 'text:', text )
  const list= document.createElement('ul')
  text.array.forEach(d => {
    const item = document.createElement('li')
    item.innerHTML=` <b>model</b> : ${d.model}, <b>mpg</b>: ${d.mpg}, <b>year</b>: ${d.year}`
    list.appendChild(item)
  })

 // list.innerHTML=data
  //map is going to return a new array which we are going through using .foreach 
  // which will return the same array with some modifications to it. 
  /*.map(d=>d.model)
  .map(d=> d[0].toUpperCase(0) + d.slice(1))
  .foreach(d=> {
    const li= document.createElement('li')
    list.appendChild(li)
  })
*/
  document.body.appendChild(list)
}
catch(err){
  console.log(err.message);
  document.getElementsByClassName("body").innerHTML= '<p> Request Failed </p>';
}}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}