import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({ label, id, className = '', ...inputProps }) => {
    return (
        <div className={`mb-5 text-left ${className}`}>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...inputProps} />
        </div>
    );
};

export default FormField;