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
      <img :src="previewImage" class="preview-image" />
      <v-progress-linear
        v-if="progress != ''"
        color="primary"
        height="25"
        :buffer-value="100 - formatProgress"
        :value="formatProgress"
        stream
        ><strong>{{ formatProgress }}%</strong></v-progress-linear
      >
      <v-btn @click="removeImage" class="remove-image-btn">
        <span class="material-icons"> highlight_off </span>
      </v-btn>
    </div>
    <v-form class="add-product-info">
      <v-text-field
        type="text"
        v-model="name"
        label="Product Name"
        class="add-product-name-field"
        :rules="[rules.required]"
      />
      <v-text-field
        type="number"
        label="Cost/kg"
        prefix="RM"
        v-model="intakePrice"
        class="add-product-price-field"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Selling Price/kg"
        type="number"
        prefix="RM"
        v-model="sellingPrice"
        class="add-product-price-field"
        :rules="[rules.required]"
      />
      <div class="profit">
        <span>Profit:</span>
        <span> {{ calculateProfit }} </span>
      </div>

      <div class="add-product-actions">
        <v-btn color="primary" @click="addProductPipeline()">
          <h5>Save</h5>
        </v-btn>
        <v-btn color="danger" @click="closeDialog()">
          <h5>Discard</h5>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import Product from "@/apis/products.js";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

export default {
  data: () => {
    return {
      name: "",
      intakePrice: "",
      sellingPrice: "",
      image: "",
      progress: "",
      previewImage: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
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
    formatProgress() {
      return Math.ceil(this.progress);
    },
  },
  methods: {
    closeDialog() {
      this.$router.go(-1);
    },
    onFileChange(e) {
      this.image = e.target.files[0];
      this.previewImage = URL.createObjectURL(this.image);
    },
    removeImage() {
      this.image = "";
      this.previewImage = "";
    },
    async addProductPipeline() {
      if (this.validateForm()) {
        this.$store.commit("setIsLoading", true);
        if (this.image != "") {
          this.uploadPic();
        } else {
          this.addProduct();
        }
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
      var uuid = uuidv4();

      var uploadTask = storageRef
        .child("productPic/" + uuid)
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
    async addProduct(url = "") {
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
/* Product Image */
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
  min-width: 100%;
}

.preview-image {
  max-height: 30vh;
  max-width: 100%;
  width: auto;
  border-radius: 1rem;
}

.image-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
}

.image-upload-label {
  position: absolute;
  font-size: 1.3rem;
  padding: 1rem;
  background: var(--accent);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  text-align: center;
  width: 90%;
}

#product-image-upload {
  opacity: 0;
  padding: 2rem;
  height: 200px;
  width: 90%;
}

/* Add Product Form */
.add-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0rem;
}

.add-product-info > div {
  width: 90%;
}

/* Add Product Actions Button */
.add-product-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  margin: 2rem 0rem;
}

@media only screen and (min-width: 1024px) {
  .add-product-info > div {
    width: 50%;
  }

  .image-upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
  }

  .preview-image-container {
    width: 50%;
  }

  .image-upload-label {
    width: 50%;
  }

  #product-image-upload {
    width: 50%;
  }

  .add-product-actions {
    width: 50%;
  }
}
</style>
