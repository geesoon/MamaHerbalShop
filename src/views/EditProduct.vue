<template>
  <div class="edit-product-container">
    <Header />
    <img
      class="edit-product-picture"
      src="https://secure.ap-tescoassets.com/assets/MY/103/9555117007103/ShotType1_540x540.jpg"
      :alt="getEditProduct.name"
    />
    <section class="edit-product-info">
      <label for="edit-product-name-field">Product Name</label>
      <input
        type="text"
        :placeholder="getEditProduct.name"
        v-model="name"
        class="edit-product-name-field"
      />
      <label for="edit-product-intake-price">Intake Price</label>
      <div class="edit-product-price">
        <input
          type="number"
          :placeholder="formatPrice(getEditProduct.intakePrice)"
          v-model="intakePrice"
          class="edit-product-price-field"
          id="edit-product-intake-price"
        />
        <h6 class="kg">/kg</h6>
      </div>
      <label for="edit-product-selling-price">Selling Price</label>
      <div class="edit-product-price">
        <input
          type="number"
          :placeholder="formatPrice(getEditProduct.sellingPrice)"
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
    <button class="edit-save-btn"><h5>Save</h5></button>
    <button class="edit-discard-btn" @click="closeDialog()">
      <h5>Discard</h5>
    </button>
    <button class="remove-product-btn" @click="showConfirmationPrompt = true">
      <span class="material-icons"> delete </span>
    </button>

    <div class="confirmation-mask" v-if="showConfirmationPrompt"></div>
    <div class="confirmation-prompt" v-if="showConfirmationPrompt">
      <h4>Confirm Remove This Product?</h4>
      <div class="confirmation-btn-bar">
        <button class="confirm-remove-btn" @click="confirmRemoveProduct()">
          <h5>Confirm</h5>
        </button>
        <button
          class="cancel-remove-btn"
          @click="showConfirmationPrompt = false"
        >
          <h5>Cancel</h5>
        </button>
      </div>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="base-wave"
    >
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  data: () => {
    return {
      name: "",
      intakePrice: "",
      sellingPrice: "",
      showConfirmationPrompt: false,
    };
  },
  components: {
    Header,
  },
  computed: {
    getEditProduct() {
      return this.$store.getters.getEditProduct;
    },
    calculateProfit() {
      return `RM${(
        parseFloat(this.getEditProduct.sellingPrice) -
        parseFloat(this.getEditProduct.intakePrice)
      ).toFixed(2)}`;
    },
  },
  methods: {
    closeDialog() {
      this.$router.go(-1);
    },
    confirmRemoveProduct() {
      this.showConfirmationPrompt = false;
      console.log("Confirm remove the product");
    },
    formatPrice(amount) {
      return `RM ${parseFloat(amount).toFixed(2)}`;
    },
  },
};
</script>

<style>
.confirmation-mask {
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.8;
  z-index: 3;
  position: fixed;
}

.confirmation-prompt {
  position: fixed;
  top: 30%;
  width: 90%;
  background: white;
  border: 2px solid var(--primary);
  z-index: 4;
  padding: 1rem;
}

.confirmation-btn-bar {
  margin: 1rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.confirm-remove-btn {
  background: var(--danger);
}

.cancel-remove-btn {
  background: var(--primary);
}

.confirm-remove-btn,
.cancel-remove-btn {
  color: white;
  border-radius: 1rem;
  width: 50%;
  padding: 1rem;
  margin: 1rem 0rem;
}

.edit-product-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0rem 1rem;
}

.edit-product-picture {
  height: 250px;
  width: auto;
}

.edit-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 2rem 0rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 5px 5px var(--accent);
  padding: 2rem;
  border: 0.5px solid var(--accent);
}

.edit-product-price-field,
.edit-product-name-field {
  width: 80%;
  border: 2px solid var(--primary);
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  color: var(--primary);
  font-size: 1.3rem;
  font-weight: bold;
}

.kg {
  width: 15%;
  text-align: right;
}

.edit-product-price-field::placeholder,
.edit-product-price-field::-moz-placeholder,
.edit-product-price-field::-ms-placeholder,
.edit-product-name-field::placeholder,
.edit-product-name-field::-moz-placeholder,
.edit-product-name-field::-ms-placeholder {
  color: var(--primary);
  font-size: 1.3rem;
  font-weight: bold;
}

.edit-product-price {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.profit {
  width: 100%;
  text-align: left;
  margin: 1rem 0rem;
}

.edit-save-btn,
.edit-discard-btn {
  width: 90%;
  color: white;
  margin: 0.5rem 0rem;
  padding: 0.5rem;
  border-radius: 1rem;
}

.remove-product-btn {
  border-radius: 100%;
  background: var(--accent);
  padding: 1rem;
}

.edit-save-btn,
.add-save-btn {
  background: var(--primary);
}

.edit-discard-btn,
.add-discard-btn {
  background: var(--danger);
}

.remove-product-btn {
  margin: 1rem 0rem;
}

@media only screen and (min-width: 600px) {
  /* For tablet: */
  .edit-product-info {
    width: 80%;
    background: white;
  }
}
@media only screen and (min-width: 768px) {
  /* For desktop: */
  .edit-product-info {
    width: 50%;
  }
  .edit-save-btn,
  .edit-discard-btn {
    width: 50%;
  }

  .confirmation-prompt {
    width: 50%;
  }
}

@media only screen and (min-width: 1440px) {
  /* For desktop: */
  .edit-save-btn,
  .edit-discard-btn {
    width: 20%;
  }
}
</style>
