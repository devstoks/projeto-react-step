import React, { useState } from 'react';
import './NotificationPanel.css';
import './Figurinha';
import Figurinha from './Figurinha';

const NotificationPanel = () => {

    const [showPanel, setShowPanel] = useState(false);

    // Notificações
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            contatoId: 1,
            pessoa: "João filho da Claudia",
            message: "Você está sendo notificado.",
            prioridade: "alta",
        },
        {
            id: 2,
            contatoId: 2,
            pessoa: "Mãe",
            message: "Você recebeu novas mensagens.",
            prioridade: "média",
        },
        {
            id: 3,
            contatoId: 3,
            pessoa: "amor ❤️",
            message: "Você tem uma nova atualização.",
            prioridade: "baixa",
        },
    ]);

    // Mensagens individuais
    const [mensagens, setMensagens] = useState([
        {
            id: 1,
            contatoId: 2,
            contato: "Mãe",
            message: "Filho",
        },
        {
            id: 2,
            contatoId: 2,
            contato: "Mãe",
            message: "Estou chegando",
        },
        {
            id: 3,
            contatoId: 2,
            contato: "Mãe",
            message: "Já lavou a louça que eu te pedi?",
        },
        {
            id: 4,
            contatoId: 3,
            contato: "amor ❤️",
            message: "Oi amor",
        },
        {
            id: 5,
            contatoId: 3,
            contato: "amor ❤️",
            message: "Depois quero conversar com você.",
        },
        {
            id: 6,
            contatoId: 3,
            contato: "amor ❤️",
            message: "Eu n sei qual vai ser sua reacão, mas eu te amo.",
        },
        {
            id: 7,
            contatoId: 3,
            contato: "amor ❤️",
            message: "viu?",
        },
        {
            id: 8,
            contatoId: 3,
            contato: "amor ❤️",
            figurinha: true,
        },{
            id: 9,
            contatoId: 1,
            contato: "João filho da Claudia",
            message: "I See you",
        }
    ]);


    // Guarda o contato cuja conversa está aberta
    const [conversaAberta, setConversaAberta] = useState(null);

    // Remove uma notificação
    const removeNotification = (id) => {
        setNotifications(
            notifications.filter(
                (notification) => notification.id !== id
            )
        );
    };

    // Abre a conversa de um contato
    const abrirConversa = (contatoId) => {
        const conversa = mensagens.filter(
            (mensagem) => mensagem.contatoId === contatoId
        );

        setConversaAberta({
            contatoId: contatoId,
            mensagens: conversa,
        });
    };

    // Remove uma mensagem específica
    const removerMensagem = (id) => {
        setMensagens(
            mensagens.filter(
                (mensagem) => mensagem.id !== id
            )
        );

        // Atualiza a conversa aberta
        if (conversaAberta) {
            setConversaAberta({
                ...conversaAberta,
                mensagens: conversaAberta.mensagens.filter(
                    (mensagem) => mensagem.id !== id
                ),
            });
        }
    };

    return (
        <div className="notification-panel">

            {/* BOTÃO DAS NOTIFICAÇÕES */}

            <button
                className="main-button"
                onClick={() => setShowPanel(!showPanel)}
            >
                {showPanel
                    ? "Ocultar Notificações"
                    : notifications.length > 0
                        ? `🔔 Mostrar ${notifications.length} Notificações`
                        : "🔔 Mostrar Notificações"
                }
            </button>


            {/* LISTA DE NOTIFICAÇÕES */}

            {showPanel && (
                <div className="panel">

                    <h3>🔔 Notificações</h3>

                    {notifications.length === 0 ? (

                        <p className="empty-message">
                            Nenhuma notificação
                        </p>

                    ) : (

                        <ul>

                            {notifications.map((notification) => (

                                <li
                                    key={notification.id}
                                    className="notification-item"
                                >

                                    {/* CLICAR NA NOTIFICAÇÃO ABRE A CONVERSA */}

                                    <button
                                        className="notification-content"
                                        onClick={() =>
                                            abrirConversa(notification.contatoId)
                                        }
                                    >

                                        <span className="priority">
                                            {notification.prioridade === "alta"
                                                ? "🔴"
                                                : notification.prioridade === "média"
                                                    ? "🟡"
                                                    : "🟢"
                                            }
                                        </span>

                                        <div>
                                            <strong>
                                                {notification.pessoa}
                                            </strong>

                                            <p>
                                                {notification.message}
                                            </p>
                                        </div>

                                    </button>


                                    {/* REMOVER NOTIFICAÇÃO */}

                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            removeNotification(notification.id)
                                        }
                                    >
                                        Remover
                                    </button>

                                </li>

                            ))}

                        </ul>

                    )}

                </div>
            )}


            {/* CONVERSA */}

            {conversaAberta && (

                <div className="chat-box">

                    <div className="chat-header">

                        <h3>
                            💬 {conversaAberta.mensagens[0]?.contato}
                        </h3>

                        <button
                            className="close-button"
                            onClick={() => setConversaAberta(null)}
                        >
                            ×
                        </button>

                    </div>


                    <div className="messages">

                        {conversaAberta.mensagens.length === 0 ? (

                            <p className="empty-message">
                                Nenhuma mensagem
                            </p>

                        ) : (

                            conversaAberta.mensagens.map((mensagem) => (

                                <div
                                    key={mensagem.id}
                                    className="chat-message"
                                >

                                    <p>
                                        {mensagem.message}
                                        {mensagem.figurinha ? <Figurinha /> : null}
                                    </p>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            )}

        </div>
    );
};

export default NotificationPanel;