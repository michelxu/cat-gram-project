const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
});
api.defaults.headers.common['X-API-KEY'] = API_KEY;

// Container donde cargaremos las imágenes
const container = document.getElementById('postcard-container');
const container_fav = document.getElementById('container-fav');
const spanError = document.getElementById('error');

let lastImg;
let loadTimes = 0;

//Traer imágenes aleatorias
const fetchRandomCats = async () => {
    try {
        const response = await window.fetch(API_URL_RANDOM);
        if (response.ok) {
            console.log(`Fetch Cats Response: ${response.status}`);
        }
        const data = await response.json();

        // Creamos un bucle for que lee todas las imágenes de la petición
        data.forEach(cat => {
            const postCard = createPostCard(cat.id, cat.url);
            container.appendChild(postCard);
            console.log(cat);
        });

        switchLoadingSpinner(false);
        //Eliminar los div templates
        const post01 = document.getElementById(`post01`);
        const post02 = document.getElementById(`post02`);
        if (post01 && post02) {
            post01.remove();
            post02.remove();
        }
    } catch (error) {
        console.log(error);
        showAlert(error.message, 'danger', 5000);
    }
}


//Crear PostCard template
function createPostCard(img_id, img_url) {
    const imgId = img_id ?? 'noid';
    const imgUrl = img_url ?? 'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg';

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
    postImg.classList.add("post-img");
    
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
    heartIcon.classList.add("bi", "bi-heart");
    
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
    bookmarkBtn.onclick = () => { saveFavoriteCat(imgId); };
    const bookmarkIcon = document.createElement("i");
    bookmarkIcon.id = `ico_book${imgId}`;
    bookmarkIcon.classList.add("bi", "bi-bookmark");
    
    bookmarkBtn.appendChild(bookmarkIcon); //bookmark btn
    
    //----- Username & Title Body -----
    const cardTitleH6Body = document.createElement("h6");
    cardTitleH6Body.textContent = "@thecatpost 🐱";
    cardTitleH6Body.classList.add("card-title", "mb-0", "me-3");
    
    const textDescription = aRandomElement(catDescriptions); 
    const cardTextBody = document.createElement("small");
    cardTextBody.textContent = `${textDescription}`;
    cardTextBody.classList.add("card-text");
    
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


//Guardar PostCard en favoritos
const saveFavoriteCat = async (img_id) => {
    const imgId = img_id;

    //Si se vuelve a hacer clic sobre la última imagen guardada, lanzará error.
    if (imgId === lastImg) {
        showAlert(`Ya has guardado esta imagen en favoritos 😺`, "warning");
        return;
    }
    
    try {
        //API sin axios
        /*
        const response = await fetch(API_URL_FAV, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
            body: JSON.stringify({
                image_id: imgId
            }),
        });

        const data = await response.json();
        */
        //API con axios
        const {data, status} = await api.post('/favourites', {
            image_id: imgId
        });

        console.log(`Img ${imgId} Response: ${status}`);

        if(status !== 200){
            spanError.innerHTML = `Se ha producido un error: ${status} ${data.message}`;
            showAlert(`Error al guardar img: ${status} ${data.message}`, "danger");
        }
        else{
            const btnIcon = document.getElementById(`ico_book${imgId}`);
            if(btnIcon){
                btnIcon.classList = 'bi bi-bookmark-fill';
                const parentElement = btnIcon.parentNode;
                parentElement.classList.add('disabled');
            }

            lastImg = imgId;
            showAlert(`Imagen añadida a favoritos 😺`, "primary");        
        }
    } catch (error) {
        console.log(error);
    }
}


const uploadPhoto = async () => {
    const form = document.getElementById('uploadPhoto');
    const formData = new FormData(form);
    const namePhoto = document.getElementById('namePhoto').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (!file || !namePhoto) {
        showAlert("Fill the form please", "warning");
        return;
    }

    formData.set('name', namePhoto);
    formData.set('file', file, namePhoto);
    console.log(formData.get('file'));

    try {
        // your code here
        const response = await fetch(API_URL_UPLOAD, {
            method: 'POST',
            headers: {
                //'Content-Type': 'multipart/form-data',
                'X-API-KEY' : API_KEY,
            },
            body: formData,
        });

        const data = await response.json();

        if(response.status!== 201){
            showAlert(`Se ha producido un error: ${response.status} ${data.message}`, 'danger');
        } else{
            console.log(`Img subida exitosamente.
            URL: ${data.url}
            ID: ${data.id}`);
            showAlert(`Imagen subida exitosamente 😺`, 'primary');
            saveFavoriteCat(data.id);
            setTimeout(function() {
                location.reload();
              }, 5000); // 5000 milliseconds = 5 seconds
        }
        } catch (error) {
            console.error(error);
            showAlert(`An error occurred. Please try again later. ${error}`, 'danger', 10000);
    }
    
}


//Verifica Form: Completa campos al seleccionar archivo y verifica que sea imagen.
function verifyFormInputs(){
    // Get file input element
    const fileInput = document.getElementById('file');
    // For Img preview
    const previewImg = document.getElementById('preview');
    

    // Add listener for when a file is selected
    fileInput.addEventListener('change', (event) => {
        //File Selected
        const selectedFile = event.target.files[0];
        const nameInput = document.getElementById('namePhoto');

        //File Type
        const file = fileInput.files[0];
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']; // add any other image file types

        //Si un archivo está seleccionado
        if (selectedFile) {
            //Si el archivo es una imagen
            if (allowedTypes.includes(file.type)) {
                nameInput.value = selectedFile.name;

                //Img
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                };
    
                reader.readAsDataURL(file);
            } else {
                event.preventDefault();
                showAlert('Only image files are allowed', 'danger', 5000);
                previewImg.src = 'https://gipromo.com.mx/backend//vistas/img/productos/default/default.jpg';
                nameInput.value = "";
                fileInput.value = '';
                console.log('Invalid file');
            }

        } else {
            previewImg.src = 'https://gipromo.com.mx/backend//vistas/img/productos/default/default.jpg';
            nameInput.value = "";
            fileInput.value = ''; // clear the input value to remove the invalid file
            console.log('No file selected');
        }
    });
}

//Verificar: solo permitir cargar imagenes 3 veces.
function verifyLoadTimes() {
    if (loadTimes < 3) {
        loadTimes++;
        switchLoadingSpinner(true);
        console.log(`Bottom reached ${loadTimes} times: Loading cats!`);
        fetchRandomCats();
    } else{
        switchLoadingSpinner(false);
        editBottomMessage('No more content to show.', 'bi bi-arrow-up-circle');
        console.log(`Max times loaded content reached!`);
    }
}

//Escuchar el btn Submit del Modal, para cerrarlo al Submit.
function listenerModalButton(){
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.addEventListener('click', () => {
    const modal = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
});
}

// Peticiónes iniciales
window.onload = () => {
    scrollToTop();
    listenerModalButton();
    fetchRandomCats();
    verifyFormInputs(); //Form

    //from utils.js to fix the header padding at opening a modal
    //removed because fix desktop but damage mobile -_-
    //headerFixPadding('exampleModal', 'upload-ph');
    //headerFixPadding('infoModal', 'show-myinfo');

    // Set flag to false on page load
    let scrolledManually = false;

    //Event listener scroll bottom
    window.addEventListener('scroll', function() {
        // Check whether the user has manually scrolled the page
        if (!scrolledManually) {
            return;
        }

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight -1) {
            verifyLoadTimes();
        }
    });

    // Set flag to true when the user scrolls the page
    window.addEventListener('scroll', function() {
        scrolledManually = true;
    });
};

