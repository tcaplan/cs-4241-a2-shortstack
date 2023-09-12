const submit = async function (event) {
  event.preventDefault();

  let input = document.querySelectorAll("#Email,#Name,#Birth"),
    json = {
      Email: input[0].value,
      Name: input[1].value,
      Birth: input[2].value,
    };
  
  let response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(json),
  });
  const text = await response.json();
  document.querySelector("#fade").style.display = "block";
  setTimeout(function () {
    document.querySelector("#fade").style.display = "none";
  }, 1500);
};

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
    const year = age(d.Birth);
    const item = document.createElement("tr");
    item.innerHTML = `
    <td>${d.Email}</td> 
    <td>${d.Name}</td>
    <td>${d.Birth}</td>
    <td>${year} years old</td>
    <td>row:${i} <input type="checkbox" class="checkOnce" id="C${i}" 
    onclick="checkedOnClick(this)"/></td>
    `;
    i++;
    list.appendChild(item);
  });
 
  document.body.appendChild(list);
 
 
  document.querySelector("#clear").addEventListener("click", function () {
    document.body.removeChild(list);
   //document.body.removeChild(ut);
  });
 
 /*const ut = document.createElement("button");
 ut.setAttribute("id", "delete");
 ut.innerHTML = `Delete`;
 document.body.appendChild(ut);

 document.querySlector("#delete").onclick(del(event));*/
   
};
async function deleterec(event) {
  event.preventDefault();

  let data;
  
  const dis = document.querySelectorAll(".checkOnce");
  
  for (let j = 0; j < dis.length; j++) {
    if (dis[j].checked === true) {
      data = j;
    }
  }
    let json = {
      number: data,
    };
    let response = await fetch("/delete", {
      method:'POST',
      body: JSON.stringify(json)
    });
  
    const text = await response.json();
   // console.log(text)
    document.querySelector("#dell").style.display = "block";
  setTimeout(function () {
    document.querySelector("#dell").style.display = "none";
  }, 1500);
  
};


function age(birth) {
  let date = new Date(birth);
  let diff = Date.now() - date.getTime();
  let date1 = new Date(diff);
  let age = Math.abs(date1.getUTCFullYear() - 1970);
  return age;
}

window.onload = function () {
  const button1 = document.querySelector("#submit");
  const button2 = document.querySelector("#display");
 const button3 = document.querySelector("#delete");
  button1.onclick = submit;
  button2.onclick = display;
  button3.onclick = deleterec;
 
};
