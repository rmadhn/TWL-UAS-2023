<template>
  <div>
    <Navbar />
    <div>
      <h2 class="mt-2">Tambah Mahasiswa</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="addNama">Nama:</label>
          <input
            type="text"
            id="addNama"
            v-model="addForm.name"
            class="form-control"
            style="max-width: 300px"
            required
          />
        </div>

        <div class="form-group">
          <label for="addNIM">NIM:</label>
          <input
            type="text"
            id="addNIM"
            v-model="addForm.nim"
            class="form-control"
            style="max-width: 300px"
            required
          />
        </div>

        <div class="form-group">
          <label for="addEmail">Email:</label>
          <input
            type="email"
            id="addEmail"
            v-model="addForm.email"
            class="form-control"
            style="max-width: 300px"
            required
          />
        </div>

        <div class="form-group">
          <label for="addGender">Gender:</label>
          <select
            id="addGender"
            v-model="addForm.gender"
            class="form-control"
            style="max-width: 300px"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit" class="btn btn-success">Simpan</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/NavBar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      addForm: {
        nama: "",
        nim: "",
        email: "",
        gender: "",
      },
    };
  },
  methods: {
    submitForm() {
      axios
        .post("https://server-backend-black.vercel.app/mahasiswa", this.addForm)
        .then(() => {
          console.log("Data mahasiswa berhasil ditambahkan");
          this.$router.push("/main");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.btn-success {
  margin-top: 10px;
  background-color: green;
}
</style>
