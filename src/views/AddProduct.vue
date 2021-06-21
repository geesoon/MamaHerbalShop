<template>
  <div class="add-product-container">
    <section>
      <div class="image-upload" v-if="image == ''">
        <div class="image-upload-label">
          Upload an image<br />or take a photo
        </div>
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
      <button class="primary-btn" @click="addProduct()"><h5>Save</h5></button>
      <button class="danger-btn" @click="closeDialog()">
        <h5>Discard</h5>
      </button>
    </section>
  </div>
</template>

<script>
// import imagemin from "imagemin";
import Product from "@/apis/products.js";

export default {
  data: () => {
    return {
      name: "",
      intakePrice: "",
      sellingPrice: "",
      image: "",
    };
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
    isLoading() {
      return this.$store.getters.getIsLoading;
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
    optimizeImage() {},
    async addProduct() {
      if (this.validateForm()) {
        this.optimizeImage();
        this.$store.commit("setIsLoading", true);
        let res = await Product.addProduct({
          picture: this.image,
          name: this.name,
          intakePrice: this.intakePrice,
          sellingPrice: this.sellingPrice,
        });
        this.$store.commit("setIsLoading", false);
        if (!res.valid) {
          alert(res.res);
        } else {
          this.$router.replace({ name: "catalogue" });
        }
      } else {
        alert(
          "1. Only accept numbers for intake or selling price. \n2. Product name cannot be empty."
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
  margin-bottom: 1rem;
}

#product-image-upload {
  opacity: 0;
  padding: 2rem;
  height: 200px;
}

.add-product-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.add-product-container > section {
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
  .add-product-form-container {
    width: 50%;
  }

  .add-product-container > section {
    width: 60%;
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
