import React from 'react';
import { Badge, Calendar, ConfigProvider, Select } from 'antd';
import './calendar.css';
import moment from 'moment/moment';

const CalendarComponent = ({ value, onSelect, onPanelChange, calendarioData }) => {
  const dateCellRender = (value) => {
    if (calendarioData) {
      const eventosSemanais = calendarioData.calendario.eventos_semanais || [];
      const eventosUnicos = calendarioData.calendario.eventos_unicos || [];

      const eventosDoDia = [...eventosSemanais, ...eventosUnicos].filter((evento) =>
        evento.dias.some((dia) => dia.id_dia_semana === (value.day() % 7) + 1)
      );

      const cores = {};

      if (eventosDoDia.length > 0) {
        return (
          <ul className="events">
            {eventosDoDia.map((evento) => {
              const cor = evento.dias[0].cor;

              // Verifica se a cor já foi mapeada
              if (!cores[evento.id]) {
                cores[evento.id] = cor;
              }

              return (
                <li key={evento.nome}>
                  <Badge color={`rgb(${cores[evento.id]})`} text={evento.nome} />
                </li>
              );
            })}
          </ul>
        );
      }


      return null;
    };







    return (
      <div>
        <ConfigProvider
          theme={{
            components: {
              colorPrimary: '#9986BD',
              colorLink: '#35225F',
              colorLinkHover: '#35225F',
              algorithm: true, // Enable algorithm
            },
          }}
        >
          <Calendar

            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
          />
        </ConfigProvider>
      </div>
    );
  };
}
export default CalendarComponent;
