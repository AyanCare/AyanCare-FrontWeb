import React from "react";
import '../create-relatorio-modal.css'
import Loading from '../../loading/Loading'
import { Button, Divider, Form, Input, Modal, Select } from "antd";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

function MadeRelatorioScreen(
    {
        loadingParameterUseState,
        pacienteParameterUseState,
        onFinishFunction,
        handleChangeSelect,
        toggleModoQuestionarioFunction,
        onCancelParameterUseState

    }
) {

    const [form] = Form.useForm();

    const onCancel = onCancelParameterUseState;
    const loading = loadingParameterUseState;
    const paciente = pacienteParameterUseState;
    const onFinish = onFinishFunction;
    const handleChange = handleChangeSelect;
    const toggleModoQuestionario = toggleModoQuestionarioFunction;

    const hasPacientes = paciente.status


    return (

        <Form
            form={form}
            className="create-relatorio_forms"
            {...layout}
            name="create-relatorio"
            onFinish={onFinish}
            style={{
                maxWidth: '80vw',
            }}
            layout="vertical"
            scrollToFirstError>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5rem'
                }}
            >
                <h2 className="create-relatorio-modal_title">
                    Relatório
                </h2>
                <h4 className="create-relatorio_description">
                    Este formulário permite que você selecione um paciente específico para criar um relatório diário sobre o seu dia. Escolha o paciente da lista abaixo para começar.
                </h4>
                <Divider />
            </div>

            <Form.Item
                name={'paciente'}
                label='Selecione um Paciente'
                rules={[
                    {
                        required: true,
                        message: "Selecione seu paciente, por favor!",
                    }
                ]}
                style={{
                    width: '80vw',
                    fontSize: '14px'
                }}
            >

                <Select
                    defaultValue=""
                    placeholder="Clique aqui..."
                    style={{ width: 200 }}
                    onChange={handleChange}
                    labelInValue="Paciente"
                >
                    {loading ? (
                        <Loading />
                    ) : (
                        paciente.conexao.map(conexao => (
                            <Option key={conexao.id_paciente} value={conexao.id_paciente}>
                                {conexao.paciente}
                            </Option>
                        ))
                    )}
                </Select>

            </Form.Item>


            <Form.Item
                name='relatorio'
                label="Preencha seu Relatório neste campo:"
                rules={[
                    {
                        required: true,
                        message: "Você esqueceu de preencher seu Relatório!",
                    }
                ]}
                style={{
                    fontSize: '5rem',
                    fontFamily: 'poppins'
                }}
            >
                <Input.TextArea
                    style={{
                        width: '100vw',
                        height: '50vh',
                        resize: 'none'
                    }}
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit"
                    style={{
                        backgroundColor: '#35225F',
                        color: '#fff'
                    }}
                >
                    Próximo
                </Button>
            </Form.Item>


            {/* <Button form={form} type="primary" onClick={toggleModoQuestionario}>
                Criar Relatório
            </Button> */}
        </Form>
    );
}

export default MadeRelatorioScreen;