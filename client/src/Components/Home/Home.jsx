import React from 'react'
import Cards from '../Cards/Cards';
import calendar from '../../Image/Menu_semanal.jpg'

export default function Home() {
        return (
                <div>
                 <h2>Planifica tus comidas</h2>
                 <img src= {calendar} alt='medium'/>
                <h2 >Tenemos estas recetas para ti</h2>
                    <Cards />
                </div>
        )
}