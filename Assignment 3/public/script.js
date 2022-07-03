var mydata = ["hey there ","more stufff", "even more","..."]; 


fetch('/info').then(response=>response.json()).then(x=>{
	    console.log(x);
 	    mydata = x.data;
        var newList = document.createElement("ul");
        var newUL = document.getElementById("nav").appendChild(newList);
        
        for(var i = 0; i < mydata.length; i++){
        var newListItem = document.createElement("li");
        newListItem.id = "li"+i;
        newUL.appendChild(newListItem);

        var newButton = document.createElement("button");
        newButton.type = "button";
        newButton.id = "button"+i;
        newButton.innerHTML = mydata[i].name;
        newListItem.appendChild(newButton);

        var newSpan = document.createElement("span");
        newSpan.id = "span"+i;
        newSpan.innerText = mydata[i].description;
        newSpan.setAttribute('contenteditable', true);
        newListItem.appendChild(newSpan);

        var a = document.createElement('a');
        a.innerText = "  This is a link！";
        a.href = mydata[i].url;
        newListItem.appendChild(a);

        var newmeter = document.createElement("METER");
        newmeter.id = "meter"+i;
        newmeter.max = mydata[i].importance;
        newmeter.value = 0;
        newListItem.appendChild(newmeter);
     };

     var count=[...new Array(mydata.length).keys()];
     console.log(newButton.innerHTML);

        for(let temp in count){
        document.getElementById("span"+temp).addEventListener ('focusout', ()=>{
            fetch('/mod', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: temp,
                datadescription: document.getElementById("span"+temp).innerText,
                dataimportance:document.getElementById("meter"+temp).value
            })
        }).then(response=>response.json())
       })};

            for(let i in count){
            document.getElementById("button"+i).addEventListener('click', ()=> {
            var meterele=document.getElementById("meter"+i);
            if (meterele.value<meterele.max){
            meterele.value = meterele.value+1;}
            else meterele.value = 0;
          });
        };

        document.getElementById("incase").addEventListener('click',()=>{
                fetch('/info').then(response=>response.json()).then(x2=>{
                freshdata = x2.data;
                for(var i =0;i<freshdata.length;i++){
                        console.log(freshdata[i].description);
                        console.log(freshdata[i].importance);
                        document.getElementById("span"+i).innerHTML= freshdata[i].description;
                        document.getElementById("meter"+i).value= freshdata[i].importance;
                }        
                });
        });
})


