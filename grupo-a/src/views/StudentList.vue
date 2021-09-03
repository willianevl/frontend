<template>
  <v-container>
    <h1>Listagem de alunos</h1>

    <v-card id="card">
      <v-card-title>
        <v-row cols="12">
          <v-col md="10">
            <v-text-field
              v-model="search"
              label="Registro Acadêmico do Aluno"
              append-icon="mdi-magnify"
              single-line
              hide-details
              color="#00acb4"
            ></v-text-field>
          </v-col>
          <v-col md="2">
            <v-btn 
              dark 
              to="/student/create" 
              color="#383738" 
              id="btn"
            >Cadastrar Aluno</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table 
        :headers="headers" 
        :items="students" 
        :search="search"
      >
        <template v-slot:cpf="{ item }">
          <span>{{ item.cpf | formatCPF }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <span>
            <v-btn color="#00acb4" text link :to="`/student/edit/${item.ra}`">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
            <v-btn color="#D91F3D" text @click="confirmDelete(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </span>
        </template>
      </v-data-table>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Confirma a exclusão?</v-card-title>
          <v-card-text>{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#00acb4" text @click="deleteStudent()">Confirmar</v-btn>
            <v-btn color="#D91F3D" text @click="dialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      message: "",
      dialog: false,
      currentStudent: null,
      headers: [
        {
          text: "RA",
          align: "start",
          filterable: true,
          value: "ra"
        },
        { text: "Nome", value: "name", filterable: true },
        { text: "CPF", value: "cpf", filterable: true },
        { text: "Email", value: "email", filterable: true },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      students: []
    };
  },
  methods: {
    loadStudents() {
      axios
        .get(`http://localhost:3000/student`)
        .then(response => console.log(this.students = response.data));
    },
    confirmDelete(item) {
      this.message = `Confirma a exclusão do aluno "${item.name}"?`;
      this.dialog = true;
      this.currentStudent = item;
    },
    deleteStudent() {
      axios
        .delete(`http://localhost:3000/student/${this.currentStudent.ra}`, {
          ra: this.currentStudent.ra
        })
        .then(response => {
          if (response.status === 200) {
            this.loadStudents();
          }
          this.dialog = false;
        });
    }
  },
  mounted() {
    this.loadStudents();
  },
  filters: {
    formatCPF(value) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }
  }
};
</script>

<style scoped>
#card{
  margin-top: 20px;
}

#btn {
  margin-top: 12px;
}
</style>