import { useState } from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import AuthContextProvider from '../contexts/AuthContext';
import Layout from './components/layouts/layout';
import NextNProgress from "nextjs-progressbar";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

    const [queryClient] = useState(() => new QueryClient());


    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Web site created using NextJS" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <AuthContextProvider>
                        <NextNProgress />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </AuthContextProvider>
                </Hydrate>
            </QueryClientProvider>
        </>
    )
}

export default MyApp