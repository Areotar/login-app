import { useState } from "react";

export default function Login({ setMessage }) {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [reg, setReg] = useState({
        nombre: "",
        email: "",
        password: "",
        edad: 0,
        ciudad: "",
        intereses: [],
        ofertas: false,
    });

    const handleChange = (event, field) => {
        setData({
            ...data,
            [field]: event.target.value
        });
    }

    const handleR = (event, field) => {
        setReg({
            ...reg,
            [field]: event.target.value
        });
    }

    const handleCheckBox = (event) => {
        console.log(event.target.value)
        const val = event.target.value  === "on" ? true : false;
        console.log(val)
        setReg({
            ...reg,
            "ofertas": val
        });
    };

    const handleClick = () => {
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                if (responseData.token) {
                    localStorage.setItem('response.token', responseData.token);
                    setMessage(`¡Inicio de sesión exitoso! Bienvenido.`);
                }
            })
            .catch(error => {
                setMessage("Error: usuario o contraseña incorrectos.");
                console.log(error)
            });
    };



    const handleReg = () => {
        fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reg)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                if (responseData.token) {
                    localStorage.setItem('response.token', responseData.token);
                    setMessage(`¡Creacion de usuario exitosa! Bienvenido.`);
                }
            })
            .catch(error => {
                setMessage("Error, datos incorrectos.");
                console.log(error)
            });
    };

    return (
        <>
            <div>
                <label>Correo: </label>
                <input type="text" onChange={(event) => handleChange(event, "email")} />
            </div>
            <div>
                <label>Contrseña: </label>
                <input type="password" onChange={(event) => handleChange(event, "password")} />
            </div>
            <button onClick={handleClick}>Iniciar Sesion</button>

            <hr></hr>

            <div>
                <label>Nombre: </label>
                <input
                    type="text"
                    value={reg.nombre}
                    onChange={(event) => handleR(event, "nombre")}
                />
            </div>
            <div>
                <label>Correo: </label>
                <input
                    type="email"
                    value={reg.email}
                    onChange={(event) => handleR(event, "email")}
                />
            </div>
            <div>
                <label>Contraseña: </label>
                <input
                    type="password"
                    value={reg.password}
                    onChange={(event) => handleR(event, "password")}
                />
            </div>
            <div>
                <label>Edad: </label>
                <input
                    type="number"
                    value={reg.edad}
                    onChange={(event) => handleR(event, "edad")}
                />
            </div>
            <div>
                <label>Ciudad: </label>
                <input
                    type="text"
                    value={reg.ciudad}
                    onChange={(event) => handleR(event, "ciudad")}
                />
            </div>
            <div>
                <label>Intereses: </label>
                <input
                    type="text"
                    value={reg.intereses}
                    onChange={(event) => handleR(event, "intereses")}
                />
            </div>
            <div>
                <label>¿Te gustaría recibir ofertas?: </label>
                <input
                    type="checkbox"
                    onChange={(event) => handleCheckBox(event)}
                />
                <button onClick={handleReg}>Crear usuario</button>
            </div>
        </>
    )
}
