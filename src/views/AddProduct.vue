<template>
  <div class="add-product-container">
    <Header />
    <div class="image-upload" v-if="image == ''">
      <div class="image-upload-label">Upload an image<br />or take a photo</div>
      <input
        type="file"
        id="product-image-upload"
        name="img"
        accept="image/*"
        @change="onFileChange"
      />
    </div>
    <div v-else class="preview-image-container">
      <img :src="image" class="preview-image" />
      <button @click="removeImage" class="remove-image-btn">
        <span class="material-icons"> highlight_off </span>
      </button>
    </div>
    <section class="edit-product-info">
      <label for="edit-product-name-field">Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        v-model="name"
        class="edit-product-name-field"
      />
      <label for="edit-product-intake-price">Intake Price</label>
      <div class="edit-product-price">
        <input
          id="edit-product-intake-price"
          type="number"
          placeholder="Intake price"
          v-model="intakePrice"
          class="edit-product-price-field"
        />
        <h6 class="kg">/kg</h6>
      </div>
      <label for="edit-product-selling-price">Selling Price</label>
      <div class="edit-product-price">
        <input
          type="number"
          placeholder="Selling price"
          v-model="sellingPrice"
          class="edit-product-price-field"
          id="edit-product-selling-price"
        />
        <h6 class="kg">/kg</h6>
      </div>
      <div class="profit">
        <h5>Profit: {{ calculateProfit }}</h5>
      </div>
    </section>

    <button class="add-save-btn" @click="addProduct()"><h5>Save</h5></button>
    <button class="add-discard-btn" @click="closeDialog()">
      <h5>Discard</h5>
    </button>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="base-wave"
    >
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,192L48,202.7C96,213,192,235,288,245.3C384,256,480,256,576,240C672,224,768,192,864,160C960,128,1056,96,1152,69.3C1248,43,1344,21,1392,10.7L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
    <Loader v-if="isLoading" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import firebase from "firebase";
import Loader from "@/components/Loading.vue";

export default {
  data: () => {
    return {
      isLoading: false,
      name: "",
      intakePrice: "",
      sellingPrice: "",
      image: "",
    };
  },
  components: {
    Loader,
    Header,
  },
  computed: {
    calculateProfit() {
      if (this.intakePrice == "" || this.sellingPrice == "") {
        return "RM 0.00";
      }
      return `RM${(
        parseFloat(this.sellingPrice) - parseFloat(this.intakePrice)
      ).toFixed(2)}`;
    },
  },
  methods: {
    closeDialog() {
      this.$router.go(-1);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.image = "";
    },
    validateForm() {
      var number = /^[0-9]+$/;
      if (
        this.name == "" ||
        this.sellingPrice == "" ||
        this.intakePrice == ""
      ) {
        return false;
      } else if (
        this.sellingPrice.match(number) ||
        this.intakePrice.match(number)
      ) {
        return true;
      }
    },
    addProduct() {
      if (this.validateForm()) {
        alert(this.image);
        this.isLoading = true;
        const db = firebase.firestore();
        db.collection("products")
          .add({
            picture: this.image,
            name: this.name,
            intakePrice: this.intakePrice,
            sellingPrice: this.sellingPrice,
          })
          .then(() => {
            console.log("Document successfully written products");
            this.isLoading = false;
            this.$router.replace({ name: "home" });
          })
          .catch((err) => {
            alert("Fail to write to collection - products", err);
            this.isLoading = false;
          });
      } else {
        alert(
          "1. Only accept numbers for intake or selling price. 2. Product name cannot be empty."
        );
      }
    },
  },
};
</script>

<style>
.remove-image-btn {
  padding: 1rem;
  margin: 0.5rem 0rem;
  background: transparent;
}

.remove-image-btn > span {
  font-size: 40px;
}

.preview-image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.preview-image {
  max-width: 50%;
  border-radius: 1rem;
}

.image-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;
}

.image-upload-label {
  position: absolute;
  font-size: 1.3rem;
  width: 90%;
  background: var(--accent);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  text-align: center;
}

#product-image-upload {
  opacity: 0;
  padding: 2rem;
  height: 200px;
}

.add-product-container {
  margin: 0rem 1rem 4rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.add-save-btn,
.add-discard-btn {
  width: 90%;
  color: white;
  margin: 0.5rem 0rem;
  padding: 0.5rem;
  border-radius: 1rem;
}

@media only screen and (min-width: 600px) {
  /* For tablet: */
  .image-upload-label,
  .add-product-form-container,
  .add-save-btn,
  .add-discard-btn {
    width: 50%;
  }
}
@media only screen and (min-width: 1440px) {
  /* For tablet: */
  .image-upload-label,
  .add-product-form-container {
    width: 50%;
  }

  .add-save-btn,
  .add-discard-btn {
    width: 20%;
  }
}
</style>
