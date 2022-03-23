<template>
  <div class="background">
    <div class="banner">
      <div class="container-fluid">
        <div class="header">
          <nav class="navbar navbar-expand-md navbar-dark">
            <router-link class="navbar-brand" to="/"
              ><img src="../../assets/img/white2.png" />
            </router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#how">How to earn?</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#simple">How it works?</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#faq">FAQ</a>
                </li>
              </ul>
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <select class="form-control" id="sel1" name="sellist1">
                    <option>English</option>
                    <option>one</option>
                    <option>two</option>
                  </select>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div class="sec1">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-7">
                <div class="ban-text">
                  <h4>Join DZ talents, have a side income.</h4>
                  <p :style="{ color: white }">
                    Here we talk about why you can be intrested in joining
                    DZicase<br />
                    the new way of giving modern shotout with famous football<br />
                    players, singers, actors, influencers and so on.
                  </p>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Join Now
                  </button>
                </div>
              </div>
              <div class="col-md-6">
                <div class="ban-img">
                  <img src="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sec2">
      <div class="container">
        <div class="inner-sec2">
          <div class="row">
            <div class="col-md-4">
              <div class="click">
                <h4>A click away,<br />anywhere.</h4>
                <p>
                  30 seconds is all it takes, so wherever <br />you are, a video
                  to your fans is always an <br />
                  option! Dzicace can be done anytime,<br />
                  anywhere, let your creativity shine!
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="click">
                <h4>
                  Wider <br />
                  Fan base
                </h4>
                <p>
                  Searching for real connection? Be part<br />
                  of your fans' special occasions and share <br />the joy of all
                  moments, Dzicace makes<br />
                  this communication simpler than ever!
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="click">
                <h4>Give back</h4>
                <p>
                  Are you seeking a noble sharing <br />experience? Dzicace
                  allows you to design <br />your support experience with giving
                  back<br />
                  your earnings to any charitable organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="how" id="how">
      <div class="container">
        <div class="inner-how">
          <h4>How much you will earn?</h4>
          <div class="much">
            <div class="inner-much">
              <div class="row">
                <div class="col-md-6">
                  <div class="price">
                    <p>If i’m priced at</p>
                    $<input
                      type="text"
                      class="form-control w-25 d-inline ms-2 me-2"
                      v-model.number="price"
                    />
                    <p>and completed</p>
                    <input
                      type="text"
                      class="form-control w-25 d-inline ms-2"
                      v-model.number="count"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="earn">
                    <p>I will earn</p>
                    <h6>
                      <span class="earn1">{{ earning }} DA</span> in
                      <span class="earn1">{{ duration }} min</span>
                    </h6>
                  </div>
                </div>
              </div>
              <div class="easy">
                <h6>This easy, join now!</h6>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Start Earning
                </button>
              </div>
              <!-- MODAL -->
              <div class="modal fade" id="exampleModal">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        JOIN AS TALENT
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p class="fw-bold" :style="{ colo: white }">
                        Join Dzicace as a talent today! Fill in the form and our
                        team will get back to you within 24 hours.
                      </p>
                      <form @submit.prevent="joinTalent">
                        <div class="mb-3">
                          <label for="name">Name*</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': v$.name.$error }"
                            placeholder="Ali a"
                            v-model="name"
                            id="name"
                          />
                          <span
                            v-if="v$.name.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.name.$errors[0].$message }}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="email">Email*</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': v$.email.$error }"
                            placeholder="example@gmail.com"
                            v-model="email"
                            id="email"
                          />
                          <span
                            v-if="v$.email.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.email.$errors[0].$message }}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="phone">Phone number*</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': v$.phoneNumber.$error }"
                            placeholder="Phone Number"
                            v-model="phoneNumber"
                            id="phone"
                          />
                          <span
                            v-if="v$.phoneNumber.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.phoneNumber.$errors[0].$message }}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlSelect1"
                            >Select Your Country*</label
                          >
                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                            v-model="social"
                          >
                            <option value="" disabled="">
                              Choose an Country
                            </option>
                            <option v-for="country in countries" :key="country">
                              {{ country.name }}
                            </option>
                          </select>

                          <!-- <Multiselect
                            class="form-control"
                            :class="{ 'is-invalid': v$.social.$error }"
                            placeholder="Which social network do you rule?"
                            v-model="social"
                            :options="[
                              'Instagram',
                              'Youtube',
                              'Snapchat',
                              'TikTok',
                              'TV',
                              'Other',
                            ]"
                          />
                          <span
                            v-if="v$.social.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.social.$errors[0].$message }}
                          </span> -->
                        </div>

                        <!-- <div class="mb-3">
                          <label for="social_meida_handel">Your Handel*</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': v$.nickName.$error }"
                            placeholder="@example"
                            v-model="nickName"
                            id="social_meida_handel"
                          />
                          <span
                            v-if="v$.nickName.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.nickName.$errors[0].$message }}
                          </span>
                        </div> -->
                        <div class="mb-3">
                          <label for="social_media_handel">Your handel*</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': v$.socialLink.$error }"
                            placeholder="@example"
                            v-model="socialLink"
                            id="social_media_handel"
                          />
                          <span
                            v-if="v$.socialLink.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.socialLink.$errors[0].$message }}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="followers"
                            >How many followers do you have?</label
                          >
                          <input
                            type="number"
                            class="form-control"
                            :class="{ 'is-invalid': v$.followers.$error }"
                            placeholder="400K"
                            v-model.number="followers"
                            id="followers"
                          />
                          <span
                            v-if="v$.followers.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.followers.$errors[0].$message }}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="description"
                            >Anything else we should know about you?
                          </label>
                          <textarea
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': v$.description.$error }"
                            v-model="description"
                            placeholder="I'm the most funny.."
                            rows="4"
                            id="description"
                          ></textarea>
                          <span
                            v-if="v$.description.$error"
                            class="text-sm text-danger"
                          >
                            {{ v$.description.$errors[0].$message }}
                          </span>
                        </div>
                        <p :style="{ color: white }">
                          Note:you are not automatically enrolled on Cameo.If
                          you meet the eligibility requirements, a talent
                          representatuive will contact you within a few days to
                          finish onboardin.
                        </p>
                        <button
                          type="submit"
                          class="btn bg-gradient-main text-white w-100 text-lg"
                          :style="{ 'background-color': 'green' }"
                        >
                          JOIN
                        </button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn bg-gradient-secondary"
                        data-bs-dismiss="modal"
                        :style="{ 'background-color': 'green' }"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <loading
                v-model:active="isLoading"
                :can-cancel="false"
                :is-full-page="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="simple" id="simple">
      <div class="container">
        <div class="inner-simple">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="steps-text">
                <h4>4 Simple steps to Dzicace</h4>
                <p>Step 1</p>
                <h6>Receive Fans Requests on Dzicace app</h6>
                <p>Step 2</p>
                <h6>In 4 days, you can accept or decline Fans Requests</h6>
                <p>Step 3</p>
                <h6>Share the moment with your fans in 30-seconds video</h6>
                <p>Step 4</p>
                <h6>Set the price and enjoy 75% of the earnings</h6>
              </div>
            </div>
            <div class="col-md-6">
              <div class="steps-img">
                <img src="../../assets/img/screen-man.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <div class="footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="footer-btn">
              <a class="join-btn" href="#">Join now!</a>
              <a
                class="start-btn"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                >Start Earning</a
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="all">
              <a class="all-text" href="#">All right reserved 2022</a>
              <a class="all-img" href="#"
                ><img src="../../assets/img/white2.png"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, numeric } from "@vuelidate/validators";

