import { elements } from './base';

export const getInput = () => elements.searchInput.value

export const clearInput = recipe => elements.searchInput.value = '';

export const clearResults = () => {
    elements.searchList.innerHTML= '';
    elements.searchResPages.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
       title.split(' ').reduce((acc, cur) =>  {
         if (acc + cur.length <= limit) {
             newTitle.push(cur);
         }
         return acc + cur.length;
    }, 0); 
    return `${newTitle.join(' ')}...`
 }
 return title;   
}

const renderRecipe = recipe => {
   const murkup = `
                <li>
                    <a class="results__link " href="#${recipe.recipe_id} ">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title} ">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li> `
               
   elements.searchList.insertAdjacentHTML('beforeend',murkup);
}

const creatureButtons = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
       <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
       <svg class="search__icon">
         <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
</button>`; 




const renderButton  = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage)
     
    let button;
    if (page === 1 && pages > 1) {
        // Only Button to go to next page
         button = creatureButtons(page, 'next');
    }else if (page < pages) {
        //both buttons
        button = `
          ${creatureButtons(page, 'prev')}
          ${ creatureButtons(page, 'next')}
     `;
      
    }else if(page === pages && page > 1){
       // Only Buttons to go to prev page
       button = creatureButtons(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
}

export const renderResult = (recipes, page = 1, resPerPage = 10 ) => {
       //Render result of current page
       const start = (page - 1) * resPerPage;
       const end = page * resPerPage;
        recipes.slice(start, end).forEach(renderRecipe);

        //Render pagination button
    renderButton(page, recipes.length, resPerPage);    
}