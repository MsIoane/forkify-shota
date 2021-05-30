import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

const state = {};

/* 
Search controler
*/
const controlSearch = async () => {
    // 1) get query from view 
    const query = searchView.getInput();
    console.log(state);

    if (query) {
        // 2) new search object and add to state 
        state.search = new Search(query);

        //3) Prepare Ul for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchList);
        
        try {
        //4) Search for recipes
        await state.search.getResults();

        //5)render results on ul
        clearLoader();
        searchView.renderResult(state.search.result);
        } catch (error) {
           alert('Error search');    
        }

    }
}




elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
     controlSearch();
});



elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
      const goToPage = +btn.dataset.goto;
      searchView.clearResults();
      searchView.renderResult(state.search.result, goToPage);
    }
});

 /*const search = new Search('pizza');
search.getResults();
console.log(search.result); */ 

/*
 Recipe Controller
 */

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
       //prepare ul for changes
         recipeView.clearRecipe();
         renderLoader(elements.recipe);  

       //create new recipe object
        state.recipe = new Recipe(id);
        try {
            //get recipe data
         await  state.recipe.getRecipe();
         state.recipe.parseIngredients();
          
         //calculate servings and time
          state.recipe.calacTime();
          state.recipe.calcServings();
          
         //rendering recepe
         clearLoader();
         recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error recipe');
        }
      
    }
};

 ['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe));