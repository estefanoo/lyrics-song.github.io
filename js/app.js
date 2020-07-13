import {API} from './api.js';
import * as userInterfaz from './interfaz.js';

userInterfaz.formSearch.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const artist = document.querySelector('#artist').value,
          song = document.querySelector('#song').value;

    if(artist === '' || song === ''){

        userInterfaz.divMessage.innerHTML = 'Complete all fields';
        userInterfaz.divMessage.classList.add('form__message--error');
        setTimeout(()=>{
            userInterfaz.divMessage.innerHTML = '';
            userInterfaz.divMessage.classList.remove('form__message--error');
        }, 3000);
    }
    else{
        const api = new API(artist, song);
        api.consultarAPI()
            .then(data => {
                if(data.respuesta.lyrics){
                    const lyrics = data.respuesta.lyrics;
                    userInterfaz.divResults.textContent = lyrics
                }else{
                    userInterfaz.divMessage.innerHTML = 'the song does not exist, try another..';
                    userInterfaz.divMessage.classList.add('form__message--error');
                    setTimeout(()=>{
                        userInterfaz.divMessage.innerHTML = '';
                        userInterfaz.divMessage.classList.remove('form__message--error');
                        userInterfaz.formSearch.reset()
                    }, 3000);
                }
            })
    }
});