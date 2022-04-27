const imgHamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation-list');
const textInput = document.querySelector('.input-text');
const InputSubmit = document.querySelector('.input-submit');
const alertUrl = document.querySelector('.alert-url');
const sectionShort = document.querySelector('.short-section-url');

imgHamburger.addEventListener('click', () => {
    navigation.classList.toggle('navigation-list-active');
})


let obj = {}

textInput.addEventListener('input', () => {
    obj['text'] = textInput.value;

    return obj;
})

// function validateUrl(res) {
//     const empty = Object.keys(res).length === 0;

//     if(empty) {
//         console.log('url invalida')
//         alertUrl.classList.add('showAlert');

//         setTimeout(() => {
//             alertUrl.classList.remove('showAlert');
//         }, 2000)
//     }else {
//         console.log('url valida')
//     }
// }

InputSubmit.addEventListener('click', () => {

    const { text } = obj; //esta va a ser la url


    if(!validURL(text)) {
        alertUrl.classList.add('showAlert');

        setTimeout(() => {
            alertUrl.classList.remove('showAlert');
        }, 2000)
    }else {
        //console.log('Valid URL')

        //do all the stuff
        createUrl();
    }
})


function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str); 
  }


async function getApi(url) {
    const apiUrl = `https://api.shrtco.de/v2/shorten?url=${url}`;
    const res = await fetch(apiUrl);
    const data = await res.json()

    const { result } = data;
    const shortLink = result.short_link;
    const originalLink = result.original_link;
    // console.log(result.short_link)


    return shortLink;
}
// async function create() {
//     const res1 = await getApi(obj['text']);

//     const p = document.createElement('P');
//     p.innerHTML = res1;
//     sectionShort.appendChild(p);
// }

async function createUrl() {

    const res1 = await getApi(obj['text']);

    sectionShort.style.display = 'block';

    //linea
    const line = document.createElement('DIV')
    line.classList.add('line')
    sectionShort.appendChild(line)

    //url-actual
    const link = document.createElement('P')
    link.classList.add('link')
    link.textContent = obj['text'];
    line.appendChild(link)

    //url-corta
    const newLink = document.createElement('A')
    newLink.classList.add('new-link')
    newLink.href = `https://${res1}`;
    newLink.setAttribute('target', '_blank');   
    newLink.textContent = `https://${res1}`;
    line.appendChild(newLink)

    //copy button
    const copyButton = document.createElement('BUTTON')
    copyButton.textContent = 'Copy'
    copyButton.classList.add('copy-button')
    line.appendChild(copyButton)
    copyButton.addEventListener('click', hello)
} 

function hello() {
    console.log('hello')
}

// function myFunction() {
//     /* Get the text field */
//     var copyText = document.getElementById("myInput");
  
//     /* Select the text field */
//     copyText.select();
//     copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
//      /* Copy the text inside the text field */
//     navigator.clipboard.writeText(copyText.value);
  
//     /* Alert the copied text */
//     alert("Copied the text: " + copyText.value);
//   }

//refactorizar