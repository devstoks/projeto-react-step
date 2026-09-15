import PageLayout from '../templates/PageLayout';
import ProductForm from '../organisms/ProductForm';

const CriarProduto = () => {
    return (
        <PageLayout title="Criar Produto" largura="4xl">
            <ProductForm modo="criar" />
        </PageLayout>
    );
};

export default CriarProduto;