export default {
  name: "enrole",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      isLoading: false,
      price: 100,
      count: 10,
      duration: 5,
      earning: 750,
      followers: null,
      social: "",
      socialLink: "",
      nickName: "",
      name: "",
      email: "",
      phoneNumber: "",
      description: "",
      selectedCountary: "",
      countries: [
        { name: "Afghanistan", code: "AF" },
        { name: "Åland Islands", code: "AX" },
        { name: "Albania", code: "AL" },
        { name: "Algeria", code: "DZ" },
        { name: "American Samoa", code: "AS" },
        { name: "AndorrA", code: "AD" },
        { name: "Angola", code: "AO" },
        { name: "Anguilla", code: "AI" },
        { name: "Antarctica", code: "AQ" },
        { name: "Antigua and Barbuda", code: "AG" },
        { name: "Argentina", code: "AR" },
        { name: "Armenia", code: "AM" },
        { name: "Aruba", code: "AW" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Azerbaijan", code: "AZ" },
        { name: "Bahamas", code: "BS" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" },
        { name: "Barbados", code: "BB" },
        { name: "Belarus", code: "BY" },
        { name: "Belgium", code: "BE" },
        { name: "Belize", code: "BZ" },
        { name: "Benin", code: "BJ" },
        { name: "Bermuda", code: "BM" },
        { name: "Bhutan", code: "BT" },
        { name: "Bolivia", code: "BO" },
        { name: "Bosnia and Herzegovina", code: "BA" },
        { name: "Botswana", code: "BW" },
        { name: "Bouvet Island", code: "BV" },
        { name: "Brazil", code: "BR" },
        { name: "British Indian Ocean Territory", code: "IO" },
        { name: "Brunei Darussalam", code: "BN" },
        { name: "Bulgaria", code: "BG" },
        { name: "Burkina Faso", code: "BF" },
        { name: "Burundi", code: "BI" },
        { name: "Cambodia", code: "KH" },
        { name: "Cameroon", code: "CM" },
        { name: "Canada", code: "CA" },
        { name: "Cape Verde", code: "CV" },
        { name: "Cayman Islands", code: "KY" },
        { name: "Central African Republic", code: "CF" },
        { name: "Chad", code: "TD" },
        { name: "Chile", code: "CL" },
        { name: "China", code: "CN" },
        { name: "Christmas Island", code: "CX" },
        { name: "Cocos (Keeling) Islands", code: "CC" },
        { name: "Colombia", code: "CO" },
        { name: "Comoros", code: "KM" },
        { name: "Congo", code: "CG" },
        { name: "Congo, The Democratic Republic of the", code: "CD" },
        { name: "Cook Islands", code: "CK" },
        { name: "Costa Rica", code: "CR" },
        { name: "Cote D'Ivoire", code: "CI" },
        { name: "Croatia", code: "HR" },
        { name: "Cuba", code: "CU" },
        { name: "Cyprus", code: "CY" },
        { name: "Czech Republic", code: "CZ" },
        { name: "Denmark", code: "DK" },
        { name: "Djibouti", code: "DJ" },
        { name: "Dominica", code: "DM" },
        { name: "Dominican Republic", code: "DO" },
        { name: "Ecuador", code: "EC" },
        { name: "Egypt", code: "EG" },
        { name: "El Salvador", code: "SV" },
        { name: "Equatorial Guinea", code: "GQ" },
        { name: "Eritrea", code: "ER" },
        { name: "Estonia", code: "EE" },
        { name: "Ethiopia", code: "ET" },
        { name: "Falkland Islands (Malvinas)", code: "FK" },
        { name: "Faroe Islands", code: "FO" },
        { name: "Fiji", code: "FJ" },
        { name: "Finland", code: "FI" },
        { name: "France", code: "FR" },
        { name: "French Guiana", code: "GF" },
        { name: "French Polynesia", code: "PF" },
        { name: "French Southern Territories", code: "TF" },
        { name: "Gabon", code: "GA" },
        { name: "Gambia", code: "GM" },
        { name: "Georgia", code: "GE" },
        { name: "Germany", code: "DE" },
        { name: "Ghana", code: "GH" },
        { name: "Gibraltar", code: "GI" },
        { name: "Greece", code: "GR" },
        { name: "Greenland", code: "GL" },
        { name: "Grenada", code: "GD" },
        { name: "Guadeloupe", code: "GP" },
        { name: "Guam", code: "GU" },
        { name: "Guatemala", code: "GT" },
        { name: "Guernsey", code: "GG" },
        { name: "Guinea", code: "GN" },
        { name: "Guinea-Bissau", code: "GW" },
        { name: "Guyana", code: "GY" },
        { name: "Haiti", code: "HT" },
        { name: "Heard Island and Mcdonald Islands", code: "HM" },
        { name: "Holy See (Vatican City State)", code: "VA" },
        { name: "Honduras", code: "HN" },
        { name: "Hong Kong", code: "HK" },
        { name: "Hungary", code: "HU" },
        { name: "Iceland", code: "IS" },
        { name: "India", code: "IN" },
        { name: "Indonesia", code: "ID" },
        { name: "Iran, Islamic Republic Of", code: "IR" },
        { name: "Iraq", code: "IQ" },
        { name: "Ireland", code: "IE" },
        { name: "Isle of Man", code: "IM" },
        { name: "Israel", code: "IL" },
        { name: "Italy", code: "IT" },
        { name: "Jamaica", code: "JM" },
        { name: "Japan", code: "JP" },
        { name: "Jersey", code: "JE" },
        { name: "Jordan", code: "JO" },
        { name: "Kazakhstan", code: "KZ" },
        { name: "Kenya", code: "KE" },
        { name: "Kiribati", code: "KI" },
        { name: "Korea, Democratic People'S Republic of", code: "KP" },
        { name: "Korea, Republic of", code: "KR" },
        { name: "Kuwait", code: "KW" },
        { name: "Kyrgyzstan", code: "KG" },
        { name: "Lao People'S Democratic Republic", code: "LA" },
        { name: "Latvia", code: "LV" },
        { name: "Lebanon", code: "LB" },
        { name: "Lesotho", code: "LS" },
        { name: "Liberia", code: "LR" },
        { name: "Libyan Arab Jamahiriya", code: "LY" },
        { name: "Liechtenstein", code: "LI" },
        { name: "Lithuania", code: "LT" },
        { name: "Luxembourg", code: "LU" },
        { name: "Macao", code: "MO" },
        { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
        { name: "Madagascar", code: "MG" },
        { name: "Malawi", code: "MW" },
        { name: "Malaysia", code: "MY" },
        { name: "Maldives", code: "MV" },
        { name: "Mali", code: "ML" },
        { name: "Malta", code: "MT" },
        { name: "Marshall Islands", code: "MH" },
        { name: "Martinique", code: "MQ" },
        { name: "Mauritania", code: "MR" },
        { name: "Mauritius", code: "MU" },
        { name: "Mayotte", code: "YT" },
        { name: "Mexico", code: "MX" },
        { name: "Micronesia, Federated States of", code: "FM" },
        { name: "Moldova, Republic of", code: "MD" },
        { name: "Monaco", code: "MC" },
        { name: "Mongolia", code: "MN" },
        { name: "Montserrat", code: "MS" },
        { name: "Morocco", code: "MA" },
        { name: "Mozambique", code: "MZ" },
        { name: "Myanmar", code: "MM" },
        { name: "Namibia", code: "NA" },
        { name: "Nauru", code: "NR" },
        { name: "Nepal", code: "NP" },
        { name: "Netherlands", code: "NL" },
        { name: "Netherlands Antilles", code: "AN" },
        { name: "New Caledonia", code: "NC" },
        { name: "New Zealand", code: "NZ" },
        { name: "Nicaragua", code: "NI" },
        { name: "Niger", code: "NE" },
        { name: "Nigeria", code: "NG" },
        { name: "Niue", code: "NU" },
        { name: "Norfolk Island", code: "NF" },
        { name: "Northern Mariana Islands", code: "MP" },
        { name: "Norway", code: "NO" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Palau", code: "PW" },
        { name: "Palestinian Territory, Occupied", code: "PS" },
        { name: "Panama", code: "PA" },
        { name: "Papua New Guinea", code: "PG" },
        { name: "Paraguay", code: "PY" },
        { name: "Peru", code: "PE" },
        { name: "Philippines", code: "PH" },
        { name: "Pitcairn", code: "PN" },
        { name: "Poland", code: "PL" },
        { name: "Portugal", code: "PT" },
        { name: "Puerto Rico", code: "PR" },
        { name: "Qatar", code: "QA" },
        { name: "Reunion", code: "RE" },
        { name: "Romania", code: "RO" },
        { name: "Russian Federation", code: "RU" },
        { name: "RWANDA", code: "RW" },
        { name: "Saint Helena", code: "SH" },
        { name: "Saint Kitts and Nevis", code: "KN" },
        { name: "Saint Lucia", code: "LC" },
        { name: "Saint Pierre and Miquelon", code: "PM" },
        { name: "Saint Vincent and the Grenadines", code: "VC" },
        { name: "Samoa", code: "WS" },
        { name: "San Marino", code: "SM" },
        { name: "Sao Tome and Principe", code: "ST" },
        { name: "Saudi Arabia", code: "SA" },
        { name: "Senegal", code: "SN" },
        { name: "Serbia and Montenegro", code: "CS" },
        { name: "Seychelles", code: "SC" },
        { name: "Sierra Leone", code: "SL" },
        { name: "Singapore", code: "SG" },
        { name: "Slovakia", code: "SK" },
        { name: "Slovenia", code: "SI" },
        { name: "Solomon Islands", code: "SB" },
        { name: "Somalia", code: "SO" },
        { name: "South Africa", code: "ZA" },
        { name: "South Georgia and the South Sandwich Islands", code: "GS" },
        { name: "Spain", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sudan", code: "SD" },
        { name: "Suriname", code: "SR" },
        { name: "Svalbard and Jan Mayen", code: "SJ" },
        { name: "Swaziland", code: "SZ" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Syrian Arab Republic", code: "SY" },
        { name: "Taiwan, Province of China", code: "TW" },
        { name: "Tajikistan", code: "TJ" },
        { name: "Tanzania, United Republic of", code: "TZ" },
        { name: "Thailand", code: "TH" },
        { name: "Timor-Leste", code: "TL" },
        { name: "Togo", code: "TG" },
        { name: "Tokelau", code: "TK" },
        { name: "Tonga", code: "TO" },
        { name: "Trinidad and Tobago", code: "TT" },
        { name: "Tunisia", code: "TN" },
        { name: "Turkey", code: "TR" },
        { name: "Turkmenistan", code: "TM" },
        { name: "Turks and Caicos Islands", code: "TC" },
        { name: "Tuvalu", code: "TV" },
        { name: "Uganda", code: "UG" },
        { name: "Ukraine", code: "UA" },
        { name: "United Arab Emirates", code: "AE" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States", code: "US" },
        { name: "United States Minor Outlying Islands", code: "UM" },
        { name: "Uruguay", code: "UY" },
        { name: "Uzbekistan", code: "UZ" },
        { name: "Vanuatu", code: "VU" },
        { name: "Venezuela", code: "VE" },
        { name: "Viet Nam", code: "VN" },
        { name: "Virgin Islands, British", code: "VG" },
        { name: "Virgin Islands, U.S.", code: "VI" },
        { name: "Wallis and Futuna", code: "WF" },
        { name: "Western Sahara", code: "EH" },
        { name: "Yemen", code: "YE" },
        { name: "Zambia", code: "ZM" },
        { name: "Zimbabwe", code: "ZW" },
      ],
    };
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage("Please Enter Your Name", required),
      },
      nickName: {
        required: helpers.withMessage("Please Enter Your Nick Name", required),
      },
      email: {
        required: helpers.withMessage("Please Enter Your Email", required),
        email: helpers.withMessage("Please Enter Your Email Correctly", email),
      },
      phoneNumber: {
        required: helpers.withMessage(
          "Please Enter Your Phone Number",
          required
        ),
        numeric: helpers.withMessage(
          "Please Enter Your Phone Number Correctly",
          numeric
        ),
      },
      social: {
        required: helpers.withMessage(
          "Please Enter Your Social Media Network",
          required
        ),
      },
      socialLink: {
        required: helpers.withMessage(
          "Please Enter Your Social Media Link",
          required
        ),
      },
      followers: {
        required: helpers.withMessage(
          "Please Enter number of followers",
          required
        ),
      },
      description: {
        required: helpers.withMessage("Please Enter Your Bio", required),
      },
    };
  },
  methods: {
    async joinTalent() {
      const result = await this.v$.$validate();
      if (!result) return;

      try {
        this.isLoading = true;
        await this.$store.dispatch("talent/talentJoin", {
          name: this.name,
          nickName: this.nickName,
          email: this.email,
          followers: this.followers,
          socialNetwork: this.social,
          socialNetworkLink: this.socialLink,
          phoneNumber: this.phoneNumber,
          description: this.description,
        });
        this.$swal({
          icon: "success",
          text: "Your request submitted successfully! our team will get back to you within 24 hours.",
        });
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.message,
        });
      }
      this.isLoading = false;
    },
  },
  watch: {
    price(newVal) {
      this.earning = (this.count * newVal * 75) / 100;
    },
    count(newVal) {
      this.earning = (this.price * newVal * 75) / 100;
      this.duration = newVal * 0.5;
    },
  },
  created() {
    document.body.style.backgroundColor = "#b7e4c7";
  },
  unmounted() {
    document.body.style.backgroundColor = "#fbfbfb";
  },
};
</script>
<style scoped>
.background {
  background-color: white;
}
.banner {
  background-image: url("../../assets/img/fb_cover.png");
  height: 500px;
  height: 650px;
  background-repeat: no-repeat;
  background-size: cover;
  position: center;
}
body {
  background-color: white;
}
.header {
  padding-top: 20px;
}
.header ul li a {
  color: white !important;
  font-size: 17px;
  padding: 7px 20px !important;
}
ul.navbar-nav {
  margin-left: 128px;
}
.form-control {
  display: block;
  padding: 5px 14px;
  font-size: 13px;
  color: #ffff;
  background-color: #fff;
  border-radius: 20px;
  color: black;
}
.navbar-brand img {
  width: auto;
  height: 36px;
}
.ban-text button {
  background-color: #23b071;
  color: white;
  border: none;
  font-size: 36px;
  font-weight: 800;
  padding: 17px 58px;
  border-radius: 52px;
}
.ban-text {
  margin-left: 58px;
}
.ban-text h4 {
  color: white;
  font-size: 60px;
  font-weight: 700;
}
.ban-text p {
  color: white;
  font-size: 15px;
  padding-bottom: 20px;
}
.sec1 {
  margin-top: 87px;
}
.header ul li a:hover {
  background-color: #0c404a;
  transition: 0.5s;
  border-radius: 50px;
}
.header ul li a:focus {
  color: white;
  background-color: green;
  transition: 0.5s;
}
.inner-sec2 {
  background: white;
  box-shadow: 0px 0px 10px -3px rgb(0 0 0 / 50%);
  padding: 29px 49px;
  border-radius: 13px;
}
.inner-sec2 h4 {
  color: #29885d;
  font-size: 26px;
  font-weight: 700;
}
.inner-sec2 p {
  font-size: 14px;
  color: black;
  font-weight: 500;
}
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
.footer {
  background-color: black;
  height: 150px;
  margin-top: 50px;
}
a.join-btn {
  text-decoration: none !important;
  color: white;
  font-size: 22px;
  font-weight: 700;
}
a.start-btn {
  text-decoration: none !important;
  color: white;
  font-size: 22px;
  background-color: #23b071;
  margin: 0px 20px;
  border-radius: 30px;
  padding: 15px 31px;
  font-weight: 700;
}
.footer-btn {
  padding-top: 63px;
}
a.all-text {
  text-decoration: none !important;
  color: white !important;
  margin: 0px 6px;
}
.all {
  text-align: right;
  padding-top: 47px;
}
.all-img img {
  width: auto;
  height: 30px;
}
.how {
  margin-top: 50px;
}
.inner-how h4 {
  font-size: 39px;
  color: #006633;
  font-weight: 700;
  text-align: center;
}
.inner-how {
  background: white;
  padding-top: 30px;
  box-shadow: 0px 0px 10px -3px rgb(0 0 0 / 50%);
  height: 560px;
  border-radius: 10px;
}
.inner-much {
  padding: 10px 109px;
}
.easy h6 {
  font-size: 33px;
  margin-bottom: 20px;
}
.easy {
  text-align: center;
  margin-top: 48px;
}
.easy button {
  background: #23b071;
  padding: 13px 65px;
  font-size: 38px;
  font-weight: 700;
  border-radius: 46px;
}
span.price1 {
  font-size: 26px;
  font-weight: 700;
  border: 1px solid #24ab6f;
  border-radius: 30px;
  padding: 6px 23px;
  align-items: center;
  display: flex;
  width: 149px;
  margin-left: 7px;
}
span.price2 {
  color: #a9a9a9;
  font-size: 21px;
  padding-left: 11px;
}
.price p {
  padding-top: 22px;
  margin-bottom: 2px;
  padding-left: 32px;
  font-size: 21px;
  font-weight: 500;
}
.earn p {
  padding-top: 37px;
  font-size: 29px;
  font-weight: 500;
  margin-left: 22px;
}
span.earn1 {
  background: #24aa6e1f;
  font-size: 30px;
  padding: 10px 27px;
  color: #24ab6f;
  border-radius: 30px;
}
.earn h6 {
  font-size: 25px;
}
.digit {
  display: flex;
  align-items: center;
}
.digit p {
  padding-top: 0;
  border: 1px solid #24ab6f;
  border-radius: 50%;
  width: 31px;
  height: 31px;
  padding-left: 10px;
}
</style>