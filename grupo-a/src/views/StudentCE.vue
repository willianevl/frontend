<template>
  <v-container>
    <h1>Cadastro de Aluno</h1>

    <v-form id="form" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="50"
        :rules="nameRules"
        label="Nome"
        placeholder="Informe o nome completo"
        @blur="validate()"
        required
        color="#00acb4"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        :counter="50"
        placeholder="Informe apenas um e-mail"
        @blur="validate()"
        required
        color="#00acb4"
      ></v-text-field>

      <v-text-field
        v-model="ra"
        :rules="raRules"
        placeholder="Informe o registro acadêmico"
        label="RA"
        :disabled="queryRA !== undefined"
        :counter="10"
        @blur="validate()"
        required
        color="#00acb4"
      ></v-text-field>

      <v-text-field
        v-model="cpf"
        :rules="cpfRules"
        label="CPF"
        :disabled="queryRA !== undefined"
        :counter="11"
        placeholder="Informe o número do documento"
        @blur="validate()"
        required
        color="#00acb4"
      ></v-text-field>
    </v-form>

    <v-btn bottom color="#00acb4"  dark fixed :disabled="!valid"  @click="save" id="btnSave">
      Salvar
    </v-btn>

    <v-btn bottom color="#D91F3D" dark fixed right @click="cancel">
      Cancelar
    </v-btn>

    <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="#D91F3D"
          @click="sheet = !sheet"
        >
          Fechar
        </v-btn>
        <div class="my-3">
          {{ message }}
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ message }}
      <v-btn color="blue" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    message: "",
    sheet: false,
    name: "",
    nameRules: [
      v => !!v || "O Nome do aluno deve ser preenchido.",
      v =>
        (v && v.length <= 50) || "O Nome deve conter menos de 50 caracteres"
    ],
    email: "",
    emailRules: [
      v => !!v || "O E-mail deve ser preenchido.",
      v => /.+@.+\..+/.test(v) || "Informe um e-mail válido"
    ],
    cpf: "",
    cpfRules: [
      v => !!v || "O CPF do aluno deve ser preenchido.",
      v => (v && v.length === 11) || "O CPF deve conter menos de 11 caracteres"
    ],
    ra: "",
    raRules: [
      v => !!v || "O RA do aluno deve ser preenchido.",
      v =>
        (v && v.length > 0 && v.length <= 10) ||
        "O RA do aluno deve conter entre 1 e 10 caracteres"
    ],
    queryRA: undefined,
    snackbar: false
  }),
  methods: {
    validate() {
      if(this.queryRA === undefined){
        this.$refs.form.validate();
      } else {
        this.valid = true;
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.$router.push("/student/list");
    },
    showError(message) {
      this.message = message;
      this.sheet = true;
    },
    loadStudent() {
      if (this.queryRA !== undefined) {
        axios
          .get(`http://localhost:3000/student/${this.queryRA}`)
          .then(response => {
            if (response.status === 200) {
              this.ra = response.data.ra;
              this.name = response.data.name;
              this.email = response.data.email;
              this.cpf = response.data.cpf;
            } else {
              this.showError("Erro ao carregar o registro.");
            }
          });
      }
    },
    save() {
      const data = {
        ra: this.ra,
        name: this.name,
        cpf: this.cpf,
        email: this.email
      };

      if (this.queryRA === undefined) {
        axios.post("http://localhost:3000/student", data).then(response => {
          if (response.status === 200) {
            this.snackbar = true;
            this.message = "Registro salvo com sucesso";
            setTimeout(() => {
              this.$router.push("/student/list");
            }, 1000);
          }
        }).catch(() => this.showError("Erro ao salvar o registro."));
      } else {
        let url = `http://localhost:3000/student/${this.queryRA}`;

        axios.put(url, data).then(response => {
          if (response.status === 200) {
            this.snackbar = true;
            this.message = "Registro salvo com sucesso";
            setTimeout(() => {
              this.$router.push("/student/list");
            }, 2000);
          } else {
            this.showError("Erro ao salvar o registro.");
          }
        });
      }
    }
  },
  created() {
    this.queryRA = this.$route.params.ra;
  },
  mounted() {
    this.loadStudent();
  }
}
</script>

<style scoped>
#btnSave {
  position: fixed;
  bottom: 16px;
  right: 146px;
}

#form{
  margin-top: 20px;
}
</style>