//Cat generic descriptions
const catDescriptions = [
    'Purrfectly adorable',
    'Feline fabulousness',
    'Cattitude is everything',
    'Clawsome kitty',
    'Furry friend forever',
    'Kitten cuteness overload',
    'Pawsitively charming',
    'Cats rule everything around me',
    'Cuddle time with my fur baby',
    'Feline like a boss',
    'Kitty kisses and cuddles',
    'Whiskerlicious cutie',
    'Purrsonality plus',
    'Catitude in full effect',
    'Cats are my happy place',
    'Purrfectly content',
    'Pawsome snuggles',
    'Feline like royalty',
    'Kitty cuddles all day',
    'Whisker kisses and nose boops',
    'Purrfectly photogenic',
    'Cats make everything better',
    'Purrfect companionship',
    'Cats just get me',
    'Kitten kisses and purrs',
    'Feline love and affection',
    'Purrfectly relaxed and happy',
    'Cats are my therapy',
    'Pawsitively amazing',
    "Pawsitively purrfect",
    "Catitude overload",
    "Feline fine",
    "Meowgical moments",
    "Whisker kisses",
    "Clawsome company",
    "Purrfect companions",
    "Cat-ivating moments",
    "Furry friends forever",
    "Purrfectly content",
    "Paw-some cuddles",
    "Feline fabulous",
    "Pawsome adventures",
    "Kitten around",
    "Feline groovy",
    "Furry and fabulous",
    "Cat-titude for days",
    "Whiskerlicious",
    "Purrrfectly happy",
    "Kitty cat cuteness",
    "Feline fantastic",
    "Pawsome posse",
    "Purrfectly cozy",
    "Furry fun times",
    "Cat-chy moments",
    "Purrfectly playful",
    "Kitten kisses",
    "Pawsitively adorable",
    "Feline frenzy",
    "Cat-ch me if you can"    
];
//Random number generator
function aRandomNumber(num){
    return Math.floor(Math.random() * num);
}
//Random element from array
function aRandomElement(array){
    return array[Math.floor(Math.random() * array.length)];
}

//Mostrar alerta, cualquier mensaje
function showAlert(msg, type, timeElapsed){
    let isClicked = false;
    const time = timeElapsed ?? 3000;
    const alert = document.getElementById('alert_msg');
    alert.classList = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = msg;
    
    // Create the close button element
    const button = document.createElement("button");
    button.classList = "btn-close";
    button.setAttribute("type", "button");
    button.onclick = () => {
        isClicked = true;
        alert.classList =`alert alert-${type} alert-dismissible fade hide`;
    }

    // Add the button to the alert element
    alert.appendChild(button);

    if (!isClicked){
        // Remove the alert element after 3 seconds if the X is not pressed before
        setTimeout(function() {
            alert.classList =`alert alert-${type} alert-dismissible fade hide`;
        }, time);
    }  
}


//Ir al inicio de la página, hacía arriba
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


//Editar y Mostrar/Ocultar cuadro de texto al final de la página
function editBottomMessage(textMsg, iconMsg) {
    const message = textMsg;
    const icon = iconMsg;

    const bottomMessage = document.getElementById('bottomMsgText');
    const bottomIcon = document.getElementById('bottomMsgIcon');
    
    bottomMessage.innerHTML = message;
    bottomMessage.onclick = 'javascript.void(0)';
    bottomIcon.classList = icon;
}


//Editar botón de like (poner/quitar like)
function likePressed(icoId){
    const id = icoId;
    const btnIcon = document.getElementById(`ico_heart${id}`);
    if (btnIcon.classList == 'bi bi-heart') {
        btnIcon.classList = 'bi bi-heart-fill';
    } else{
        btnIcon.classList = 'bi bi-heart';
    }
    
}


//Mostrar/ocultar Loading Spinner
function switchLoadingSpinner(switchTo){
    const value = switchTo;
    const loadingSpinner = document.getElementById('loadingSpinner');
    switch (value) {
        case true:
            loadingSpinner.classList.remove('invisible');
            break;
        case false:
            loadingSpinner.classList.add('invisible');
            break;
    }
}

