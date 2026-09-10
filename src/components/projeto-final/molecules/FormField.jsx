// Molécula: junta Label + Input.
// É a peça "campo de formulário" — reutilizada em TODOS os forms do projeto.
// Não tem lógica: só combina dois átomos.

import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({ label, id, ...inputProps }) => {
    return (
        <div className="mb-4">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...inputProps} />
        </div>
    );
};

export default FormField;