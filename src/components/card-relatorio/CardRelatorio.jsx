import React from "react";
import './card-relatorio.css'
import { FileTextFilled } from "@ant-design/icons";

function CardRelatorio({ textoRelatorio, dataRelatorio, horarioRelatorio, onClick }) {

    const texto = textoRelatorio;
    const data = dataRelatorio;
    const horario = horarioRelatorio;

    return (
        <div className="card-relatorio_field"
            onClick={onClick}
        >

            <div className="card-relatorio">
                <div
                style={{
                    display:'flex',
                    gap:'1rem'
                }}>
                    <div className="card-relatorio_icon">
                        <FileTextFilled
                            style={{
                                fontSize: '2.5rem',
                                color: '#9986BD'
                            }}
                        />
                    </div>
                    <div className="card-relatorio_content">
                        <h2 className="card-relatorio_content-title">Relatório</h2>
                        <span className="card-relatorio_content-preview">{texto}</span>
                    </div>

                </div>
                <div className="card-relatorio_content-time">
                    <p className="data">{data}</p>
                    <p className="hora">{horario}</p>

                </div>
            </div>
        </div>
    );
}

export default CardRelatorio;