import React, { useEffect } from "react";
import style from "../../Styles/StyleFrom.module.css";
import { putRecipe,  getIngredients, cleanNewRecipe, getCategory } from "../../actions/index";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SelectCard from "../CreateRecipe/SelectCard/SelectCard";
import {useHistory} from "react-router-dom";
import { orderAZ } from "../../orderFunction/OrderFuncions";
import SelectCategory from "../CreateRecipe/SelectCategory/SelectCategory";
import UploadImage from "../CreateRecipe/UploadImage/UploadImage";

export default function UpdateForm() {
  const dispatch = useDispatch();
  const history = useHistory()
  let ingre = useSelector((state) => state.ingredients);
  const formIngre = useSelector((state) => state.formIngredients);
  const update = useSelector((state) => state.detail);
  const toggleUpdateRecipe = useSelector((state) => state.newRecipe)
  let category = useSelector((state)=>state.category);
  const formCater=useSelector((state)=>state.formCategory)
  const token = useSelector(state => state.token);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getCategory())
    }, [dispatch, formIngre, formCater]);

    if (ingre[0]?.name !== ' ' && ingre.length > 0){
      ingre = ingre.sort(orderAZ)
      ingre.unshift({name: ' '})
    } else if(ingre.length > 0){
      ingre.shift();
      ingre = ingre.sort(orderAZ)
      ingre.unshift({name: ' '})
    }
    if (category[0]?.name !== ' ' && category.length > 0){
      category = category.sort(orderAZ)
      category.unshift({name: ' '})
    } else if(category.length > 0){
      category.shift();
      category = category.sort(orderAZ)
      category.unshift({name: ' '})
    }
  useEffect(() =>{
    if(toggleUpdateRecipe){
      dispatch(cleanNewRecipe())
      history.push('/recipe/' + update.id);
    }
    }, [dispatch, history, update.id, toggleUpdateRecipe])

  useEffect(() => {  
      formik.values.name= update.name
      formik.values.preparation= update.preparation
      formik.values.difficulty= update.difficulty
      formik.values.img= update.img
      formik.values.category=update.category
      formik.values.availability= update.availability === 'Available' ? true : false;
      formik.values.premium= update.premium === 'Premium' ? true : false;
    if (update?.ingredients?.length) {
        onChangeIngredients(update.ingredients);
    }
    if (update?.category?.length) {
        onChangeCategory(update.category);
     }
     if (update?.availability) {
       onChangeAvailability(update.availability === 'Available' ? true : false);
     }
     if (update?.premium) {
      onChangePremium(update.premium === 'Premium' ? true : false);
     }
  }, []); 
 
  const initialValues = {
    name: "",
    preparation: "",
    difficulty: "",
    ingredients:[],
    img: "",
    category:[],
    availability:"",
    premium:""

  };

  const validate = (values) => {
    let error = {};

    if (!values.name) {
      error.name = "Requerido";
    } else if (!/^[^{}<>#$%&~^`/*+¿?¡!@]*$/g.test(values.name)) {
      error.name = "No es texto";
    }

    if (!values.preparation) {
      error.preparation = "Requerido";
    } else if (!/^[^{}<>#$%&~^`/*+¿?¡!@]*$/g.test(values.preparation)) {
      error.preparation = "No es texto";
    }

    if (!values.img) {
      error.img = "Requerido";
    }

    return error;
  };

  const onSubmit = (values) => {
    if(formik.values.premium==='false'){
      formik.values.premium=false
    }
    if(formik.values.premium==='true'){
      formik.values.premium=true
    }
    if(formik.values.availability==='false'){
      formik.values.availability=false
    }
    if(formik.values.availability==='true'){
      formik.values.availability=true
    }
    dispatch(putRecipe(update.id,values,token));    
  };
  const onChangeIngredients = (values) => {
    formik.values.ingredients = values;
  };
  const onChangeCategory =(values)=>{
    formik.values.category = values;
  };
  const onChangeAvailability = (values) => {
    formik.values.availability = (values?.target?.value === "true") ? true : false;    
  };
  const onChangePremium = (values) => {
    formik.values.premium = (values?.target?.value === "true") ? true : false;
  }
  const onChangeImage = (values)=>{
    formik.values.img = values;
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    onChangeIngredients,
    onChangeCategory,
    onChangeAvailability,
    onChangeImage,
    onChangePremium
  });

  return (
    <div class={style.centrado}>
      <form class={style.forms} onSubmit={formik.handleSubmit}>
        <div div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name || update.name}
            onBlur={formik.handleBlur}
            name="name"
            class="form-control"
            placeholder="Escribe Aqui..."
          />
          {formik.errors.name && formik.touched.name === true ? (
            <div class="cosoForm">
              <span>{formik.errors.name}</span>
            </div>
          ) : null}
        </div>

        <div class="mb-3">
          <label class="form-label">Ingredientes</label>
          <select
            defaultValue="none"
            onChange={formik.handleChange}
            name={`ingredients[${formik.values?.ingredients?.length}].ingredient`}
            id="disabledSelect"
            class="form-select"
          >
            {ingre?.map((e, index) => {
              if (!formik.values.ingredients.some(i => e.name === i.ingredient)) {
                return <option value={e.ingredient} key={`ingredient-${index}`}>{e.name}</option>
              }
              return null
            })}
          </select>

          <div class={style.buttonsRemove}>
            {formik.values?.ingredients?.length > 0 &&
              formik.values?.ingredients?.map((e, index) => {
                return (
                  <SelectCard
                    formik={formik}
                    onChange={onChangeIngredients}
                    ingredient={e.ingredient}
                    name={`ingredients[${index}]`}
                    handleChange={formik.handleChange}
                    unit={e.unit}
                    amount={e.amount}
                  />
                );
              })}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Dificultad</label>
          <select
            defaultValue={update.difficulty}
            onChange={formik.handleChange}
            name="difficulty"
            class="form-control"
          >
            <option name="difficulty" value="Fácil">
              Fácil
            </option>
            <option name="difficulty" value="Moderado">
              Moderado
            </option>
            <option name="difficulty" value="Difícil">
              Difícil
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Preparación</label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.preparation || update.preparation}
            onBlur={formik.handleBlur}
            class="form-control"
            name="preparation"
            type="text"
          />
          {formik.errors.preparation && formik.touched.preparation === true ? (
            <div class="cosoForm">
              <span>{formik.errors.preparation}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <UploadImage onChange={onChangeImage} update={true}/>
          {formik.errors.img && formik.touched.img === true ? (
            <div className="cosoForm">
              <span>{formik.errors.img}</span>
            </div>
          ) : null}
        </div>
        <div class="mb-3">
          <label class="form-label">Categorías</label>
          <select
            defaultValue="none"
            onChange={formik.handleChange}
            name={`category[${formik.values.category?.length}]`}
            id="disabledSelect"
            class="form-select"
          >
            {category?.map((e, index) => {
              if (!formik.values.category.some(i => e.name === i)) {
                return <option value={e.name} key={`category-${index}`}>{e.name}</option>
              }
              return null
            })}
          </select>
          <div class={style.buttonsRemove}>
            {formik.values.category.length > 0 &&
              formik.values.category.map((e, index) => {
                return <SelectCategory formik={formik} onChange={onChangeCategory} category={e} name={`category[${index}]` }
                  handleChange={formik.handleChange} />
              })}
          </div>
        </div>

        <div>
            <label class="form-label">Tipo de receta</label>
            <select 
            onChange={onChangePremium}
            class="form-control"
            name="premium">
              <option value={false}>Free</option>
              <option selected={update.premium === 'Premium' ? true : false} value={true}>Premium</option>
              </select>
        </div>

        <div>
            <label class="form-label">¿Está disponible?</label>
            <select 
            onChange={onChangeAvailability}
            class="form-control"
            name="availability">
              <option value={true}>Disponible</option>
              <option selected={update.availability !== 'Available' ? true : false} value={false}>En revisión</option>
              </select>
        </div>
        <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3">
            Actualizar
          </button>
         </div>
      </form>
    </div>
  );
}
