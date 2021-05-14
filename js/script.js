
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const content = document.querySelector('.content');
const container = document.querySelector('.container');

const app_key = config.API_KEY;
const app_id = config.API_ID;

submit.addEventListener('click', submitDisplay = () => {
    content.innerHTML = '';
    
    if (search.value !== '') {
        container.classList.remove('middle');

        fetch(`https://api.edamam.com/search?q=${search.value}&app_id=${app_id}&app_key=${app_key}&to=20`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
    
                data.hits.forEach(hit => {
                    content.innerHTML += `
                        <div class="card">
                            <h1>${hit.recipe.label}</h1>
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
                                                return `<p>${healthLabel}</p>`;
                                            })
                                        }                              
                                    </div>
                                </div>
                            </div>
                            <div class="ingredients-div">
                                <p><span>Ingredients: </span></p>
                                <ul>
                                    ${
                                        hit.recipe.ingredientLines.map(ingredient => {
                                            return `<li>${ingredient}</li>`;
                                        })
                                    }                                        
                                </ul>
                            </div>
                            <button class="recipe-btn">
                                <a href="${hit.recipe.url}">View Recipe</a>                      
                            </button>
                        </div>
                    `;
                });
            })
    } else {
        content.innerHTML = '<p class="insert-error">Please insert an ingredient in the search bar !</p>';
    }


    search.value = '';
});

search.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        submitDisplay();
    }
});
