//https://jsonplaceholder.typicode.com/posts?_limit=5&_page=1;
const contPost = document.querySelector(".post-container");
const ld = document.querySelector(".loader");
const input = document.querySelector("#input");


let page = 1;
const request = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
    const obj = await response.json();
    return obj;
}

const insertItem = async () => {
    const data = await request();
    data.map((item) => {
        const div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML=
        `
            <span class="id">${item.id}</span>
            <h2>${item.title}</h2>
            <p>
              ${item.body}
            </p>  
        `
        contPost.appendChild(div)
    })
   
}

const addPost = () => {
    setTimeout(()=>{
        ld.classList.remove("view")
    },500)
    setTimeout(()=>{
        page++;
        insertItem();
    },500)
    

}

const loadPosts= ()=>{
    ld.classList.add("view")
    addPost()
    
}
window.addEventListener("scroll",(e)=>{
    const { scrollHeight,scrollTop,clientHeight} = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight - 10){
        loadPosts();
    }
})

input.addEventListener("input",(e)=>{
    const inputValue = e.target.value.toLowerCase();
    const post = document.querySelectorAll(".post");
    post.forEach((post)=>{
        postTitle = post.querySelector("h2").textContent.toLowerCase();
        postBody = post.querySelector("p").textContent.toLowerCase();

        if(postTitle.includes(inputValue) || postBody.includes(inputValue) ){
            post.style.display = "flex";
            return
        }
        post.style.display = "none";
    })
})
insertItem();
