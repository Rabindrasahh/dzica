<template>
  <div>
    <the-navbar></the-navbar>
    <div class="container mt-5">
      <div class="zaatar">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h2>Nawal Zaatar</h2>
              <p class="found">1 results found</p>
            </div>
            <div class="col-md-6 text-right">
              <button class="filter-hide" v-on:click="visible = !visible">
                Show filter <i class="fa fa-filter" aria-hidden="true"></i>
              </button>
              <button class="reset-filter">Reset filter</button>
            </div>
          </div>
        </div>
      </div>

      <div class="left-bar">
        <div class="container">
          <div class="inner-left-bar">
            <div id="sideenav" class="sidenav">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()"
                >&times;</a
              >
              <div class="get-filter">
                <a href="#">Filter by</a>
                <form action="#">
                  <p>
                    <input type="radio" id="test1" name="radio-group" checked />
                    <label for="test1">Price</label>
                  </p>
                  <p>
                    <input type="radio" id="test2" name="radio-group" />
                    <label for="test2">Number of reviews</label>
                  </p>
                  <p>
                    <input type="radio" id="test3" name="radio-group" />
                    <label for="test3">Popularity</label>
                  </p>
                  <p>
                    <input type="radio" id="test4" name="radio-group" />
                    <label for="test4">Most recent</label>
                  </p>
                  <p>
                    <input type="radio" id="test5" name="radio-group" />
                    <label for="test5">Alphabetical order</label>
                  </p>
                </form>
              </div>
              <div class="delivery">
                <a href="#">Fast-delivery</a>
                <div class="new">
                  <form>
                    <div class="form-group">
                      <input type="checkbox" id="html" />
                      <label for="html">Send within 48h</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="price-filter">
                <a href="#">Price</a>
                <div class="new">
                  <form>
                    <div class="form-group">
                      <input type="checkbox" id="dao" />
                      <label for="dao">DA0 - DA500</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="dao2" />
                      <label for="dao2">DA500 - DA2,000</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="dao3" />
                      <label for="dao3">DA2,000 - DA5,000</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="dao4" />
                      <label for="dao4">DA5,000 - DA10,000</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="dao5" />
                      <label for="dao5">DA10,000 - DA100,000</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="average-review">
                <a href="#">Average reviews</a>
                <div class="new">
                  <form>
                    <div class="form-group">
                      <input type="checkbox" id="Stars" />
                      <label for="Stars">+4 Stars</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="Stars1" />
                      <label for="Stars1">+3 Stars</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="Stars2" />
                      <label for="Stars2">+2 Stars</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="Stars3" />
                      <label for="Stars3">+1 Stars</label>
                    </div>
                  </form>
                </div>
              </div>
              <div class="number-reviews">
                <a href="#"> Number of reviews</a>
                <div class="new">
                  <form>
                    <div class="form-group">
                      <input type="checkbox" id="review1" />
                      <label for="review1">10+</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="review2" />
                      <label for="review2">20+</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="review3" />
                      <label for="review3">50+</label>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" id="review4" />
                      <label for="review4">100+</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <div id="main" class="feature-talent mt-0 mb-0">
                <div class="container">
                  <div class="head_flex">
                    <h2 class="heading1">Results</h2>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!--   <div class="col-md-12 text-center">
                    <div class="feature-talent-card pt-5 pb-5">
                        <img src="images/no-result.png">
                        <h4 class="no-result"> No results found</h4>
                    </div>
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="feature-talent mt-0 mb-0">
                <div class="container">
                  <div class="head_flex">
                    <h2 class="heading1">Other suggestions</h2>
                    <a href="#">See more</a>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="feature-talent-card">
                        <div
                          style="background-image: url(images/ft.png)"
                          class="cardbg"
                        ></div>
                        <h4>Yacine Brahimi</h4>
                        <div class="card-details">
                          <h5>Price <span>8000DA</span></h5>
                          <p>
                            785 <i class="fa fa-heart-o" aria-hidden="true"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="categories">
                <div class="container">
                  <h2 class="heading1">Categories</h2>
                  <div class="">
                    <carousel :items-to-show="5">
                      <slide :key="slide1">
                        <div class="item">
                          <div class="singer">
                            <h3>Singers</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="tiktok">
                            <h3>tiktok</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="sports">
                            <h3>sports</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="television">
                            <h3>Television</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="influencers">
                            <h3>Influencers</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="singer">
                            <h3>Singers</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="tiktok">
                            <h3>tiktok</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="sports">
                            <h3>sports</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="television">
                            <h3>Television</h3>
                          </div>
                        </div>
                      </slide>
                      <slide :key="slide1">
                        <div class="item">
                          <div class="influencers">
                            <h3>Influencers</h3>
                          </div>
                        </div>
                      </slide>
                      <template #addons>
                        <navigation />
                        <pagination />
                      </template>
                    </carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>
