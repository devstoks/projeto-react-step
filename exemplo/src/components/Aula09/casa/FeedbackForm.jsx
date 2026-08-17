import React, { useState } from 'react';
import './FeedbackForm.css';
const FeedbackForm = () => {

    // Estados dos campos
    // 1. primeiro cria-se o estado do nome, email e mensagem com useState
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Estado do feedback enviado
    // 2. cria-se o estado do feedback enviado com useState, que será um objeto com os campos name, email e message
    const [submitted, setSubmitted] = useState(null);


    // 3. cria-se a função validateForm que valida os campos do formulário, retornando true se todos os campos forem válidos e false caso contrário
    const validateForm = () => {

        // faz a validação do nome, email e mensagem, exibindo alertas caso algum campo seja inválido
        if (!name.trim()) {
            alert('Nome é obrigatório');
            return false;
        } else if (name.length < 3) {
            alert('Nome deve ter no mínimo 3 caracteres');
            return false;
        } else if (name.length > 50) {
            alert('Nome deve ter no máximo 50 caracteres');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('Nome deve conter apenas letras e espaços');
            return false;
        }


        // Validação do email
        if (!email.trim()) {
            alert('Email é obrigatório');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Email inválido');
            return false;
        }


        // Validação da mensagem
        if (!message.trim()) {
            alert('Mensagem é obrigatória');
            return false;
        } else if (message.length < 10) {
            alert('Mensagem deve ter no mínimo 10 caracteres');
            return false;
        } else if (message.length > 500) {
            alert('Mensagem deve ter no máximo 500 caracteres');
            return false;
        }

        return true;
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