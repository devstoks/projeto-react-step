// Página: só composição (template + organismo). Sem lógica de API.


import PageLayout from '../templates/PageLayout';
import LoginForm from '../organisms/LoginForm';

const Login = () => {
    return (
        <PageLayout title="Login" largura="md">
            <LoginForm />
        </PageLayout>
    );
};

export default Login;