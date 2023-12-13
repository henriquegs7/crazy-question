const $ = document;
const changeQuestion = $.getElementById('change-question');
const containerQuestion = $.getElementById('container-question');

const buttonNO = $.getElementById('no');
const buttonYES = $.getElementById('yes');
const imagem = $.getElementById('image-show');
const height = window.innerHeight - 50;
const width = window.innerWidth - 50;

const form = $.querySelector('form');
const titleInput = $.getElementById('title');
const questionInput = $.getElementById('question');
const imageInput = $.getElementById('image');

const newQuestion = $.getElementById('question-show');
const newImage = $.getElementById('image-show');

function loadDados() {
    const params = new URLSearchParams(location.search);
    let isConfeteYes = $.getElementById("checkbox-yes");

    if (location.pathname === "/") {
        containerQuestion.style.animation = "containerInON 2s both";
    } else {
        containerQuestion.style.animation = "containerInOFF 0s both";
    }

    newQuestion.innerHTML = params.get("question") ? params.get("question") : "¿Será q consigo?";
    // isConfeteYes.checked = params.get("isConfete") === "true" ? true : false;
    newImage.src = params.get("image") ? URL.createObjectURL(params.get("image")) : "./image/meme.jpg";
}

loadDados();
// TODO
// rever function pois a ideia é enviar uma pergunta personalizada usando apenas o link
// mas nao tem como enviar imagem por url, pq estoura o limite de caracter da url
function sendDados(question, image = "./image/meme.jpg") {
    const isConfete = $.getElementById("checkbox-yes").checked;

    location.href = `${location.origin + location.pathname}?question=${question}&isConfete=${isConfete}&image=${image}`;
}

changeQuestion.addEventListener("click", () => {
    if (containerQuestion.style.animationName === "containerInON") {
        containerQuestion.style.animation = "containerInOFF 2s both";
    } else {
        containerQuestion.style.animation = "containerInON 2s both";
    }
})

buttonNO.addEventListener("mouseover", () => {
    buttonNO.style.position = "absolute";
    buttonNO.style.top = Math.random() * height + "px";
    buttonNO.style.left = Math.random() * width + "px";
})

buttonYES.addEventListener("click", () => {
    const duration = 8 * 1000;
    const end = Date.now() + duration;
    const checkboxYes = $.getElementById("checkbox-yes").checked;

    imagem.style.display = "block";
    imagem.style.animation = "slideinON 2s both";
    containerQuestion.style.animation = "containerInOFF 2s both";

    (function frame() {
        if (checkboxYes) {
            // launch a few confetti from the left edge
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });

            // and launch a few from the right edge
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }

        // keep going until we are out of time
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        } else {
            imagem.style.animation = "slideinOFF 2s both";
        }
    }());
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const image = imageInput.files[0];

    // $.title = titleInput.value;
    newQuestion.innerHTML = questionInput.value;
    buttonNO.style.position = "initial";

    if (!!image) {
        const contentType = image.type;
        const validContentTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (!validContentTypes.includes(contentType)) {
            alert('O arquivo enviado não é uma imagem válida.');
        } else {
            // const imageReader = new FileReader();
            // imageReader.onloadend = () => {
            //     const base64Image = imageReader.result;
            //     // Use the base64Image variable as needed
            //     console.log(base64Image);
            //     sendDados(questionInput.value, base64Image)
            // };
            // imageReader.readAsDataURL(image);
            newImage.src = URL.createObjectURL(image);
            // sendDados(questionInput.value, URL.createObjectURL(image));
        }
    } else {
        // sendDados(questionInput.value);
    }

    containerQuestion.style.animation = "containerInOFF 2s both";
});