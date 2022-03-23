<template>
  <div class="carousel">
    <button @click="next">See More</button>

    <div class="inner" ref="inner" :style="innerStyles">
      <div class="card" v-for="card in cards" :key="card">
        {{ card }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: "Carousel",
  data() {
    return {
      cards: [1, 2, 3, 4, 5, 6, 7, 8],
      innerStyles: {},
      step: "",
      transitioning: false,
    };
  },
  mounted() {
    this.setStep();
    this.resetTranslate();
  },
  methods: {
    setStep() {
      const innerWidth = this.$refs.inner.scrollWidth;
      const totalCards = this.cards.length;
      this.step = `${innerWidth / totalCards}px`;
    },
    next() {
      if (this.transitioning) return;
      this.transitioning = true;
      this.moveLeft();
      this.afterTransition(() => {
        const card = this.cards.shift();
        this.cards.push(card);
        this.resetTranslate();
        this.transitioning = false;
      });
    },

    moveLeft() {
      this.innerStyles = {
        transform: `translateX(-${this.step})
                    translateX(-${this.step})`,
      };
    },
    moveRight() {
      this.innerStyles = {
        transform: `translateX(${this.step})
                    translateX(-${this.step})`,
      };
    },
    afterTransition(callback) {
      const listener = () => {
        callback();
        this.$refs.inner.removeEventListener("transitionend", listener);
      };
      this.$refs.inner.addEventListener("transitionend", listener);
    },
    resetTranslate() {
      this.innerStyles = {
        transition: "none",
        transform: `translateX(-${this.step})`,
      };
    },
  },
};
</script>

<style>
.carousel {
  width: 170px;
  overflow: hidden;
}
.inner {
  transition: transform 0.2s;
  white-space: nowrap;
}
.card {
  width: 40px;
  margin-right: 10px;
  display: inline-flex;
  /* optional */
  height: 40px;
  background-color: #39b1bd;
  color: white;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
}
/* optional */
button {
  margin-right: 5px;
  margin-top: 10px;
}
</style>