/* tsx se usa para los componentes q se van arenderizar*/
/* ts se usa para los archivos de lógica*/

function requestGet(user: string, password: string): Promise<string> {
  const loginData = {
    email: user,
    password: password,
  };

  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la solicitud de inicio de sesión");
      }
    })
    .then(data => {
      return data.token;
    })
    .catch(error => {
      throw new Error("Error en la solicitud de inicio de sesión");
    });
}

export { requestGet };
