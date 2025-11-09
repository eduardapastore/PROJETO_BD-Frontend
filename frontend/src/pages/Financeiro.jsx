import React from 'react'
import Navbar from '../components/Navbar'

// essa página vai ter só output, não tem nada pra inserir dado aqui
// só fzr o cálculo e mostrar

const Financeiro = () => {
  return (
    <main className='flex w-screen h-screen overflow-x-hidden overflow-y-auto'>
        <Navbar />
        <div className='p-6 flex w-screen gap-2'>
            {/* esquerda 2/3 */}
                <div className='w-2/3'>
                    <p className='mb-2'>Lucro total do mês</p>
                    {/* Output nos dois dessa div */}
                    <div className='flex gap-2 items-baseline mb-3'>
                        <h1 className='text-4xl'>R$120,00</h1>
                        <p className='text-gray-600 text-xs'><span className='text-green-600 font-bold'>12%</span> a mais do que o mês passado</p>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='p-2'>
                            <p className='text-xs font-semibold mb-6'>Ganhos</p>

                            {/* Output */}
                            <h3 clasName='text-2xl'>R$120,00</h3>
                            <div className='flex justify-between'>
                                {/* Output */}
                                <p>Aumento de</p>

                                {/* Ouput */}
                                <p>20%</p>
                            </div>
                        </div>

                    </div>
                </div>
            {/* direita 1/3 */}
                <div className='w-1/3'>
                    Teste
                </div>

        </div>
    </main>
  )
}

export default Financeiro