const baseUrl = "http://localhost:3000";

// --------------------------------------------------------------------//
//                                                                     //
// ----------------------- Métodos do Aluno ---------------------------//
//                                                                     //
// --------------------------------------------------------------------//

// Função para criar um novo aluno
function createStudent() {
  const studentDialog = document.getElementById("student-modal");
  studentDialog.showModal();

  const modalTitle = document.querySelector(".student-modal-title");

  if (!modalTitle || modalTitle.innerText !== "Novo Aluno") {
    const studentHeader = document.getElementById("student-header");
  
    if (!modalTitle) {
      const title = document.createElement("h3");
      title.classList.add("student-modal-title");
      title.innerText = "Novo Aluno";
      studentHeader.appendChild(title);
    } else {
      modalTitle.innerText = "Novo Aluno";
    }
  }
  
}


// Função assíncrona para salvar dados do aluno no servidor (cria ou atualiza)
async function saveStudentModal(event) {
  event.preventDefault();
  try {
    const nome = document.getElementById("nome-aluno").value;
    const matricula = document.getElementById("matricula").value;
    const curso = document.getElementById("curso").value;

    const data = {
      nome,
      matricula,
      curso,
    };

    const idStudent = document.getElementById("id-aluno").value;
    const title = document.querySelector(".student-modal-title");
    let typeMethod, url;
    if (title.innerText === "Novo Aluno") {
      typeMethod = "POST";
      url = baseUrl + "/alunos";
    } else {
      typeMethod = "PUT";
      url = baseUrl + `/alunos/${idStudent}`;
    }

    await fetch(url, {
      method: typeMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("Erro ao salvar aluno: " + error.message);
  }
}

// Função para fechar o modal do aluno
function closeStudentModal() {
  const studentDialog = document.getElementById("student-modal");
  studentDialog.close();
}

// Função assíncrona para deletar um aluno pelo ID
async function deleteStudent(id) {
  try {
    await fetch(baseUrl + `/alunos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Erro ao tentar apagar aluno");
  }
}

// Função assíncrona para editar um aluno pelo ID
async function editStudent(id) {
  const studentDialog = document.getElementById("student-modal");
  studentDialog.showModal();

  const modalTitle = document.querySelector(".student-modal-title");
  if (!modalTitle) {
    const studentHeader = document.getElementById("student-header");
    const title = document.createElement("h3");
    title.classList.add("student-modal-title");
    title.innerText = "Editar Aluno";
    studentHeader.appendChild(title);
  }
  try {
    const response = await fetch(baseUrl + `/alunos/${id}`);
    const data = await response.json();
    const inputIdStudent = document.getElementById("id-aluno");
    const inputNameStudent = document.getElementById("nome-aluno");
    const inputRegistration = document.getElementById("matricula");
    const inputCourse = document.getElementById("curso");

    inputIdStudent.value = data.id;
    inputNameStudent.value = data.nome;
    inputRegistration.value = data.matricula;
    inputCourse.value = data.curso;

    dataUpdate = {
      nome: inputNameStudent.value,
      matricula: inputRegistration.value,
      curso: inputCourse.value,
    };
  } catch (error) {
    alert("Erro ao tentar editar aluno: " + error.message);
  }
}

// Função assíncrona para listar os alunos do servidor ao carregar a página
(async () => {
  try {
    const response = await fetch(baseUrl + "/alunos");
    const data = await response.json();
    const studentList = document.getElementById("student-list");

    data.forEach((student) => {
      const studentTR = document.createElement("tr");

      const studentName = document.createElement("td");
      studentName.innerText = student.nome;

      const studentRegistration = document.createElement("td");
      studentRegistration.innerText = student.matricula;

      const studentCourse = document.createElement("td");
      studentCourse.innerText = student.curso;

      const studentButtons = document.createElement("td");
      studentButtons.classList.add("table_buttons");

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button", "button--danger");
      deleteButton.innerText = "Apagar";
      deleteButton.onclick = () => {
        deleteStudent(student.id);
      };

      const editButton = document.createElement("button");
      editButton.classList.add("button", "button--success");
      editButton.innerText = "Editar";
      editButton.onclick = () => {
        editStudent(student.id);
      };

      studentButtons.appendChild(deleteButton);
      studentButtons.appendChild(editButton);

      studentTR.appendChild(studentName);
      studentTR.appendChild(studentRegistration);
      studentTR.appendChild(studentCourse);
      studentTR.appendChild(studentButtons);

      studentList.appendChild(studentTR);
    });
  } catch (error) {
    alert("Erro na listagem dos alunos: " + error.message);
  }
})();





// --------------------------------------------------------------------//
//                                                                     //
// ----------------------- Métodos da Disciplina ----------------------//
//                                                                     //
// --------------------------------------------------------------------//

// Abre o modal para criar uma nova disciplina
async function createSubject() {
  const disciplineDialog = document.getElementById("discipline-modal");
  disciplineDialog.showModal();

  // Verifica se o título não existe ou não é "Nova Disciplina" para adicionar o título
  const modalTitle = document.querySelector(".discipline-modal__title");

  const desiredText = "Nova Disciplina";
  
  if (!modalTitle) {
    const disciplineHeader = document.getElementById("discipline-header");
    const title = document.createElement("h3");
    title.classList.add("discipline-modal__title");
    title.innerText = desiredText;
    disciplineHeader.appendChild(title);
  } else if (modalTitle.innerText !== desiredText) {
    modalTitle.innerText = desiredText;
  }
  
}

// Salva os dados da disciplina no servidor (cria ou atualiza)
async function saveSubjectModal(event) {
  event.preventDefault();
  try {
    // Obtém os dados do formulário
    const nome = document.getElementById("nome-disciplina").value;
    const cargaHoraria = document.getElementById("carga-horaria").value;
    const professor = document.getElementById("nome-professor").value;
    const status = document.getElementById("status").value;
    const observacoes = document.getElementById("observacoes").value;

    // Cria um objeto com os dados da disciplina
    const data = {
      nome,
      cargaHoraria,
      professor,
      status,
      observacoes,
    };

    // Determina se é um POST (nova disciplina) ou PUT (atualização)
    const idSubject = document.getElementById("id-disciplina").value;
    const title = document.querySelector(".discipline-modal__title");
    let typeMethod, url;
    if (title.innerText === "Nova Disciplina") {
      typeMethod = "POST";
      url = baseUrl + "/disciplinas";
    } else {
      typeMethod = "PUT";
      url = baseUrl + `/disciplinas/${idSubject}`;
    }

    // Envia os dados para o servidor
    await fetch(url, {
      method: typeMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("Erro no salvamento das disciplina", error);
  }
}


// Fecha o modal de disciplina
async function closeSubjectModal(event) { 
  event.preventDefault();
  const disciplineDialog = document.getElementById("discipline-modal");
  disciplineDialog.close();
}


// Deleta uma disciplina pelo ID
async function deleteSubject(id) {
  try {
    await fetch(baseUrl + `/disciplinas/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Erro ao apagar disciplina", error);
  }
}

// Edita uma disciplina pelo ID
async function editSubject(id) {
  const disciplineDialog = document.getElementById("discipline-modal");
  disciplineDialog.showModal();

  // Adiciona o título "Editar Disciplina" se não existir
  const modalTitle = document.querySelector(".discipline-modal__title");
  if (!modalTitle) {
    const disciplineHeader = document.getElementById("discipline-header");
    const title = document.createElement("h3");
    title.classList.add("discipline-modal__title");
    title.innerText = "Editar Disciplina";
    disciplineHeader.appendChild(title);
  }
  try {
    // Obtém os dados da disciplina a ser editada do servidor
    const response = await fetch(baseUrl + `/disciplinas/${id}`);
    const data = await response.json();
    const inputIdSubject = document.getElementById("id-disciplina");
    const inputNameSubject = document.getElementById("nome-disciplina");
    const inputWorkload = document.getElementById("carga-horaria");
    const inputTeacher = document.getElementById("nome-professor");
    const inputStatus = document.getElementById("status");
    const inputObservations = document.getElementById("observacoes");

    // Preenche os campos do formulário com os dados da disciplina
    inputIdSubject.value = data.id;
    inputNameSubject.value = data.nome;
    inputWorkload.value = data.cargaHoraria;
    inputTeacher.value = data.professor;
    inputStatus.value = data.status;
    inputObservations.value = data.observacoes;

    // Cria um objeto com os dados atualizados da disciplina
    const dataUpdate = {
      nome: inputNameSubject.value,
      cargaHoraria: inputWorkload.value,
      professor: inputTeacher.value,
      status: inputStatus.value,
      observacoes: inputObservations.value,
    };
  } catch (error) {
    alert("Erro na edição das disciplina", error);
  }
}

// Função assíncrona que lista as disciplinas do servidor ao carregar a página
(async () => {
  try {
    // Obtém os dados das disciplinas do servidor
    const response = await fetch(baseUrl + "/disciplinas");
    const data = await response.json();
    const subjectList = document.getElementById("subject-list");

    // Para cada disciplina, cria um card com informações e botões de editar/apagar
    data.forEach((subject) => {
      // Cria elementos HTML para exibir os dados da disciplina
      const subjectCard = document.createElement("div");
      subjectCard.classList.add("subject-card");
      // Cria e preenche elementos com os dados da disciplina

      const subjectTitle = document.createElement("h3");
      subjectTitle.classList.add("subject-card__title");
      subjectTitle.innerText = subject.nome;

      const subjectHR = document.createElement("hr");

      const subjectListUl = document.createElement("ul");
      subjectListUl.classList.add("subject-card__list");

      const subjectWorkload = document.createElement("li");
      subjectWorkload.innerText = `Carga horária: ${subject.cargaHoraria}`;

      const subjectTeacher = document.createElement("li");
      subjectTeacher.innerText = `Professor: ${subject.professor}`;

      const subjectStatusSpan = document.createElement("span");
      subjectStatusSpan.innerText = subject.status;
      if (subject.status === "Obrigatória") {
        subjectStatusSpan.classList.add("tag", "tag--danger");
      } else {
        subjectStatusSpan.classList.add("tag", "tag--success");
      }

      const subjectStatus = document.createElement("li");
      subjectStatus.innerText = "Status: ";

      const subjectDescription = document.createElement("p");
      subjectDescription.innerText = subject.observacoes;

      const subjectButtons = document.createElement("div");
      subjectButtons.classList.add("subject-card_buttons");

      // Cria botões de editar e apagar e associa a função correspondente
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button", "button--danger");
      deleteButton.innerText = "Apagar";
      deleteButton.onclick = () => {
        deleteSubject(subject.id);
      };

      const editButton = document.createElement("button");
      editButton.classList.add("button", "button--success");
      editButton.innerText = "Editar";
      editButton.onclick = () => {
        editSubject(subject.id);
      };

      // Adiciona elementos ao card da disciplina
      subjectButtons.appendChild(deleteButton);
      subjectButtons.appendChild(editButton);

      subjectStatus.appendChild(subjectStatusSpan);

      subjectListUl.appendChild(subjectWorkload);
      subjectListUl.appendChild(subjectTeacher);
      subjectListUl.appendChild(subjectStatus);

      subjectCard.appendChild(subjectTitle);
      subjectCard.appendChild(subjectHR);
      subjectCard.appendChild(subjectListUl);
      subjectCard.appendChild(subjectDescription);
      subjectCard.appendChild(subjectButtons);

      // Adiciona o card da disciplina à lista de disciplinas
      subjectList.appendChild(subjectCard);
    });
  } catch (error) {
    alert("Erro na listagem das disciplinas", error);
  }
})();