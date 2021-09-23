import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../Styles/StyleCards.module.css";
import { Link } from "react-router-dom";
import { getDetail, page, setRecipeCalendar } from "../../actions/index";
import Dificultad from './Dificultad';
import swal from 'sweetalert';
import Pagination from "../Pagination/Pagination";
import * as FaIcons from "react-icons/fa"

export default function Cards(props) {

  let recipesPerPage
  const dispatch = useDispatch();
  const pages = useSelector(state => state.page)
  const token = useSelector(state => state.token)

  if (props.confirmador) {
    recipesPerPage = 3;
  } else {
    recipesPerPage = 6;
  }
  const lastRecipeIndex = pages * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = props.allRecipes.slice(firstRecipeIndex, lastRecipeIndex);
  const stackReceta = useSelector((state) => state.recipeCalendar);
  const paginado = (pageNumber) => {
    dispatch(page(pageNumber));
  };
  function agregarCalendario(receta) {
    if (stackReceta.length < 14) {
      return dispatch(setRecipeCalendar(receta))
    } else {
      return swal({
        title: "Receta no agregada",
        text: "El calendario ya tiene 14 elementos",
        icon: "error",
      });
    }
  }

  return (
    <div className={style.content}>
      {currentRecipes?.map((e) => {
        return (
          <div id={style.carData} key={e.id}>

            <Link
              to={`/recipe/${e.id}`}
              onClick={() => dispatch(getDetail(e.id, token))}
              id={style.normal}
            >
              {e.premium !== 'Free' ? <FaIcons.FaStar className={style.premium} /> : null}
              <img
                className="card-img-top"
                id={style.img}
                src={e.img}
                alt="No sé encuentra la imagen"
              />
              <div className="card-body" id={style.card}>

                <h4 id={style.title}>{e.name.toUpperCase()}</h4>
                <h5 id={style.text}>
                  Dificultad:
                </h5>
              </div>
              <Dificultad difficulty={e.difficulty} />
            </Link>
            <div className={style.resize}>
              {e.availability === 'Available' && !!token &&
                <button id={style.btn} onClick={() => agregarCalendario(e)} className="btn btn-secondary" >Agregala a tu Calendario!</button>
              }
              {
                !token && e.availability === 'Available' &&
                <Link to='/acount/login' id={style.btn} className="btn btn-secondary" >Agregala a tu Calendario!</Link>
              }
            </div>

          </div>
        );
      })}
      <div className={style.navFake}>
        <Pagination
          recipesPerPage={recipesPerPage}
          allRecipes={props.allRecipes.length}
          paginado={paginado}
        />
      </div>

    </div>
  );
}
