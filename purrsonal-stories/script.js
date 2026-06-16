let posts = JSON.parse(localStorage.getItem("posts")) || [];

let selectedPost = null;
let selectedCat = "flower-cat.jpeg";

const spots = [

    // Blue bed
    {x:80, y:760},
    {x:180, y:790},
    {x:250, y:730},

    // Couch left
    {x:450, y:560},
    {x:550, y:500},
    {x:650, y:450},

    // Couch middle
    {x:700, y:550},
    {x:800, y:500},
    {x:900, y:550},

    // Couch right
    {x:1000, y:600},
    {x:1080, y:560},

    // Rug
    {x:500, y:850},
    {x:650, y:820},
    {x:800, y:850},
    {x:950, y:820},

    // Plant area
    {x:150, y:650},

    // Lamp area
    {x:350, y:650},

    // Ladder
    {x:1180, y:650},

    // Cat tower bottom
    {x:1350, y:700},

    // Cat tower shelves
    {x:1250, y:500},
    {x:1320, y:380},
    {x:1260, y:250},

    // cat tower
    {x:1180, y:680},
    {x:1280, y:600},

    // window
    {x:1180, y:260},

    // fireplace
    {x:1320, y:820},

    // rug extra
    {x:550, y:760},
    {x:760, y:760},
    {x:900, y:760}
];
document.querySelectorAll(".catChoice").forEach(button => {

    button.onclick = function(){

        selectedCat = this.dataset.img;

        document.querySelectorAll(".catChoice")
        .forEach(btn => btn.style.border = "none");

        this.style.border = "3px solid #d9b99b";

    };

});

function savePosts(){

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

}

function renderPosts(){

    const area = document.getElementById("catArea");

    area.innerHTML = "";

    const shuffledSpots =
    [...spots].sort(() => Math.random() - 0.5);

    posts.forEach((post,index)=>{

        const cat = document.createElement("div");

        cat.className = "catResident";

        const position =
        shuffledSpots[index % shuffledSpots.length];

        cat.style.left = position.x + "px";
        cat.style.top = position.y + "px";

        cat.innerHTML = `
            <img src="images/${post.catImage}">
            <div class="nameTag">
                ${post.catName}
            </div>
        `;

        cat.onclick = ()=>showStory(index);

        area.appendChild(cat);

    });

}

function filterPosts(category){

    const cats = document.querySelectorAll(".catResident");

    cats.forEach((cat,index)=>{

        if(posts[index].category === category){
            cat.style.display = "block";
        }else{
            cat.style.display = "none";
        }

    });

}

function addPost(){

const catName = document.getElementById("catName").value;
const category = document.getElementById("category").value;
const story = document.getElementById("story").value;
const email = document.getElementById("email").value;

posts.push({
    catName,
    category,
    story,
    email,
    catImage: selectedCat
});

savePosts();
renderPosts();

document.getElementById(
    "postModal"
).style.display = "none";

}

function showAllCats(){

    document
    .querySelectorAll(".catResident")
    .forEach(cat => {

        cat.style.display = "block";

    });

}

function showStory(index){

    selectedPost = index;

    const post = posts[index];

    document.getElementById(
        "storyCatName"
    ).innerText = post.catName;

    document.getElementById(
        "storyText"
    ).innerText = post.story;

    document.getElementById(
        "storyCategory"
    ).innerText = post.category;

    document.getElementById(
        "storyEmail"
    ).href = "mailto:" + post.email;

    document.getElementById(
        "storyModal"
    ).style.display = "block";

}

document.getElementById(
    "deleteBtn"
).onclick = function(){

    if(selectedPost !== null){

        posts.splice(selectedPost,1);

        savePosts();

        renderPosts();

        document.getElementById(
            "storyModal"
        ).style.display = "none";

    }

};

document.getElementById(
    "newPostBtn"
).onclick = function(){

    document.getElementById(
        "postModal"
    ).style.display = "block";

};

document.querySelector(
    ".close"
).onclick = function(){

    document.getElementById(
        "postModal"
    ).style.display = "none";

};

document.querySelector(
    ".closeStory"
).onclick = function(){

    document.getElementById(
        "storyModal"
    ).style.display = "none";

};

renderPosts();