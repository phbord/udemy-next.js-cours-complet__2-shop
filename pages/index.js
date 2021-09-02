import { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { v4 as uuidv4 } from 'uuid';

export default function Home(props) {
  console.log('props: ', props)

  const [state, setState] = useState(false)

  useEffect(() => {
    newWord()
  }, [])
  
  const newWord = () => {
    fetch('/api/vocapi')
      .then(res => res.json())
      .then(data => setState(data))
  }
  console.log('state: ',state)

  let randomWord;
  if (state) {
    const array = state.englishList[0].data
    //console.log('array: ',array)
    randomWord = array[Math.floor(Math.random() * array.length)].en
    console.log('randomWord: ',randomWord);
  }

  return (<>
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Titre</title>
    </Head>
    <div className={styles.container}>
      <h1 className={styles.titre}>Vocabulaire de base</h1>
      <table className={styles.tableau}>
        <tbody>{
          props.array.map(el => (
            <tr key={uuidv4()}>
              <td>{el.en}</td>
              <td>{el.fr}</td>
            </tr>
          ))
        }</tbody>
      </table>
      <h1 className={`${styles.titre} mt-5`}>Mot au hasard</h1>
      <button className="btn btn-primary d-block m-auto" 
              onClick={newWord}>Mots aléatoires</button>
      <h2 className={styles.titre}>{randomWord}</h2>
    </div>
  </>)
}

export async function getStaticProps() {
  const data = await import(`/data/vocabulary.json`)
  const array = data.vocabulary

  if (array.length === 0) {
    return {
      //notFound: true
      redirect: {
        destination: "/isr"
      }
    }
  }

  return {
    props: { // obligatoire : les données doivent passer par "props"
      array
    }
  }
}
