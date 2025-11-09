import { useState } from 'react';
import Navbar from '../components/Navbar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import toast, { Toaster } from 'react-hot-toast';

const Agendamentos = () => {

  // Crebi os agendamentos eu chamei de eventos e é aqui que vc vai puxar os dados do bd pra exibir
  // o id é importante pra que ele exiba os agendamentos de maneira correta :D
  const [eventos, setEventos] = useState([
    {
      id:'1',
      title: 'Corutney',
      start: '2025-11-12T09:30:00',
      observacao: 'Corte - Tape Fade',
      colaborador: 'Nome do Colaborador',
      cliente: 'Nome do Cliente',
      telefone: '5575999036694'
    },
  ]);

  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // Adicionar evento
  const [modalAberto, setModalAberto] = useState(false);


  // 🔹 Clique em uma data (sem evento)
  const handleDateClick = (info) => {
    const evento = eventos.find((e) => e.start.startsWith(info.dateStr));
    if (evento) {
      setEventoSelecionado(evento);
    } else {
      toast('Nenhum agendamento nesta data!', {
        icon: '📅',
        style: {
          borderRadius: '8px',
          background: '#fff',
          color: '#333',
        },
      });
    }
  };

  // 🔹 Clique em um evento do calendário
  const handleEventClick = (info) => {
  console.log("Evento clicado:", info.event.title);
  const eventoClicado = {
    title: info.event.title,
    start: info.event.startStr,
    ...info.event.extendedProps,
  };
  setEventoSelecionado(eventoClicado);
};


  return (
    <main className='flex w-screen h-screen overflow-x-hidden overflow-y-auto'>
      <Navbar />

      <Toaster position="top-center" />

      <div className="p-6 w-screen">
        <div id='filtros e info'>
          <h2 className='font-bold'>Agendamentos</h2>
          <div className='flex mb-3 mt-3 justify-end font-semibold'>
            <div className='flex gap-2 text-sm'>
              <button className='flex p-2 border border-gray-900 rounded-md gap-2 hover:bg-gray-800 hover:text-orange-50 hover:border-none'>
                <i className="bi bi-clipboard-data"></i>Relatórios
              </button>
              <button className='bg-orange-600 flex gap-2 text-gray-50 p-2 rounded-md hover:bg-orange-700'
                onClick={() => setModalAberto(true)}
              >
                <i className="bi bi-plus"></i>Novo Agendamento
              </button>
            </div>
          </div>
        </div>

        {/* Calendário */}
        <div className='h-[70vh] relative z-10'>
          <FullCalendar
            locale={ptBrLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridDay,dayGridMonth",
            }}
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              day: 'Dia'
            }}
            height="100%"
            fixedWeekCount={false}
            selectable={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDidMount={(info) => {
              info.el.style.cursor = "pointer";
            }}
            events={eventos}

            // edição do evento no calendário
            eventContent={(arg) => (
            <div className="p-1">
              <p className="font-bold text-xs text-orange-700">{arg.event.title}</p>
              <p className="text-[11px] text-gray-700">{arg.event.extendedProps.observacao}</p>
            </div>
            )}
          />
        </div>

        {/* Modal de Novo Agendamento */}
        {modalAberto &&(
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-lg shadow-lg p-6 w-[480px]'>

              {/* Título e Botão de Saída */}
              <div className='flex justify-between mb-2'>
                <h2 className='font-bold text-xl'>Novo Agendamento</h2>
                <button onClick={() => setModalAberto(null)}>
                  <i className="bi bi-x-circle-fill text-orange-600 text-xl"></i>
                </button>
              </div>

              {/* Dados do Cliente */}
              <div className='border border-gray-400 border-md p-2 mb-2 rounded-md'>
                <h3 className='font-bold text-gray-600'>Insira o Nome do Cliente</h3>
                {/* Input */}
                <input 
                  type='text'
                  placeholder='Nome do Cliente'
                  className="border w-full border-gray-400 rounded-md p-2 text-xs focus:outline-none focus:border-orange-600"
                />
              </div>

              <div className='border border-gray-400 border-md p-2 mb-2 rounded-md'>
                <h3 className='font-bold text-gray-600'>Data e Horário</h3>
                  {/* Input */}
                  <input 
                    type='date'
                    placeholder='__/__/_____'
                    className="border mb-1 w-full border-gray-400 rounded-md p-2 text-xs focus:outline-none focus:border-orange-600"
                  />
                  {/* Input */}
                  <input 
                    type='time'
                    placeholder='00:00'
                    className='border w-full border-gray-400 rounded-md p-2 text-xs focus:outline-none focus:border-orange-600'
                  />
              </div>

              {/* Procedimento */}
              <div className='border border-gray-400 border-md p-2 mb-2 rounded-md'>
                <h3 className='font-bold text-gray-600'>Procedimento</h3>
                {/* Input */}
                <input 
                  type='text'
                  placeholder='Procedimento'
                  className="border w-full border-gray-400 rounded-md p-2 text-xs focus:outline-none focus:border-orange-600"
                />
              </div>

              {/* Salvar */}
              <div className='flex items-center justify-center'>
                <button className='rounded-md bg-green-600 p-2 flex text-orange-50 hover:bg-green-700'>
                  <i class="bi bi-floppy"></i>
                  Salvar Agendamento
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Visualização de Agendamento que já existe */}
        {eventoSelecionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">

              {/* Título Cliente */}
              <div className='flex justify-between mb-4'>
                <div className='flex gap-3'>
                  <img src='/src/imgs/pfp4.png' width='48px' alt='Profile'/>
                  <h2 className="text-xl font-bold text-black">{eventoSelecionado.cliente}</h2>
                </div>
                <button onClick={() => setEventoSelecionado(null)}>
                  <i className="bi bi-x-circle-fill text-orange-600 text-xl"></i>
                </button>
              </div>

              {/* Data e Horário */}
              <div className='border border-gray-500 mb-2 p-2 rounded-md'>
                <h3 className='font-bold'>Data e Horário</h3>
                <p className='mb-2 text-gray-700 text-sm'>
                  {new Date(eventoSelecionado.start).toLocaleDateString('pt-BR')}
                </p>
                <p className='text-gray-700 text-sm'>
                  {new Date(eventoSelecionado.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Informações do Procedimento */}
              <div className='border border-gray-500 mb-2 p-2 rounded-md'>
                <h3 className='font-bold'>Procedimento</h3>
                <p className='text-gray-700 text-sm'>{eventoSelecionado.observacao}</p>
              </div>

              {/* Informações do Colaborador */}
              <div className='border border-gray-500 mb-2 p-2 rounded-md'>
                <h3 className='font-bold'>Colaborador Responsável</h3>
                <p className="text-sm text-gray-500 mt-1">👤 {eventoSelecionado.colaborador}</p>
              </div>

              {/* Botões de Ação */}
              <div className='flex justify-between'>
                <button className='flex gap-2 text-sm p-3 rounded-md bg-orange-600 text-orange-50 hover:bg-orange-700'
                   onClick={() => {
                    const numero = eventoSelecionado.telefone; // 👈 vem do BD
                    const msg = `Olá, ${eventoSelecionado.cliente}! Seu agendamento de ${eventoSelecionado.observacao} está marcado para ${new Date(eventoSelecionado.start).toLocaleDateString('pt-BR')} às ${new Date(eventoSelecionado.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}. ✅`;
                    const link = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
                    window.open(link, '_blank');
                  }}
                >
                  <i className="bi bi-whatsapp"></i>
                  Enviar Mensagem
                </button>
                <button className='flex gap-2 text-sm p-3 rounded-md border-2 border-gray-700'>
                  <i className="bi bi-three-dots-vertical"></i>
                  Editar Informações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Agendamentos;
