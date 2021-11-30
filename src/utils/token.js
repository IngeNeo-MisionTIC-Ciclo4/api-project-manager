import jwt from 'jsonwebtoken';

const validarToken = (token) => {
	//Se valida si viene el token
	if (token) {
		//Se valida el token con la llave secreta
		const verification = jwt.verify(token, 'secret', (err, data) => {
			//Se retorna la data si es correcto el token
			if (data) {
				return {
					data: data,
				};
			}
			//Se retorna el error si no es correcto el token
			if (err) {
				return {
					error: err,
				};
			}
		});
		console.log(verification, token);
		return verification;
	}
};

const generarToken = (payload) => {
	//Se genera un token y se determina el tipo de expiración en 1 día
	return jwt.sign(payload, 'secret', {
		expiresIn: '24h',
	});
};

export { generarToken, validarToken };