import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIngredients, FilterRecipeByIngredient, getRecipes } from "../../../../../actions/index"
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import style from '../../../../../Styles/StyleNav.module.css'

export default function FilteredByIngredient() {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const ingre = useSelector((state) => state.ingredients)

    const handleFilterChange = (e) => {
        if (e.target.value === "-") dispatch(getRecipes(token))
        else if (e.target.value !== "-") dispatch(FilterRecipeByIngredient(e.target.value, token))
    }

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div>
            <Dropdown align="end" drop={"end"}>
                <Dropdown.Toggle variant="light" id="dropdown-basic" aling="end" drop={"end"}>
                    Ingredientes
                </Dropdown.Toggle>
                <Dropdown.Menu className={style.drop} align="end" drop={"end"}  >
                    {ingre?.map((e) => {
                        return (
                            <li className={style.buttons} key={e.id}>
                                <Button variant="light"
                                    key="end"
                                    id={e.id}
                                    align="end"
                                    title={e.name}
                                    value={e.name} onClick={(e) => handleFilterChange(e)}>
                                    {e.name}
                                </Button>
                            </li>
                        )
                    })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}