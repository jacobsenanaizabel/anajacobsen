import React from 'react';
import Link from 'next/link';
import Intro from '../components/molecules/Intro'
import Cards from '../components/molecules/cards'
import Sidebar from '../components/organisms/sidebar'
import Footer from '../components/organisms/footer'
export async function getStaticProps() {
	const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
		.then((respostaDoServer) => {
			if (respostaDoServer.ok) {
				return respostaDoServer.json();
			}

			throw new Error('Deu problema');
		})
		.then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);

	return {
		props: {
			pokemons,
		},
	};
}

export default function Home(props) {
	const { pokemons } = props;

	return (
		<div>
			<Sidebar />
			<div class="wrapper">
				<Intro />
				<Cards />
			</div>
			<Footer />
		</div>
	);
}