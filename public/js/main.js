// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const getDays = _ => {
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    var selected = {}
    days = days.map(day => document.getElementById(day))
    counter = 0
    days.forEach( el => {
      if(el.checked) {
        selected['pos' + counter++] = el.value
      }
    })
    return selected
  };
  
  const Name = document.getElementById( 'className' ).value,
        Code = document.getElementById( 'classCode' ).value,
        StartTime = document.getElementById('startTime').value,
        EndTime = document.getElementById('endTime').value,
        Days = getDays(),
        json =  { Name,
                  Code,
                  StartTime,
                  EndTime,
                  Days },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const responseJSON = await response.json()

  console.log( 'submit - received:', JSON.stringify(responseJSON) )
  if('errors' in responseJSON) { // there has been an error
    // show warning messages
    for (const [key, val] of Object.entries(responseJSON)) {
      const el = document.getElementById(key + 'Warning');
      if(typeof el !== 'undefined' && el !== null) {
        if (val !== true) { // there is an error
          el.innerHTML = val
        } else { // no error
          el.innerHTML = ''
        }
      }
    }
  } else { // remove all warning labels
    const warnings = document.getElementsByClassName('warning')
    for ( element of warnings) {
      element.innerHTML = ''
    }
  }

  getAll()
}

const getAll = async function getAll( ) {
  // event.preventDefault(); // TODO: check if we always need this? not sure what this does

  const response = await fetch( '/getAll', {
    method:'POST'
  })

  const data = await response.json();

  console.log( 'getAll - received:', data )

  displaySchedule(data)

  const classDropdown = document.getElementById("classSelect")
  addClassesTo(classDropdown).then(showClass)
}

const remove = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const body = JSON.stringify( document.getElementById('classSelect').value )

  const response = await fetch( '/remove', {
    method:'POST',
    body
  })

  const text = await response.text()

  if(text === 'success') {
    console.log('sucessfully removed')
  } else {
    console.log('failed to remove')
  }

  getAll()

}

const addClassesTo = async function ( dropdown ) {
  const response = await fetch( '/getAll', {
    method:'POST'
  })

  const data = await response.json()

  console.log('getAll - received: ', data)
  
  dropdown.textContent = '' // clears the dropdown

  selected = false
  for(c of data) {
    let opt = document.createElement('option')
    opt.value = JSON.stringify(c)
    opt.innerHTML = c.Name
    if(!selected) {
      opt.selected = "selected"
      selected = true
    }
    dropdown.appendChild(opt)
  }
}

window.onload = function() {
  document.getElementById("submitAdd").onclick = submit;
  document.getElementById("submitRemove").onclick = remove;
  const classDropdown = document.getElementById("classSelect")
  addClassesTo(classDropdown)
  classDropdown.onclick = showClass
  showClass()

  getAll();
}