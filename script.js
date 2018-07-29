window.onload=function(){
    let todos=[];
    let todo_input=document.getElementById('todo_input');
    let todo_btn=document.getElementById('todo_btn');
    let todox_btn=document.getElementById('todox_btn');
    let todos_btn=document.getElementById('todos_btn');
    let list=document.getElementById('list');
    
    function retrieve()
    {
        if(localStorage.todo){
        todos=JSON.parse(localStorage.todo);
        }
    }

    function save()
    {
        localStorage.todo=JSON.stringify(todos);
    }
    
    function clear()
    {
        while(list.firstChild)
        {
            list.removeChild(list.firstChild);
        }

    }

    function create_element(todo1,i)
    {
       let add_task= document.createElement('li');
       let span_task=document.createElement('span');
       span_task.innerText=todo1.li_value;
       let btn1_task=document.createElement('button');
       let btn2_task=document.createElement('button');
       let btn3_task=document.createElement('button');
       btn1_task.innerText='X';
       btn2_task.innerText='^';
       btn3_task.innerText='v';
       add_task.appendChild(span_task);
       add_task.appendChild(btn1_task);
       add_task.appendChild(btn2_task);
       add_task.appendChild(btn3_task);
       if(todo1.done){span_task.style.textDecoration="line-through"};

       btn1_task.onclick=function(){
           todo1.done=!todo1.done;
           save();
           refresh();
       }

       btn2_task.onclick=function(){
        if(i==0){return}
        todos.splice(i-1,2,todos[i],todos[i-1]);
        save();
        refresh();
    } 

    btn3_task.onclick=function(){
        if(i==todos.length){return}
        todos.splice(i,2,todos[i+1],todos[i]);
        save();
        refresh();
    } 


        return add_task;
    }


    function refresh()
    {
        retrieve();
        clear();
        for(let i=0;i<todos.length;i++)
        {
            list.appendChild(create_element(todos[i],i))
        }
    }
     
    function task(){
        todos.push({
            li_value:todo_input.value,
            done:false
        })
        save();
        refresh();
    }

    todox_btn.onclick=function(){
        todos = todos.filter((t) => !t.done)
        save();
        refresh();
    }

    todos_btn.onclick=function(){
        todos.sort((a,b) => a.done - b.done)
        save();
        refresh();
    }

    todo_btn.onclick = task;
    refresh();


}