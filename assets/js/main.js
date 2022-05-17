'use strict'

		const openModel = ()=> document.getElementById('model').classList.add('active')

		const closeModel = ()=> {
			clearFields()
			document.getElementById('model').classList.remove('active')
		}

		const getLocalStorage = ()=> JSON.parse(localStorage.getItem('db_student'))??[]
		const setLocalStorage = (db_student)=> localStorage.setItem('db_student', JSON.stringify(db_student))

		const readStudent = ()=> getLocalStorage()

		const createStudent = (student)=> {
			const db_student = getLocalStorage()
			db_student.push(student)
			setLocalStorage(db_student)
		} 

		const updateStudent = (index, student)=> {
			const db_student = readStudent()
			db_student[index] = student
			setLocalStorage(db_student)
		}


		const deleteStudent = (index)=> {
			const db_student = readStudent()
			db_student.splice(index, 1)
			setLocalStorage(db_student)
		}

		const isValidFields = ()=> {
		   return document.getElementById('form').reportValidity()
		}

		const clearFields = ()=> {
			const fields = document.querySelectorAll('.model-field')
			fields.forEach(field => field.value = "")
		} 

		const saveStudent = ()=>{
			if(isValidFields()){
				const student = {
					code: document.getElementById('code').value,
					nom: document.getElementById('nom').value,
					genre: document.getElementById('genre').value,
					adresse: document.getElementById('adresse').value,
					contact: document.getElementById('contact').value,
					unite: document.getElementById('unite').value,
				}
				//console.log('The Cadastral student: ' + student)
				const index = document.getElementById('code').dataset.index
				if(index == 'new'){
					createStudent(student)
					listStudent()
					closeModel()
				}else{
					updateStudent(index, student)
					listStudent()
					closeModel()
				}
			}
		}


		const createRow = (student, index)=> {
			const newRow = document.createElement('tr')
			newRow.innerHTML = `
				<td>${student.code}</td>
				<td>${student.nom}</td>
				<td>${student.genre}</td>
				<td>${student.adresse}</td>
				<td>${student.contact}</td>
				<td>${student.unite}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Edit</button>
					<button type="button" class="button red" id="delete-${index}">Delete</button>
				</td>
			`
			document.querySelector('#tblStudent>tbody').appendChild(newRow)
		}

		const crearTable = ()=> {
			const rows = document.querySelectorAll('#tblStudent>tbody tr')
			rows.forEach(row => row.parentNode.removeChild(row))
		}

		const listStudent = ()=> {
			const students =  readStudent()
			// console.log(students)
			crearTable()
			students.forEach(createRow)
		}

		const fillFields = (student)=> {
			document.getElementById('code').value = student.code
			document.getElementById('nom').value = student.nom
			document.getElementById('genre').value = student.genre
			document.getElementById('adresse').value = student.adresse
			document.getElementById('contact').value = student.contact
			document.getElementById('unite').value = student.unite

			document.getElementById('code').dataset.index = student.index
		}

		const editStudent = (index)=>{
			const student = readStudent()[index]
			student.index = index
			fillFields(student)
			openModel()
		}

		const editDelete = (event)=>{
			if(event.target.type == 'button'){
				const [action, index] = event.target.id.split('-')
				if(action == 'edit'){
					editStudent(index)
				}else{
					const student = readStudent()[index]
					const response = confirm(`Are you sure to delete the student ${student.name}`)
					if(response){
						deleteStudent(index)
						listStudent()
					}
				}
			}
		}

		listStudent()

		document.getElementById('idStudent').addEventListener('click', openModel)
		document.getElementById('modelClose').addEventListener('click', closeModel)
		document.getElementById('save').addEventListener('click', saveStudent)
		document.getElementById('cancel').addEventListener('click', closeModel)
		document.querySelector('#tblStudent>tbody').addEventListener('click', editDelete)