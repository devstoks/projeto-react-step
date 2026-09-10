import PageLayout from '../templates/PageLayout';
import ProductForm from '../organisms/ProductForm';

const CriarProduto = () => {
    return (
        <PageLayout title="Criar Produto">
            <ProductForm modo="criar" />
        </PageLayout>
    );
};

export default CriarProduto;