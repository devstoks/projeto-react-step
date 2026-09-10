import PageLayout from '../templates/PageLayout';
import RegistrarForm from '../organisms/RegistrarForm';

const Registrar = () => {
    return (
        <PageLayout title="Criar conta">
            <RegistrarForm />
        </PageLayout>
    );
};

export default Registrar;