import { Form, Input, message } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useState } from "react";
import SubmitButton from "../button/SubmitButton";
import Button from "../button/Button";
import { createConexaoUsuarios, getPacienteById } from "../../services/api";


const cuidadorLocalStorage = localStorage.getItem('cuidador')

const cuidadorJSON = cuidadorLocalStorage && isValidJSON(cuidadorLocalStorage) ? JSON.parse(cuidadorLocalStorage) : null;

// Função para verificar se uma string é JSON válida
function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
const idCuidador = cuidadorJSON ? cuidadorJSON.id : null;


function ModalConectar({ onOpen, onCancel }) {
    const [form] = Form.useForm();

    const [paciente, setPaciente] = useState({});
    const [idPaciente, setIdPaciente] = useState({});
    const [loading, setLoading] = useState(true);

    //Pegar o usuario para fazer a verificação se ele existe 

    useEffect(() => {
        const fetchData = async () => {
            try {
                //Api de buscar pacientes
                const dataPacienteById = await getPacienteById();

                // const dataCreateRelatorio = await createRelatorio();

                setPaciente(dataPacienteById);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
                setLoading(false);
            }
        };

        if (idCuidador) {
            fetchData();
        }
    }, [idCuidador]);

    const onFinishMadeConection = async (values) => {
        try {
            const pacienteID = JSON.parse(values.idPaciente);
            const cuidadorID = idCuidador;

            if (pacienteID ) {
                console.log({pacienteID, cuidadorID});
                const response = await createConexaoUsuarios(cuidadorID, pacienteID);
                console.log('A Q U I : ', response);

                if (response.status === 200 || response.status === 201) {
                    // Conexão bem-sucedida
                    Modal.success({
                        content: 'Conexão feita com sucesso',
                        onOk: onCancel,
                    });
                }
            } else {
                console.error('ID do paciente inválido:', pacienteID);
            }
        } catch (error) {
            if (error.response.status === 409) {
                // Contas já estão conectadas
                Modal.error({
                    content: 'Ambas as contas já estão conectadas, ou já tiveram uma conexão em algum momento. Verifique suas contas desvinculadas nas configurações.',

                    onOk: onCancel,
                });
            } else {
                console.log(400);
                Modal.error({
                    content: 'Erro na conexão de contas, tente mais tarde!',

                    onOk: onCancel,
                });
            }
        }
    };



    return (
        <Modal
            centered
            open={onOpen}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinishMadeConection}
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '40vh',
                    gap:'2rem'
                }}>
                <h3>Conectar contas</h3>
                <p
                    style={{
                        textAlign: 'center',
                        fontFamily: 'Manrope',
                        fontSize: '1rem',
                        fontWeight: '400',
                        color: 'var(--neutral-500, #64748B)'
                    }}
                >Insira o código de conexao do seu paciente, por favor.</p>

                <Form.Item
                    name={'idPaciente'}
                >
                    <Input
                        value={idPaciente}  // Use o estado idPaciente aqui
                        onChange={(e) => setIdPaciente(e.target.value)}  // Atualize o estado quando o valor mudar
                        style={{
                            width: '10rem',
                            height: '3rem',
                            textAlign: 'center',
                            fontSize: '1.2rem'
                        }}
                        placeholder="Código"
                    />
                </Form.Item>


                <Form.Item
                    name={'button'}
                >

                    <SubmitButton
                        nameButton={'Conectar'}
                        form={form}
                    />

                </Form.Item>

            </Form>

        </Modal>
    );
}

export default ModalConectar;