<template>
  <div>
    <the-navbar></the-navbar>
    <div class="faq" id="faq">
      <div class="container">
        <div class="inner-faq">
          <h4>FAQ</h4>
          <div class="what">
            <div id="accordion" class="accordion">
              <div class="what">
                <div
                  class="card-header collapsed"
                  data-toggle="collapse"
                  href="#collapseone"
                >
                  <a class="card-title">What’s dzicace? </a>
                </div>
                <div
                  id="collapseone"
                  class="card-body collapse"
                  data-parent="#accordion"
                >
                  <p>
                    Dzicace is the leading marketplace connecting fans directly
                    with tens of thousands of celebrities & personalities in the
                    form of customized short videos dedicated to you or one of
                    your close one’s for a special occasion or just for fun !.
                    Dzicace’s mission is to enable the most personalized and
                    authentic fan connections on earth.
                  </p>
                </div>
              </div>
              <div class="what">
                <div
                  class="card-header collapsed"
                  data-toggle="collapse"
                  href="#collapsetwo"
                >
                  <a class="card-title">Who’s a talent at Dzicace? </a>
                </div>
                <div
                  id="collapsetwo"
                  class="card-body collapse"
                  data-parent="#accordion"
                >
                  <p>
                    Dzicace is the leading marketplace connecting fans directly
                    with tens of thousands of celebrities & personalities in the
                    form of customized short videos dedicated to you or one of
                    your close one’s for a special occasion or just for fun !.
                    Dzicace’s mission is to enable the most personalized and
                    authentic fan connections on earth.
                  </p>
                </div>
              </div>
              <div class="what">
                <div
                  class="card-header collapsed"
                  data-toggle="collapse"
                  href="#collapsethree"
                >
                  <a class="card-title">When & how do i get paid?</a>
                </div>
                <div
                  id="collapsethree"
                  class="card-body collapse"
                  data-parent="#accordion"
                >
                  <p>
                    Dzicace is the leading marketplace connecting fans directly
                    with tens of thousands of celebrities & personalities in the
                    form of customized short videos dedicated to you or one of
                    your close one’s for a special occasion or just for fun !.
                    Dzicace’s mission is to enable the most personalized and
                    authentic fan connections on earth.
                  </p>
                </div>
              </div>
              <div class="what">
                <div
                  class="card-header collapsed"
                  data-toggle="collapse"
                  href="#collapsefour"
                >
                  <a class="card-title"
                    >How much time do i have to deliver a video?
                  </a>
                </div>
                <div
                  id="collapsefour"
                  class="card-body collapse"
                  data-parent="#accordion"
                >
                  <p>
                    Dzicace is the leading marketplace connecting fans directly
                    with tens of thousands of celebrities & personalities in the
                    form of customized short videos dedicated to you or one of
                    your close one’s for a special occasion or just for fun !.
                    Dzicace’s mission is to enable the most personalized and
                    authentic fan connections on earth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="faq-btn">
            <button type="button">Check more</button>
          </div>
        </div>
      </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
export default {
  name: "TheFAQ",
};
</script>


<style>
.sec2 {
  transform: translate(0px, -26px);
}
.simple {
  margin-top: 75px;
}
.steps-text h4 {
  color: #006633;
  font-size: 41px;
  font-weight: 700;
}
.steps-text p {
  color: #c5c5c5;
  margin-bottom: 0;
  font-size: 17px;
}
.steps-text h6 {
  color: #353535;
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 13px;
}
.steps-img {
  text-align: right;
}
.steps-img img {
  width: auto;
  height: 500px;
}
.inner-faq h4 {
  color: #006633;
  font-size: 47px;
  font-weight: 700;
  margin-bottom: 22px;
}
.what {
  margin-bottom: 8px;
  box-shadow: 0px 0px 10px -3px rgb(0 0 0 / 50%);
}
.what h6 {
  font-size: 17px;
}
.what p {
  font-size: 14px;
  padding-bottom: 18px;
}
.faq {
  margin-top: 71px;
}
.faq-btn {
  text-align: right;
  margin-top: 20px;
}
button {
  border: none;
  background: black;
  color: white;
  font-size: 14px;
  padding: 4px 19px;
  border-radius: 30px;
}
.accordion .card-header:after {
  content: "\f068";
  float: right;
  font-family: "FontAwesome";
}
.accordion .card-header.collapsed:after {
  /* symbol for "collapsed" panels */
  content: "\f067";
}
.card-header {
  padding: 0.75rem 1.25rem;
  background-color: white;
  border-bottom: none;
}
a.card-title {
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 17px;
}
.card-body {
  padding: 0px 20px;
}
</style>