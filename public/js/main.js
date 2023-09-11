// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  let input = document.querySelectorAll("#Email,#Name,#Birth"),
    json = {
      Email: input[0].value,
      Name: input[1].value,
      Birth: input[2].value,
    };
  //this sends a request to the server
  let response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(json),
  });
  const text = await response.json();
  document.querySelector("#fade").style.display = "block";
  setTimeout(function () {
    document.querySelector("#fade").style.display = "none";
  }, 2000);
};

function age(birth) {
  let date = new Date(birth);
  let diff = Date.now() - date.getTime();
  let date1 = new Date(diff);
  let age = Math.abs(date1.getUTCFullYear() - 1970);
  return age;
}

const display = async function (event) {
  event.preventDefault();

  let response = await fetch("/display", {
    method: "Get",
  });
  const text = await response.json();

  const list = document.createElement("table");
  const header = document.createElement("tr");
  header.innerHTML = `<th>Email</th> <th>Name</th> <th>Birth</th> <th>Age</th> <th>Delete</th>`;
  list.appendChild(header);
  let i = 0;
  text.forEach((d) => {
    i++;
    const year = age(d.Birth);
    const item = document.createElement("tr");
    item.innerHTML = `
    <td>${d.Email}</td> 
    <td>${d.Name}</td>
    <td>${d.Birth}</td>
    <td>${year} years old</td>
    <td>row:${i} <input type="checkbox" name=${i}/></td>
    `;
    list.appendChild(item);
  });

  document.body.appendChild(list);
  /*  const ut=document.createElement("div");
  ut.setAttribute("id","delbtn");
  ut.innerHTML=`<button>Delete</button>`;*/

  document.querySelector("#clear").addEventListener("click", function () {
    document.body.removeChild(list);
    // document.body.remove(ut);
  });
};


window.onload = function () {
  const button1 = document.querySelector("#submit");
  const button2 = document.querySelector("#display");
  button1.onclick = submit;
  button2.onclick = display;
};
