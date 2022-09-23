import Pokedex from '@/features/Pokedex'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokédex - Search for Pokémon Stats</title>
        <meta name="description" content="Pokedex: search your Pokemon" />
        <link rel="icon" href="https://pokemondb.net/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Pokedex />
      </main>

      <footer className={styles.footer}>
        <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="https://pokeapi.co/static/pokeapi_256.3fa72200.png"
              alt="Pokemon API Logo"
              width={108}
              height={31}
            />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
