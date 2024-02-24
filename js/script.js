
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

    fetch(`https://api.edamam.com/search?q="chicken"&app_id=${app_id}&app_key=${app_key}&to=10`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
    
                displayReceipe(data);
            })
});

submit.addEventListener('click', submitDisplay = () => {
    
    if (search.value !== '') {
        errorMessage.innerHTML = '';
        search.style.border = 'none';
        container.classList.remove('middle');

        fetch(`https://api.edamam.com/search?q=${search.value}&app_id=${app_id}&app_key=${app_key}&to=10`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                content.innerHTML = '';
    
                displayReceipe(data);
            })
    } else {
        search.style.border = '1px solid' + errorColor;
        errorMessage.innerHTML = '<p class="insert-error">Please insert an ingredient or a dish !</p>';
    }

    search.value = '';
});

function displayReceipe(data) {
    data.hits.forEach(hit => {
        content.innerHTML += `
            <div class="card">
                <h2>${hit.recipe.label}</h2>
                <div class="card-content">
                    <div class="image-div">
                        <img src="${hit.recipe.image}" alt="recipe image">
                    </div>
                    <div>
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
                            <div class="ingredients-div__items">
                                <p><span>Ingredients:</span></p>
                                ${
                                    hit.recipe.ingredientLines.map(ingredient => {
                                        return `<p class="ingredient-label">${ingredient}</p>`;
                                    })
                                }
                            </div>
                        </div>
                        <div class="view-recipe-div">               
                            <button class="custom-btn recipe-btn">
                                <a href="${hit.recipe.url}" target="_blank">View Recipe</a>                     
                            </button>
                        </div>
                    </div>
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
