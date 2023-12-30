import { useEffect, useState } from 'react';
import Error from './Error';

const Formulario = ({ Pacientes, setPacientes, Paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [alta, setAlta] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false)

    useEffect(() => {
        if (Object.keys(Paciente).length > 0) {
            setNombre(Paciente.nombre);
            setPropietario(Paciente.propietario);
            setEmail(Paciente.email);
            setAlta(Paciente.alta);
            setSintomas(Paciente.sintomas);
        }
    }, [Paciente])



    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //validación del formulario
        if ([nombre, propietario, email, alta, sintomas].includes('')) {
            setError(true)
            return;
        }
        setError(false);

        //objeto de pacientes
        const objetoPacientes = {
            nombre,
            propietario,
            email,
            alta,
            sintomas
        }

        if (Paciente.id) {
            objetoPacientes.id = Paciente.id;
            const pacientesActualizados = Pacientes.map(pacienteState => pacienteState.id ===

                Paciente.id ? objetoPacientes : pacienteState);
            setPacientes(pacientesActualizados);
            setPaciente({})
        } else {
            //Nuevo Registro
            objetoPacientes.id = generarId();
            setPacientes([...Pacientes, objetoPacientes]);
        }


        setNombre('');
        setPropietario('');
        setEmail('');
        setAlta('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 ml-8 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento
                Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                {error && <Error mensaje='Todos los campos son obligatorios' />}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>

                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>

                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>

                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={alta}
                        onChange={(e) => setAlta(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="síntomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>

                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe Los Síntomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={Paciente.id ? 'Editar paciente' : 'Agregar Paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario
