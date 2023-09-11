function displaySchedule(data) {
    // make the headers
    const daysOfWeek = {
        Su: "Sunday",
        M: "Monday",
        T: "Tuesday",
        W: "Wednesday",
        Th: "Thursday",
        F: "Friday",
        Sa: "Saturday"
    };
      
    const display = document.getElementById('dataView')
    display.textContent = '' // clear the table
      
    // create the weekday headers
    const headers = document.createElement('div')
    headers.className = "grid-row displayRow"
    display.appendChild(headers)
    let col = 1
    Object.keys(daysOfWeek).forEach(key => {
        var headerCell = document.createElement("div");
        headerCell.style.gridColumn = col + ' / ' + (col++ + 1)
        headerCell.innerHTML = daysOfWeek[key]
        headerCell.name = key
        headerCell.className = "displayHeader"
        headers.appendChild(headerCell) 
    });

    // organize by day / time
    const schedule = {
        Su: [],
        M: [],
        T: [],
        W: [],
        Th: [],
        F: [],
        Sa: []
      };
      
      
    // organize the data by time and day
    for(obj of data) {
        Object.values(obj.Days).forEach( day => {

            // compare the times and then organize
            let i = 0
            const start1 = new Date('1970-01-01T' + obj.StartTime + ":00")
            for(obj2 of schedule[day]) {
                const start2 = new Date('1970-01-01T' + obj2.StartTime + ":00")
                if(start1 - start2 < 0) {
                    break;
                }
                i++
            }
            const temp = schedule[day].slice(0, i)
            temp.push(obj)
            for(el of schedule[day].slice(i)) {
                temp.push(el)
            }
            schedule[day] = temp
        });
    }

    let day = 0
    Object.values(schedule).forEach( classes => {
        let row = 1
        let r
        for(c of classes) {
            let cell
            // add a row if needed
            if(display.childElementCount <= row) {
                r = document.createElement('div')
                r.className = "grid-row displayRow"
                display.appendChild(r)
                // add all the cells in the row
                while(r.childElementCount <= day) {
                    cell = document.createElement('div')
                    cell.className = "displayCell"
                    cell.style.gridColumn = day + ' / ' + (day + 1)
                    cell.appendChild(classDisplay(emptyClass))
                    display.childNodes[row].appendChild(cell)
                }
            }
            cell = display.childNodes[row].childNodes[day]
            while(cell.childElementCount > 0) {
                cell.removeChild(cell.childNodes[0])
            }
            cell.appendChild(classDisplay(c))
            display.childNodes[row].appendChild(cell)
            row++
        }
        day++;
    })

    // console.log(schedule)
}

// display a singular class cell
function classDisplay(classObj, showDay=false) {
    const box = document.createElement('div');
    box.className = 'classDisplay'
    
    const add = (tag, inner) => {
        if(inner === "") {
            box.appendChild(document.createElement('br'))
            return box
        }
        const el = document.createElement(tag)
        el.innerHTML = inner
        box.appendChild(el)
    }
    
    add('h2', classObj.Name)
    add('p', classObj.Code)
    add('p', classObj.StartTime + " - " + classObj.EndTime)
    if(showDay) {
        add('p', Object.values(classObj.Days).toString())
    }
    add('p', classObj.Length + ` hour${classObj.Length === 1 ? '' : 's'}`)

    return box
}

const showClass = () => {
    const data = document.getElementById("classSelect").value
    const display = document.getElementById("singleClassDisplay")
    display.innerText = ""
    
    // re-add the legend
    const legend = document.createElement('legend')
    legend.innerHTML = "Class to Remove"
    display.appendChild(legend)

    if(typeof data === "undefined" || data === "") {
        display.appendChild(document.createElement('br'))
        let temp1 = document.createElement('p')
        temp1.innerHTML = 'No Class'
        display.appendChild(temp1) 
        let temp2 = document.createElement('p')
        temp2.innerHTML = 'Selected'
        display.appendChild(temp2) 
        display.appendChild(document.createElement('br')) 
    } else {
        display.appendChild(classDisplay(JSON.parse(data), true))
    }

}

const emptyClass = { 'Name': '', 
    'Code': '',
    'StartTime' : '',
    'EndTime': '',
    'Days': {},
    'Length': '' 
}