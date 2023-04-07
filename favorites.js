// Container donde cargaremos las imágenes
const container = document.getElementById('postcard-container');
let npage = 0;
let maxContent = false;

//Traer imágenes favoritas
const loadFavoriteContent = async (npage) =>{
    const num_page = npage ?? 0;
    console.log(`page: ${num_page}`);
    const API_FAV_WITH_N_PAGE = `https://api.thecatapi.com/v1/favourites?limit=5&order=DESC&page=${num_page}`;

    try {
        const res = await fetch(API_FAV_WITH_N_PAGE,{
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY,
            },
        });
        const data = await res.json();
        console.log("Favoritos:", data);

        if (Object.keys(data).length === 0) {
            console.log("Data is empty!");
            switchLoadingSpinner(false);
            maxContent = true;
            editBottomMessage('All favorites loaded.', 'bi bi-arrow-up-circle');
            console.log(`Max times loaded content reached!`);
        }

        //Crear un postcard por cada imagen de gato
        data.forEach(cat => {
            const postCard = createPostCardFav(cat.id, cat.image.url, cat.created_at);
            container.appendChild(postCard);
        });


        //Eliminar los div templates
        const post01 = document.getElementById(`post01`);
        const post02 = document.getElementById(`post02`);
        if (post01 && post02) {
            post01.remove();
            post02.remove();
        }        
        //Modal img
        showImageInModal();

    } catch (error) {
        console.log(`Se produjo un error: ${error}`);
    }
}

const deleteFavoriteCat = async (id) => {
    const img_id = id;

    try {
        const response = await fetch(API_URL_DELETE(img_id), {
            method: 'DELETE',
            headers: {
                'X-API-KEY': API_KEY,
            },
        });
    
        const data = await response.json();
        console.log(`Delete: ${img_id} ${data}`);
        console.log(`Response: ${response.status}`);

        if(response.status !== 200){
            spanError.innerHTML = `Se ha producido un error: ${response.status} DATA MSG: ${data.message}`;
        }
        else{
            showAlert(`Imagen eliminada de favoritos 🐱`, "danger");
            //Eliminar elemento html
            document.getElementById(`post${img_id}`).remove();
    
            console.log(`Img eliminada: ${img_id}`);
        }

    } catch (error) {
        console.log(`Se produjo un error: ${error}`);
    }
}

