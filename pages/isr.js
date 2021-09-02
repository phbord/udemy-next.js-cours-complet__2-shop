import React from 'react'

export default function contact(props) {
  const getRandom = () => {
    const min = Math.ceil(0)
    const max = Math.floor(props.data.length)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const num = getRandom()

  return (
    <div>
      <h1>Isr</h1>
      <p>{props.data[num].text}</p>
    </div>
  )
}

export async function getStaticProps() {
  const quote = await fetch("https://type.fit/api/quotes")
  const data = await quote.json()

  return {
    props: {
      data
    },
    revalidate: 20
  }
}
