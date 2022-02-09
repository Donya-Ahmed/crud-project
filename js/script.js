// variables

let nameInputs = ["userName", "userBalance"]
let tranTypes=["with draw","add Balance"]
let nameInputsBal = ["balType", "addBalance"]


//call elments from html

let formTask = document.querySelector("#formTask");
let tableBy=document.querySelector("#tableBy");
let formEdit = document.querySelector("#formEdit");
let selecttypes = document.querySelector("#sel");
let contSingle=document.querySelector("#contSingle")
let delall=document.querySelector("#delall");






const readData = (storeItem) => {
    let data;
    try {

        data = JSON.parse(localStorage.getItem(storeItem))
        if (!Array.isArray(data)) throw new Error("invalid data")
    }
    catch (e) {
        console.log("bhj")
        data = []

    }
    return data
}

const writeData = (storeItem, storeElement) => {
    localStorage.setItem(storeItem, JSON.stringify(storeElement))

}

const createElmentFun = (ele, parent, text = "", classes = "", attributes = []) => {
    try {
        let elment = document.createElement(ele)
        if (text) { elment.textContent = text }
        if (classes) { elment.classList = classes }
        if (attributes) {
            attributes.forEach(element => {
                elment.setAttribute(element.key, element.value)

            })
        };

        parent.appendChild(elment)
        return elment;
    }
    catch {
        console.log("somthing error")
    }

}

const tdDraw=(parent,text)=>{
    createElmentFun("td",parent, text, null,[])

}
const emptyData=()=>{
   
    let tr=createElmentFun("tr",tableBy,"","alert alert-danger",[])
    let td=createElmentFun("td",tr,"no data yet!","text-center",[{key:"colspan",value:6}])



 
}
const drawUser=(obj,index,users)=>{
   
    let tr=createElmentFun("tr",tableBy,"",null,[])
   
    nameInputs.forEach(ele=>{
        tdDraw(tr,obj[ele]);
    })
    let showBtn=createElmentFun("button",tr,"Show","btn btn-primary mx-2",[])


    let addBtn=createElmentFun("button",tr,"Add Transaction","btn btn-warning mx-2",[])
    
   
    showBtn.addEventListener("click",()=>showSingle(index))
    addBtn.addEventListener("click",()=>addTran(obj,index,users))

     

   
}

const addTran=(obj,index,users)=>{
    writeData("editUser",obj)
    users.splice(index,1)
    writeData("users",users)
    window.location.href="edit.html"
}

const showSingle=(index)=>{
        
        
    let show=readData("users")
    console.log(show)
    let showData=show[index]
    writeData("showData",showData)
    window.location.href="show.html"
   

}

if (formTask) {

    formTask.addEventListener("submit", function (e) {
        e.preventDefault()
        let user = {
            id: Date.now()
        }
        nameInputs.forEach(ele => {
            user[ele] = formTask.elements[ele].value
        })
        user["transaction"] = [];

        console.log(user)
        let users = readData("users")
        users.push(user);
        writeData("users", users)
        formTask.reset()
        window.location.href="index.html"
    })


}
if(tableBy){
    let users = readData("users")
    if(users.length==0){
        emptyData()
    }
    else{
        nameInputs.unshift("id")
        users.forEach((obj,index)=>{
            drawUser(obj,index,users)

        })
         
    delall.addEventListener("click",()=>{
        writeData("users",[])  
        tableBy.textContent="";
         emptyData();
    }) 



    }
    
}

if(formEdit){
    tranTypes.forEach(ele => {
        createElmentFun("option", selecttypes, ele, null, [{ key: "value", value: ele }])
    })

    formEdit.addEventListener("submit", function (e) {
        e.preventDefault()
        let balance = {}
        
        nameInputsBal.forEach(ele => {
            balance[ele] = formEdit.elements[ele].value
        })
        // user["transaction"] = [];
        console.log(balance)
       let obj=JSON.parse(localStorage.getItem("editUser")) 
       console.log(obj)
       obj["transaction"].push(balance)
       console.log(obj)
       let usersN=readData("users")
       console.log(balance)
        usersN.push(obj)
      writeData("users",usersN)
      formEdit.reset()
    window.location.href="index.html"
})


}
if(contSingle){
    let obj=JSON.parse(localStorage.getItem("showData"))
    
    
    contSingle.innerHTML=`<div class="mb-3 p-4">
              <h2>welcome ${obj.userName} ! </h2>

          </div>
        
        <table class="table mt-5 table-striped table-dark">
            <thead>
              <tr>
                <th >#</th>
                <th >ID</th>
                <th >Name</th>
                <th >Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th >1</th>
                <td>${obj.id}</td>
                <td>${obj.userName}</td>
                <td>${obj.userBalance}</td>
              </tr>
             
            </tbody>
          </table>
          `

          let divMain=createElmentFun("div",contSingle,"","alert alert-primary my-5",[])
  

          obj["transaction"].forEach((ele,index)=>{
            let p1=createElmentFun("p",divMain,` -${index} transaction --> type of transaction :${ele["balType"]} ,and the balance: ${ele["addBalance"]}`,"",[])
            // let p2=createElmentFun("p",divMain,`${ele["addBalance"]}`,"",[])


        })
}