//Crear PostCard template
function createPostCardFav(img_id, img_url, saved_date) {
    const imgId = img_id ?? 'noid';
    const imgUrl = img_url ?? 'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg';
    //fecha de guardado
    const dateStr = saved_date;
    const date = new Date(dateStr);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // create elements
    const postCardDiv = document.createElement("div");
    postCardDiv.classList.add("post-card");
    postCardDiv.id = `post${imgId}`;

    //container.appendChild(postCardDiv);
    
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "m-3", "rounded-3");
    
    //----- Card Post Header -----
    const cardHeaderDiv = document.createElement("div");
    cardHeaderDiv.classList.add("card-header");
    
    const dFlexHeaderDiv = document.createElement("div");
    dFlexHeaderDiv.classList.add("d-flex", "align-items-center");
    
    const profilePicImg = document.createElement("img");
    profilePicImg.src = "https://cdn2.thecatapi.com/images/b-hCwC0kn.jpg";
    profilePicImg.alt = "Profile picture";
    profilePicImg.classList.add("profile-pic", "me-3");
    
    const cardTitleH6 = document.createElement("h6");
    cardTitleH6.textContent = "@thecatpost";
    cardTitleH6.classList.add("card-title", "mb-0");
    
    //----- Card Post Image -----
    const postImg = document.createElement("img");
    postImg.src = imgUrl;
    postImg.id = imgId;
    postImg.alt = "Post image";
    postImg.classList.add("post-img", "my-image");
    
    //----- Card Post Body -----
    const cardBodyDiv = document.createElement("div"); //parent div
    cardBodyDiv.classList.add("card-body");
    
    const dFlexButtonsDiv = document.createElement("div"); // div buttons
    dFlexButtonsDiv.classList.add("d-flex", "align-items-center", "mb-3");

    const dFlexTitleBodyDiv = document.createElement('div'); // div text
    dFlexTitleBodyDiv.classList.add('d-flex', 'align-items-center', 'mb-2');
    
    //----- Buttons -----
    const heartBtn = document.createElement("button");
    heartBtn.type = "button";
    heartBtn.classList.add("btn", "btn-light", "me-2", "rounded-circle");
    heartBtn.onclick = () => { likePressed(imgId); };
    const heartIcon = document.createElement("i");
    heartIcon.id = `ico_heart${imgId}`;
    heartIcon.classList.add("bi", "bi-heart-fill");
    
    heartBtn.appendChild(heartIcon); //heart btn
    
    const chatBtn = document.createElement("button");
    chatBtn.type = "button";
    chatBtn.classList.add("btn", "btn-light", "me-2", "rounded-circle"); 
    const chatIcon = document.createElement("i");
    chatIcon.classList.add("bi", "bi-chat");
    
    chatBtn.appendChild(chatIcon); //chat btn
    
    const plusBtn = document.createElement("button");
    plusBtn.type = "button";
    plusBtn.classList.add("btn", "btn-light", "me-2", "rounded-circle");
    const plusIcon = document.createElement("i");
    plusIcon.classList.add("bi", "bi-plus-square");
    
    plusBtn.appendChild(plusIcon); //plus btn
    
    const bookmarkBtn = document.createElement("button");
    bookmarkBtn.type = "button";
    bookmarkBtn.classList.add("btn", "btn-light", "ms-auto", "rounded-circle");
    bookmarkBtn.onclick = () => { deleteFavoriteCat(imgId); };
    const bookmarkIcon = document.createElement("i");
    bookmarkIcon.id = `ico_book${imgId}`;
    bookmarkIcon.classList.add("bi", "bi-bookmark-fill");
    
    bookmarkBtn.appendChild(bookmarkIcon); //bookmark btn
    
    //----- Username & Title Body -----
    const cardTitleH6Body = document.createElement("h6");
    cardTitleH6Body.textContent = "@thecatpost 🐱";
    cardTitleH6Body.classList.add("card-title", "mb-0", "me-2");
    
    const textDescription = aRandomElement(catDescriptions); 
    const cardTextBody = document.createElement("small");
    cardTextBody.textContent = `${textDescription}`;
    cardTextBody.classList.add("card-text", "mb-0");
    
    // append elements
    postCardDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardHeaderDiv);
    cardHeaderDiv.appendChild(dFlexHeaderDiv);
    dFlexHeaderDiv.appendChild(profilePicImg);
    dFlexHeaderDiv.appendChild(cardTitleH6);
    cardDiv.appendChild(postImg);
    cardDiv.appendChild(cardBodyDiv); //post body (buttons & text area)
    cardBodyDiv.appendChild(dFlexButtonsDiv);
    dFlexButtonsDiv.appendChild(heartBtn);
    dFlexButtonsDiv.appendChild(chatBtn);
    dFlexButtonsDiv.appendChild(plusBtn);
    dFlexButtonsDiv.appendChild(bookmarkBtn);
    cardBodyDiv.appendChild(dFlexTitleBodyDiv); // title
    dFlexTitleBodyDiv.appendChild(cardTitleH6Body);
    dFlexTitleBodyDiv.appendChild(cardTextBody);

    return postCardDiv;
}

function showImageInModal() {
    const images = document.querySelectorAll('.my-image');

    images.forEach(image => {
        image.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            const modalImg = document.querySelector('#imageModal img');
            modalImg.src = image.src;
            modal.show();
        });
    });
}



// Peticiónes iniciales
window.onload = () => {
    scrollToTop();
    switchLoadingSpinner(true);
    loadFavoriteContent(npage++);

    // Set flag to false on page load
    let scrolledManually = false;

    //Event listener scroll bottom
    window.addEventListener('scroll', function() {
        // Check whether the user has manually scrolled the page
        if (!scrolledManually) {
            return;
        }

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight -1) {
            if(!maxContent) loadFavoriteContent(npage++);
        }
    });

    // Set flag to true when the user scrolls the page
    window.addEventListener('scroll', function() {
        scrolledManually = true;
    });
};
