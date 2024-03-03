let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let catagory=document.getElementById('catagory');
let submit=document.getElementById('submit');
let mood='create';
let tmp;

function gettotal(){
    if(price.value!=''){
        let result=(+price.value+ +ads.value+ +taxes.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040'
    }
    else{
        total.innerHTML='';
        total.style.background=rgb(245, 51, 51);
    }
}
let datapro;
if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product);
}
else{
    datapro=[];
}
submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catagory:catagory.value.toLowerCase(),
    }
    if(mood==='create'){
        if(newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }
    }else{
        datapro[tmp]=newpro;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';
    }
    
    localStorage.setItem('product',JSON.stringify(datapro));

    clearData();
    showData();
}


function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.value='';
    count.value='';
    catagory.value='';
}

function showData(){
    let table='';
    for(let i=0;i<datapro.length;i++){
        table+=`
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button onclick="updataData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete=document.getElementById('deleteAll');
    if(datapro.length>0){
        btnDelete.innerHTML=`
            <button onclick="deleteAll()">delete All(${datapro.length})</button>
        `
    }else{
        btnDelete.innerHTML='';
    }
}
showData();

function deleteData(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showData();
}
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}

function updataData(i){
    showData();
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    ads.value=datapro[i].ads;
    taxes.value=datapro[i].taxes;
    discount.value=datapro[i].discount;
    catagory.value=datapro[i].catagory;
    gettotal();
    count.style.display='none';
    submit.innerHTML='updata';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

let searchmood='title';
function getsearchmood(id){
    let search=document.getElementById('search');
    if(id=='searchtitle'){
        searchmood='title';
        search.placeholder='search by title';
    }else{
        searchmood='catagory';
        search.placeholder='search by catagory';
    }
    search.focus();
    search.value='';
    showData();
}

function searchdata(value){
    let table='';
    if(searchmood=='title'){
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
                table+=`
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button onclick="updataData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
        
            }
        }
    }
    else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].catagory.includes(value)){
                table+=`
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].catagory}</td>
            <td><button onclick="updataData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
        
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;

}