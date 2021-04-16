import axios from 'axios';

// const baseUrl = 'https://pokeapi.co/api/v2/pokemon/ditto'; API DE PRUEBA MIENTRAS SE CORRIGE LA DE RAYEN SALUD
const baseUrl = 'https://rayentutorialtestapp.azurewebsites.net/';

async function resolve(endPoint, method, data) {
	const finalUrl = baseUrl + endPoint;

	const resolved = {
		status: null,
		data: null,
		error: null
	};


	try {
		var response;
		switch (method) {
			case 'POST':
				response = await axios.post(finalUrl, data);
			  	break;
			case 'GET':
				response = await axios.get(finalUrl);
			  	break;
			case 'DELETE':
				response = await axios.delete(finalUrl, data);
			  	break;
			case 'PUT':
				response = await axios.put(finalUrl, data);
			  	break;

			default:
			  throw new Error('Método no permitido')
		 }
		
		resolved.data = response.data;
		resolved.status = response.status;
			

		console.log(resolved)
	}
	catch (e) {
		console.log('Error de promesa en' + baseUrl + ' DESCRIPCIÓN : ' + e)
	}

	return resolved;
}



export async function GetTutorialList() {
	var method = "GET";
	var endPoint = 'tutorials'
	return await resolve(endPoint, method)
}
export async function PostNewTutorial(data) {
	var method = "POST";
	var endPoint = 'createtutorial'
	return await resolve(endPoint, method, data)
}
export async function DeleteTutorial(id) {
	var method = "DELETE";
	var endPoint = 'deletetutorial/' + id;
	return await resolve(endPoint, method, data)
}
export async function DeleteTutorial(id) {
	var method = "PUT";
	var endPoint = 'updatetutorial/' + id;
	return await resolve(endPoint, method, data)
}

