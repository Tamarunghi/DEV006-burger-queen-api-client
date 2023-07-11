/* tsx se usa para los componentes q se van arenderizar*/
/* ts se usa para los archivos de lógica*/

async function requestGet(user: string, password: string): Promise<string> {
    const loginData = {
        email: user,
        password: password,
    };

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });
        if (response.ok) {
            const data = await response.json();
            return data.token;
        } else {
            throw new Error('Error en la solicitud de inicio de sesión');
        }
    } catch (error) {
        throw new Error('Error en la solicitud de inicio de sesión');
    }
}