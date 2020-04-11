import cookie from 'js-cookie';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import { useEffect } from 'react';

export const login = (token) => {
    cookie.set('session_id', token, { expires: 1 });
    Router.push('/');
};

export const auth = (ctx) => {
    const { session_id } = nextCookie(ctx);

    // If there's no token, it means the user is not logged in.
    if (!session_id) {
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, { Location: '/login' });
            ctx.res.end();
        } else {
            Router.push('/login');
        }
    }

    return session_id;
};

export const logout = () => {
    cookie.remove('session_id');
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now());
    Router.push('/login');
};

export const withAuthSync = (WrappedComponent) => {
    const Wrapper = (props) => {
        const syncLogout = (event) => {
            if (event.key === 'logout') {
                console.log('logged out from storage!');
                Router.push('/login');
            }
        };

        useEffect(() => {
            window.addEventListener('storage', syncLogout);

            return () => {
                window.removeEventListener('storage', syncLogout);
                window.localStorage.removeItem('logout');
            };
        }, []);

        return <WrappedComponent {...props} />;
    };

    Wrapper.getInitialProps = async (ctx) => {
        const token = auth(ctx);

        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps, token };
    };

    return Wrapper;
};
