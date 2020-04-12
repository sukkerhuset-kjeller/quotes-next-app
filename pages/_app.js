import Head from 'next/head';
import React from 'react';
import { GlobalStyle } from '../util/globalStyle';
import ThemeProvider from '../util/themes';
import { appName } from '../util/vars';

export default ({ Component, pageProps }) => {
    return (
        <ThemeProvider>
            <Head>
                <title>{appName}</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:400,500i,600,700&display=swap"
                    rel="stylesheet"></link>
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
};
