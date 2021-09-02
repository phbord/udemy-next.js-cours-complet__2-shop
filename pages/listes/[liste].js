import React from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/Home.module.css'

export default function Liste(props) {
  const router = useRouter()

  return (<>
    <div className="container">
      <h1 className={styles.titre}>{`${router.query.liste.charAt(0).toUpperCase()}${router.query.liste.slice(1)}`}</h1>
      <table className={styles.tableau}>
        <tbody>{
          props.listeEnCours.map(el => (
            <tr key={uuidv4()}>
              <td>{el.en}</td>
              <td>{el.fr}</td>
            </tr>
          ))
        }</tbody>
      </table>
    </div>
  </>)
}

// accès au "context" lorsqu'on utilise "getStaticPaths()""
export async function getStaticProps(context) {
  const slug = context.params.liste // liste: fait référence au nom du chemin dynamique [liste].js
  const data = await import(`/data/listes.json`)
  const listeEnCours = data.englishList.find(list => list.name === slug)
  console.log(context, ' / slug: ', slug)

  return {
    props: {
      listeEnCours: listeEnCours.data
    }
  }
}

export async function getStaticPaths() {
  const data = await import(`/data/listes.json`)
  const paths = data.englishList.map(items => ({
    params: {liste: items.name} // liste: fait référence au nom du chemin dynamique [liste].js
  }))

  return {
    // paths: [
    //   {
    //     params: {liste: "words"}
    //   }
    // ],
    paths,
    fallback: false
  }
}
