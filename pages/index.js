import Head from "next/head";
import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Movies from "../components/Movies";
import { useStateContext } from "../context/StateContext";
import { motion as m, AnimatePresence } from "framer-motion";

export default function Home({ movies }) {
  const results = movies.results;

  const { filtered, setFiltered } = useStateContext();

  useEffect(() => {
    setFiltered(results);
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Filter populer={results} />

        <m.div
          layout
          className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-[2rem] gap-x-[1rem]"
        >
          <AnimatePresence>
            {filtered.map((movie) => {
              return (
                <div key={movie.id}>
                  <Movies title={movie.title} image={movie.backdrop_path} />
                </div>
              );
            })}
          </AnimatePresence>
        </m.div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=b065e519df9f6e8091f2f777c4a02bce&language=en-US&page=1"
  );
  const movies = await data.json();

  return { props: { movies } };
}