<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  name: "AllCategories",
  data() {
    return {
      visible: false,
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  methods: {
    openNav() {
      alert("hello");
    },
  },
};
</script>
<style scoped>
/* harvinder css start  */
.inner-left-bar {
  position: relative;
}

.sidenav {
  /* height: 100%; */
  width: 0;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #0b1d35;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  color: white;
  border-radius: 8px;
  padding-bottom: 101px;
  box-shadow: 0px 0px 10px -3px rgb(0 0 0 / 50%);
}
#sidenav {
  width: 200px;
}
#main {
  margin-left: 260px;
}
button.filter-hide {
  background-color: #1c3a66;
  color: white;
  border: none;
  padding: 5px 25px;
  font-size: 13px;
  border-radius: 3px;
}
.sidenav a {
  text-decoration: none;
  font-size: 18px;
  color: #818181;
  display: block;
  transition: 0.3s;
  color: white;
  font-weight: 600;
  margin-bottom: 18px !important;
}
.sidenav a:hover {
  color: #f1f1f1;
}
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
#main {
  transition: margin-left 0.5s;
  padding: 16px;
}
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
.left-bar {
  color: white;
  height: 1589px;
}
.get-filter {
  border-bottom: 1px solid #4e6789;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 15px;
}
.delivery {
  border-bottom: 1px solid #4e6789;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 15px;
}
.price-filter {
  border-bottom: 1px solid #4e6789;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 15px;
}
.average-review {
  border-bottom: 1px solid #4e6789;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 15px;
}
.zaatar {
  color: white;
  padding-top: 40px;
}
.found {
  font-size: 12px;
}
.left-bar label.form-check-label {
  font-size: 12px;
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: white;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  width: 15px;
  height: 15px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #fff0;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 11px;
  height: 11px;
  background: #3e6fb2;
  position: absolute;
  top: 4px;
  left: 2px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.get-filter p {
  margin-bottom: 10px;
  font-size: 12px;
}
.number-reviews {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 15px;
}
.form-group {
  display: block;
  margin-bottom: 15px;
}
.form-group input {
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
}
.form-group label {
  position: relative;
  cursor: pointer;
  font-size: 12px;
}
.form-group label:before {
  content: "";
  -webkit-appearance: none;
  background-color: transparent;
  border: 1px solid #bbbbbb;
  box-shadow: 0 1px 2px rgb(0 0 0 / 5%),
    inset 0px -15px 10px -12px rgb(0 0 0 / 5%);
  padding: 5px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 2px;
}
.form-group input:checked + label:after {
  content: "";
  display: block;
  position: absolute;
  top: 5px;
  left: 1px;
  width: 10px;
  height: 10px;
  background-color: 3e6fb2;
  background-color: #3e6fb2;
}
.form-group {
  margin-bottom: 10px;
}
button.reset-filter {
  background-color: #8f2323;
  color: white;
  border: none;
  padding: 5px 25px;
  font-size: 13px;
  border-radius: 3px;
}
div#main {
  background-color: #0b1d35;
  border-radius: 8px;
}
h4.no-result {
  color: #fff !important;
  font-size: 22px !important;
  padding: 10px 15px !important;
  color: #6980a1 !important;
}

/* harvinder css end  */

.header {
  background-color: #0b1d35;
}
.nav-link {
  color: white !important;
}
</style>