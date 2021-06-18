<template>
  <div>
    <Drawer />
    <router-view class="main-content" />
  </div>
</template>

<script>
import Drawer from "@/components/Drawer.vue";

export default {
  components: {
    Drawer,
  },
};
</script>

<style>
.add-product-prompt {
  text-align: center;
  padding: 1rem;
  background: var(--accent);
  border-radius: 1rem;
  border: 1px solid var(--accent);
}

#add-fab {
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 5%;
  right: 5%;
  border-radius: 100%;
  color: white;
  background: var(--secondary);
}

.add-fab > span {
  font-size: 40px;
}

.background-mask {
  bottom: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.8;
  position: fixed;
}

.add-product-dialog,
.edit-product-dialog {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  overflow-y: scroll;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
  max-width: 70%;
}

.edit-product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 2rem 0rem;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid var(--accent);
  background: white;
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

  .edit-product-picture {
    height: 500px;
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
