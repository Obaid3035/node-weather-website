console.log('Javascript file is loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const Message = document.getElementById('message');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    getWeather(location);
});

const getWeather = (location) => {
    Message.textContent = 'Loading the Weather...';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                Message.textContent = data.error;
            } else {
                Message.textContent = data.location;
                Message.append(`. ${data.forecast}`);
            }
        });
    });
}



