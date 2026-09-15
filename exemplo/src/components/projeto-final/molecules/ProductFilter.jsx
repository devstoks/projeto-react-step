// Molécula: filtro de produtos (Autocomplete do MUI + botões).
// Não filtra nada sozinha — só avisa a Home qual nome foi escolhido.


import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '../atoms/Button';

const ProductFilter = ({ opcoes = [], onFiltrar }) => {
    const [valorSelecionado, setValorSelecionado] = useState(null);

    const handleFiltrar = () => {
        // Passa o nome selecionado (ou null se nada selecionado)
        onFiltrar(valorSelecionado);
    };

    const handleLimpar = () => {
        setValorSelecionado(null);
        onFiltrar(null);
    };

    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">

            <div className="flex-1">
                <Autocomplete
                    options={opcoes}
                    value={valorSelecionado}
                    onChange={(_, novoValor) => setValorSelecionado(novoValor)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Buscar produto por nome"
                            variant="outlined"
                            size="small"
                        />
                    )}
                />
            </div>

            <div className="flex gap-2">
                <Button
                    variant="primary"
                    className="!w-auto !px-6"
                    onClick={handleFiltrar}
                >
                    Filtrar
                </Button>

                <Button
                    variant="ghost"
                    className="!w-auto !px-4"
                    onClick={handleLimpar}
                >
                    Limpar
                </Button>
            </div>

        </div>
    );
};

export default ProductFilter;