
const URL = 'http://localhost:3001';
// const URL = 'https://recetapp-back.herokuapp.com';

export const RECIPES_URL=`${URL}/recipe`;
export const RECIPES_USER_URL=`${URL}/recipe/user`;
export const RECIPES_GUEST_URL=`${URL}/recipe/guest`;
export const INGREDIENTS_URL= `${URL}/ingredients`;
export const CATEGORY_URL= `${URL}/category`;
export const RECIPES_DETAIL_USER_URL= `${URL}/recipe/details/user/`;
export const RECIPES_DETAIL_GUEST_URL= `${URL}/recipe/details/guest/`;
export const RECIPES_SEARCH_USER_URL = `${URL}/recipe/search/user/`;
export const RECIPES_SEARCH_GUEST_URL = `${URL}/recipe/search/guest/`;
export const REGISTER_URL = `${URL}/user/register`;
export const LOGIN_URL = `${URL}/user/login`;
export const UNIT_URL = `${URL}/unit`;
export const RECIPES_BY_INGREDIENTS_USER_URL = `${URL}/recipe/filterByIngredient/user/`;
export const RECIPES_BY_INGREDIENTS_GUEST_URL = `${URL}/recipe/filterByIngredient/guest/`;
export const RECIPES_BY_CATEGORY_USER_URL =`${URL}/recipe/filterByCategory/user/`;
export const RECIPES_BY_CATEGORY_GUEST_URL =`${URL}/recipe/filterByCategory/guest/`;
export const CALENDAR_URL = `${URL}/calendar`;
export const CALENDAR_USER_URL = `${URL}/calendar/user`;
export const ADMIN_USERS_URL = `${URL}/user`;
export const POST_COMENTARIO_URL = `${URL}/review`
export const GET_COMENTARIOS_RECETA_URL = `${URL}/reviews/recipe`
export const ADMIN_USERS_DELETE_URL = `${URL}/user/admin`;
export const UPDATE_USERS_URL = `${URL}/user/admin`;
export const POST_LIKE_URL = `${URL}/like`;