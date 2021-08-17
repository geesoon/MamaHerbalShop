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
        <h4 v-if="progress != ''">{{ Math.round(progress) }}%</h4>
        <button @click="removeImage" class="remove-image-btn">
          <span class="material-icons"> highlight_off </span>
        </button>
      </div>
      <section class="add-product-info">
        <div class="add-product-info-row">
          <h6>Product Name</h6>
          <div class="add-product-name">
            <input type="text" v-model="name" class="add-product-name-field" />
          </div>
        </div>
        <div class="add-product-info-row">
          <h6>Intake Price</h6>
          <div class="add-product-price">
            <div>RM</div>
            <input
              type="number"
              v-model="intakePrice"
              class="add-product-price-field"
            />
            <small>/kg</small>
          </div>
        </div>

        <div class="add-product-info-row">
          <h6>Selling Price</h6>
          <div class="add-product-price">
            <div>RM</div>
            <input
              type="number"
              v-model="sellingPrice"
              class="add-product-price-field"
            />
            <small>/kg</small>
          </div>
        </div>

        <div class="add-product-info-row">
          <h6>Profit:</h6>
          <div class="profit">
            {{ calculateProfit }}
          </div>
        </div>
      </section>
      <button class="primary-btn" @click="addProductPipeline()">
        <h5>Save</h5>
      </button>
      <button class="danger-btn" @click="closeDialog()">
        <h5>Discard</h5>
      </button>
    </section>
  </div>
</template>

<script>
import Product from "@/apis/products.js";
import firebase from "firebase";

export default {
  data: () => {
    return {
      name: "",
      intakePrice: "",
      sellingPrice: "",
      image: "",
      progress: "",
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
      this.image = e.target.files[0];
    },
    removeImage() {
      this.image = "";
    },
    async addProductPipeline() {
      if (this.validateForm()) {
        this.$store.commit("setIsLoading", true);
        this.uploadPic();
      } else {
        alert(
          "1. Only accept numbers for intake or selling price. \n2. Product name cannot be empty."
        );
      }
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
    async uploadPic() {
      var metadata = {
        contentType: this.image.type,
      };
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var uploadTask = storageRef
        .child("productPic/" + this.name)
        .put(this.image, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              alert("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              alert("User canceled the upload");
              break;
            case "storage/unknown":
              alert("Unknown error occurred, inspect error.serverResponse");
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            this.addProduct(url);
          });
        }
      );
    },
    async addProduct(url) {
      let res = await Product.addProduct({
        picUrl: url,
        name: this.name,
        intakePrice: this.intakePrice,
        sellingPrice: this.sellingPrice,
      });

      this.$store.commit("setIsLoading", false);
      if (!res.valid) {
        this.$store.commit("setSnackBar", res.res);
      } else {
        this.$store.commit("setSnackBar", "Added product successfully");
        this.$router.replace({ name: "catalogue" });
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
  width: 100%;
}

.add-product-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1rem;
}

.add-product-container > section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.add-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 1rem 0rem;
}

.add-product-info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0.3rem 0rem;
}

.add-product-info-row > h7 {
  width: 50%;
}

.add-product-name,
.profit,
.add-product-price {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.add-product-price-field,
.add-product-name-field {
  border: 1px solid var(--primary);
  padding: 0.5rem;
  color: var(--primary);
  font-weight: bold;
  width: 90%;
  margin: 0rem 0.5rem;
}

.add-product-price-field::placeholder,
.add-product-price-field::-moz-placeholder,
.add-product-price-field::-ms-placeholder,
.add-product-name-field::placeholder,
.add-product-name-field::-moz-placeholder,
.add-product-name-field::-ms-placeholder {
  color: var(--primary);
  font-weight: bold;
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
