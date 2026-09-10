import { useParams } from 'react-router-dom';
import PageLayout from '../templates/PageLayout';
import ProductForm from '../organisms/ProductForm';

const EditarProduto = () => {
    const { id } = useParams();

    return (
        <PageLayout title="Editar Produto">
            <ProductForm modo="editar" id={id} />
        </PageLayout>
    );
};

export default EditarProduto;