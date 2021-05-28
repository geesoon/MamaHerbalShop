<template>
  <div class="add-product-container">
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
    <section class="add-product-form-container">
      <section class="edit-product-info">
        <label for="edit-product-name-field">Product Name</label>
        <input
          type="text"
          placeholder="product name"
          v-model="name"
          class="edit-product-name-field"
        />
        <label for="edit-product-intake-price">Intake Price</label>
        <div class="edit-product-price">
          <input
            id="edit-product-intake-price"
            type="number"
            placeholder="intake price"
            v-model="intakePrice"
            class="edit-product-price-field"
          />
          <h4 class="kg">/kg</h4>
        </div>
        <label for="edit-product-selling-price">Selling Price</label>
        <div class="edit-product-price">
          <input
            type="number"
            placeholder="selling price"
            v-model="sellingPrice"
            class="edit-product-price-field"
            id="edit-product-selling-price"
          />
          <h4 class="kg">/kg</h4>
        </div>
        <div class="profit">
          <h4>Profit: {{ calculateProfit }}</h4>
        </div>
      </section>
    </section>

    <button class="add-save-btn"><h4>Save</h4></button>
    <button class="add-discard-btn" @click="closeDialog()">
      <h4>Discard</h4>
    </button>
  </div>
</template>

<script>
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
  },
  methods: {
    closeDialog() {
      this.$emit("closeAddDialog");
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
  max-width: 80%;
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
  width: 100%;
  height: 100vh;
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
}

@media only screen and (min-width: 600px) {
  /* For tablet: */
  .image-upload-label,
  .add-product-form-container,
  .add-save-btn,
  .add-discard-btn {
    width: 60%;
  }
}
@media only screen and (min-width: 1440px) {
  /* For tablet: */
  .image-upload-label,
  .add-product-form-container,
  .add-save-btn,
  .add-discard-btn {
    width: 50%;
  }
}
</style>
