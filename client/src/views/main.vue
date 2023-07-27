<template>
  <div class="main_container">
    <nav class="navbar">
      <h1>Sistem Informasi</h1>
      <button class="white_btn" @click="handleLogout">Logout</button>
    </nav>
  </div>
  <div>
    <h2 class="title">Daftar Mahasiswa</h2>

    <button @click="goToAddUser" class="btn btn-primary btn-addMHS">
      TambahMhs
    </button>

    <table class="mahasiswa-table">
      <tr>
        <th>Nama</th>
        <th>NIM</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Aksi</th>
      </tr>
      <tr v-for="mahasiswa in mahasiswas" :key="mahasiswa.id">
        <td>{{ mahasiswa.name }}</td>
        <td>{{ mahasiswa.nim }}</td>
        <td>{{ mahasiswa.email }}</td>
        <td>{{ mahasiswa.gender }}</td>
        <td>
          <button @click="editMahasiswa(mahasiswa)" class="btn btn-success">
            Edit
          </button>
          <button
            @click="confirmDeleteMahasiswa(mahasiswa.id)"
            class="btn btn-danger"
          >
            Hapus
          </button>
        </td>
      </tr>
    </table>

    <div v-if="isEditFormVisible" class="overlay">
      <div class="edit-form">
        <h2>Edit Data</h2>

        <form @submit.prevent="updateMahasiswa">
          <div class="form-group">
            <label for="editNama">Nama:</label>
            <input
              type="text"
              id="editNama"
              v-model="editForm.name"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label for="editNIM">NIM:</label>
            <input
              type="text"
              id="editNIM"
              v-model="editForm.nim"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label for="editEmail">Email:</label>
            <input
              type="email"
              id="editEmail"
              v-model="editForm.email"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label for="editGender">Gender:</label>
            <select
              id="editGender"
              v-model="editForm.gender"
              class="form-control"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-success">Simpan</button>
            <button @click="cancelEdit" class="btn btn-secondary">Batal</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NamE",
  data() {
    return {
      mahasiswas: [],
      isEditFormVisible: false,
      editForm: {
        id: null,
        name: "",
        nim: "",
        email: "",
        gender: "",
      },
    };
  },
  mounted() {
    this.fetchMahasiswas();
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      window.location.reload();
    },
    fetchMahasiswas() {
      axios
        .get("https://server-backend-black.vercel.app/mahasiswa")
        .then((response) => {
          this.mahasiswas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editMahasiswa(mahasiswa) {
      this.editForm.id = mahasiswa.id;
      this.editForm.name = mahasiswa.name;
      this.editForm.nim = mahasiswa.nim;
      this.editForm.email = mahasiswa.email;
      this.editForm.gender = mahasiswa.gender;
      this.isEditFormVisible = true;
    },
    updateMahasiswa() {
      const id = this.editForm.id;
      axios
        .put(
          `https://server-backend-black.vercel.app/mahasiswa/${id}`,
          this.editForm
        )
        .then(() => {
          console.log("Data mahasiswa berhasil diperbarui");
          this.isEditFormVisible = false;
          this.fetchMahasiswas();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelEdit() {
      this.isEditFormVisible = false;
    },
    confirmDeleteMahasiswa(id) {
      if (confirm("Apakah Anda yakin ingin menghapus data mahasiswa ini?")) {
        this.deleteMahasiswa(id);
      }
    },
    deleteMahasiswa(id) {
      axios
        .delete(`https://server-backend-black.vercel.app/mahasiswa/${id}`)
        .then(() => {
          this.mahasiswas = this.mahasiswas.filter(
            (mahasiswa) => mahasiswa.id !== id
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToAddUser() {
      this.$router.push({ name: "AddUser" });
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 70px;
  background-color: #3bb19b;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar h1 {
  color: white;
  font-size: 25px;
  margin-left: 20px;
}

.white_btn {
  border: none;
  outline: none;
  padding: 12px 0;
  background-color: white;
  border-radius: 20px;
  width: 120px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin-right: 20px;
}
.mahasiswa-table {
  padding: 10px;
  background-color: #f2f2f2;
}

th,
td {
  padding: 8px;
}

th {
  background-color: #333;
  color: white;
}
.mahasiswa-table {
  width: 100%; /* Set the table width to 100% */
  padding: 10px;
  background-color: #f2f2f2;
  margin: 0 auto;
}

button.btn-addMHS {
  padding: 6px 12px;
  background-color: rgb(7, 44, 231);
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10%;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
}

button.btn-addMHS:hover {
  background-color: rgb(12, 71, 108);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.edit-form {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
}
.title {
  text-align: center; /* Align the title to the center */
}
</style>
