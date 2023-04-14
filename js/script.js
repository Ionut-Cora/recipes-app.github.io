
const secondaryColor = '#6CAA7F';
const errorColor = '#ff0033';

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const content = document.querySelector('.content');
const container = document.querySelector('.container');
const errorMessage = document.querySelector('.error-message');

const app_key = config.API_KEY;
const app_id = config.API_ID;

window.addEventListener('load', () => {
    container.classList.remove('middle');

    fetch(`https://api.edamam.com/search?q="chicken"&app_id=${app_id}&app_key=${app_key}&to=20`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
    
                displayReceipe(data);
            })
});

submit.addEventListener('click', submitDisplay = () => {
    
    if (search.value !== '') {
        errorMessage.innerHTML = '';
        search.style.borderColor = secondaryColor;
        container.classList.remove('middle');

        fetch(`https://api.edamam.com/search?q=${search.value}&app_id=${app_id}&app_key=${app_key}&to=20`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                content.innerHTML = '';
    
                displayReceipe(data);
            })
    } else {
        search.style.borderColor = errorColor;
        errorMessage.innerHTML = '<p class="insert-error">Please insert an ingredient or a dish !</p>';
    }

    search.value = '';
});

function displayReceipe(data) {
    data.hits.forEach(hit => {
        content.innerHTML += `
            <div class="card">
                <h2>${hit.recipe.label}</h2>
                <img src="${hit.recipe.image}">
                <div class="content-div">
                    <p><span>Calories: </span>${hit.recipe.calories.toPrecision(6)}kcal</p>
                    <div class="diet-div">
                        <p><span>Diet label: </span></p>
                        <div>
                            ${
                                hit.recipe.dietLabels.map(dietLabel => {
                                    return `<p>${dietLabel}</p>`;
                                })
                            }                              
                        </div>
                    </div>
                    <div class="health-div">
                        <div class="health-div__items">
                            <p><span>Health label: </span></p>
                            ${
                                hit.recipe.healthLabels.map(healthLabel => {
                                    return `<p class="health-label">${healthLabel}</p>`;
                                })
                            }                              
                        </div>
                    </div>
                </div>
                <div class="ingredients-div">
                    <details>
                        <summary>Ingredients:</summary>
                        <ul id="taglist">
                            ${
                                hit.recipe.ingredientLines.map(ingredient => {
                                    return `<li>${ingredient}</li>`;
                                })
                            }                                        
                        </ul>
                    </details>
                </div>
                <div class="view-recipe-div">               
                    <button class="custom-btn recipe-btn">
                        <a href="${hit.recipe.url}" target="_blank">View Recipe</a>                     
                    </button>
                </div>
            </div>
        `;
    });
}

search.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        submitDisplay();
    }
});
