import React from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';

import styles from '../../styles/Home.module.css'

export default function index(props) {
  console.log('props: ', props.array.forEach(item => console.log(Object.keys(item)[0])))

  return (<>
    <div className="container">
      <h1 className="my-4">Les listes de Vocabulaire</h1>
      <ul className="list-group">{
        props.array.map(item => (
          <li className="list-group-item" key={uuidv4()}>
            <Link href={`/listes/${item.name}`}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))
      }</ul>
    </div>
  </>)
}

export async function getStaticProps() {
  const data = await import(`/data/listes.json`)
  const array = data.englishList

  return {
    props: { // obligatoire : les données doivent passer par "props"
      array
    }
  }
}
