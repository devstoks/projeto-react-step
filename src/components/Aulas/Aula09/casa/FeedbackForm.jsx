import React, { useState } from 'react';
import './FeedbackForm.css';
const FeedbackForm = () => {

    // Estados dos campos
    // 1. primeiro cria-se o estado do nome, email e mensagem com useState
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [errors, setErrors] = useState({});

    // Estado do feedback enviado
    // 2. cria-se o estado do feedback enviado com useState, que será um objeto com os campos name, email e message
    const [submitted, setSubmitted] = useState(null);


    // 3. cria-se a função validateForm que valida os campos do formulário, retornando true se todos os campos forem válidos e false caso contrário
    const validateForm = () => {

    const newErrors = {};

    // Validação do nome
    if (!name.trim()) {
        newErrors.name = 'Nome é obrigatório';
    } else if (name.length < 3) {
        newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    } else if (name.length > 50) {
        newErrors.name = 'Nome deve ter no máximo 50 caracteres';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        newErrors.name = 'Nome deve conter apenas letras e espaços';
    }


    // Validação do email
    if (!email.trim()) {
        newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email inválido';
    }


    // Validação da mensagem
    if (!message.trim()) {
        newErrors.message = 'Mensagem é obrigatória';
    } else if (message.length < 10) {
        newErrors.message = 'Mensagem deve ter no mínimo 10 caracteres';
    } else if (message.length > 500) {
        newErrors.message = 'Mensagem deve ter no máximo 500 caracteres';
    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};


    // 4. cria-se a função handleSubmit que é chamada quando o formulário é enviado, 
    // chamando a função validateForm e, se todos os campos forem válidos, atualiza o estado submitted com os valores dos campos
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            setSubmitted({
                name: name,
                email: email,
                message: message
            });
        }
    };

    // 5. cria-se a função handleClear que é chamada quando o botão "Limpar" é clicado,
    // limpando os campos do formulário e o estado submitted
    const handleClear = () => {
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(null);
        setErrors({}); // Limpa os erros
    };


    // 6. cria-se o retorno do componente, que renderiza o formulário e, se o feedback foi enviado, exibe os valores dos campos enviados
    return (
        <div className="feedback-container">

            <div className="feedback-header">
                <span className="feedback-badge">FEEDBACK</span>

                <h1>Conte o que você achou</h1>

                <p>
                    Sua opinião é importante para nós.
                    Envie seu feedback abaixo.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="name">
                            Nome
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>


                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                </div>


                <div className="form-group">
                    <label htmlFor="message">
                        Mensagem
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        placeholder="Escreva seu feedback..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                </div>


                <div className="form-buttons">

                    <button
                        type="button"
                        className="clear-button"
                        onClick={handleClear}
                    >
                        Limpar
                    </button>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Enviar feedback
                        <span>→</span>
                    </button>

                </div>

            </form>


            {submitted && (
                <div className="submitted-feedback">

                    <div className="submitted-header">
                        <div className="success-icon">✓</div>

                        <div>
                            <h2>Feedback enviado!</h2>
                            <p>Confira os dados enviados:</p>
                        </div>
                    </div>

                    <div className="submitted-data">

                        <div className="data-item">
                            <span>Nome</span>
                            <strong>{submitted.name}</strong>
                        </div>

                        <div className="data-item">
                            <span>Email</span>
                            <strong>{submitted.email}</strong>
                        </div>

                        <div className="data-item message-data">
                            <span>Mensagem</span>
                            <strong>{submitted.message}</strong>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default FeedbackForm;