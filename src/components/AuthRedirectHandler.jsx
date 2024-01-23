/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { UserContext } from '../hooks/useAuth';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Spinner from './Spinner';


const AuthRedirectHandler = ({ provider }) => {
  const { authenticate, exchangeCodeForToken, userDetails } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If userDetails are available, redirect to home page immediately
    if (userDetails) {
      navigate('/home');
    } else if (provider === 'github') {
      // Existing logic to handle GitHub authentication
      const code = searchParams.get('code');
      if (code) {
        exchangeCodeForToken(code).then(accessToken => {
          authenticate(provider, accessToken).then(() => {
            navigate('/home');
          });
        });
      }
    }
  }, [authenticate, exchangeCodeForToken, provider, searchParams, navigate, userDetails]);

  return (
    <Layout>
      <Spinner text={'Authenticating...'} />
    </Layout>
  );
};

export default AuthRedirectHandler;