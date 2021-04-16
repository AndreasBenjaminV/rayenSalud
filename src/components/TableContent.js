import React, { useEffect, useState } from 'react';
import { PostNewTutorial, GetTutorialList } from '../api/ApiProvider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {PositionedSnackbar} from './SnackBar'
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},

	modal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
	iconos: {
		curso: 'pointer'
	},
	inputMaterial: {
		width: '100%'
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	}

}))


export function MakeUserGrid(props) {
	const styles = useStyles();
	const [tutorialList, setData] = useState([]);
	const [modalInsertar, setModalInsertar] = useState(false);
	const [nuevoTutorial, setNuevoTutorial] = useState({
		nombre: '',
		profesor: '',
		materia: '',
		fecha: '',
	})

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setNuevoTutorial(prevState => ({
			...prevState,
			[name]: value
		}))

	}

	const abrirCerrarmodalInsertar = () => {
		setModalInsertar(!modalInsertar);
	}

	const peticionPost = async () => {
		await PostNewTutorial(nuevoTutorial)
			.then(response => {
				// llamar a funcion snack bar cuando API responda
			})

	}
	const peticionGet = async () => {
		await GetTutorialList()
			.then(response => {
				setData(tutorialList.concat(response.data))
			})
	}

	// const validateForm = (nuevoTutorial) => {
	// 	if(nuevoTutorial.nombre || nuevoTutorial.profesor || nuevoTutorial.materia || nuevoTutorial.fecha){
	// 	 console.log('Campos incompletos')
	// 	}
	// 	else {
	// 		peticionPost()
	// 	}	
	// }


	const bodyInsertar = (
		<div className={styles.modal}>
			<h3>Agregar Nuevo Tutorial</h3>
			<TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
			<br />
			<TextField name="profesor" className={styles.inputMaterial} label="Profesor" onChange={handleChange} />
			<br />
			<TextField name="materia" className={styles.inputMaterial} label="Materia" onChange={handleChange} />
			<br />
			<TextField
				id="date"
				label="Fecha"
				type="date"
				defaultValue="2021-04-17"
				className={styles.textField}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<br />
			<br />
			<div align="right">
				<Button color="primary" onClick={peticionPost(nuevoTutorial)}>Insertar</Button>
				<Button onClick={abrirCerrarmodalInsertar}>Vovler</Button>
			</div>
		</div>
	)


	useEffect(async () => {
		await peticionGet();
		const results = tutorialList.filter(tutoriales => { tutoriales.map((tutorial) => tutorial.toLowerCase().includes(searchTerm)) }

		);
		setSearchResults(results);
	}, [searchTerm]);

	return (
		<div>
			<TableContainer>
				<Table>
					<TableBody>
						<div className={styles.search}>
							<InputBase
								placeholder="Search…"
								value={searchTerm}
								onChange={handleSearchChange}
								styles={{
									root: styles.inputRoot,
									input: styles.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
						{tutorialList.map((item) => (
							<TableRow key={item.id}>
								<TableCell>
									<Typography className={styles.title} >
										{item.nombre}
									</Typography>
									<h4>{item.materia}</h4>
								</TableCell>
								<div className={styles.grow} />
								<TableCell>
									<h4>{item.fecha}</h4>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>


			<Button>Eliminar Todos</Button>
			<Fab onClick={abrirCerrarmodalInsertar} color="primary" aria-label="add" className={styles.fab}>
				<AddIcon />
			</Fab>

			{/* completar cuando la API responda */}
			<PositionedSnackbar></PositionedSnackbar>

			<Modal
				open={modalInsertar}
				onClose={abrirCerrarmodalInsertar}>
				{bodyInsertar}
			</Modal>
		</div>
	);
}
