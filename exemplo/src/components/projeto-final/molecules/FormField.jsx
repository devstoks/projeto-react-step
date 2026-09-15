import Label from '../atoms/Label';
import Input from '../atoms/Input';

// Componente que representa um campo de formulário com um rótulo e um input. 
// Ele recebe as props label, id, className e outras props adicionais para o input.
const FormField = ({ label, id, className = '', ...inputProps }) => {
    return (
        <div className={`mb-5 text-left ${className}`}>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...inputProps} />
        </div>
    );
};

export default FormField;