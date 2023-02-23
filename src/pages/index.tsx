import { type NextPage } from "next"
import Head from "next/head"
import { api } from "~/utils/api"

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "22/27 - TMDB Designed" })
  console.log(hello.data?.greeting)

  return (
    <>
      <Head>
        <title>22/27 - TMDB Designed</title>
      </Head>
      <main
        data-theme="night"
        className="flex min-h-screen flex-col items-center gap-4"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight">
          22/27 - TMDB Designed
        </h1>
      </main>
    </>
  )
}

export default Home
