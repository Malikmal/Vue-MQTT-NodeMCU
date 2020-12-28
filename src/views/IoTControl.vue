<template>
 <div> 
    <index-navbar />
    
    <section class="mt-48 md:mt-0 pb-20 relative bg-gray-200">
      <div class="container mx-auto overflow-hidden pb-20">
        <div class="flex flex-wrap items-center pt-32">
          
          <div class="w-full lg:w-8/12 px-2 mr-auto ml-auto mt-5">
            <card-line-chart />
          </div>
          <div class="w-full lg:w-4/12 h-full lg:h-10/10 px-2 mr-auto ml-auto mt-5">
            <div class="justify-center flex flex-wrap relative">
              <div class="my-4 w-full lg:w-12/12 px-0">
                <a
                  href="#"
                  @click="publishLed($event)"
                >
                  <div class="shadow-lg rounded-lg text-center p-8" v-bind:class="ledtest ? 'bg-blue-500' : 'bg-black'">
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-0 bg-white"
                      src="https://png.pngtree.com/png-vector/20190815/ourlarge/pngtree-light-bulb-icon-vector--light-bulb-ideas-symbol-illustration-png-image_1692654.jpg"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      LED  {{ isLoading ? 'Loading...' :  (ledtest ?  'ON' : 'OFF') }}
                    </p>
                  </div>
                </a>

              </div>
            </div>
          </div>
            <!-- <router-link to="/fuzzy" class="font-bold text-gray-800 mt-8">
              Fuzzy Logic Control Page !
            </router-link> -->
        </div>
      </div>
    </section>
    <footer-component />
 </div>
</template>

<script>
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import CardLineChart from "@/components/Cards/CardLineChart.vue";

export default {
  components: {
    IndexNavbar,
    FooterComponent,
    CardLineChart,
  },
  data () {
    return {
      ledtest : 0,
      isLoading : 0,
    }
  },
  methods : {
      publishLed: function (event) {
        event.preventDefault();
        var topic = 'tekkoma/led';
        this.$mqtt.publish(topic, (this.ledtest) ? '0':'1');
        // console.log("Asd");
        this.isLoading = 1;
      }
  },
  mqtt : {
      '+/led'(data){
        console.log(data);
        // topic = topic.split('/').pop() ;
        // this.led[parseInt(topic)] = this.led[parseInt(topic)] ? 0 : 1; 
        this.isLoading = 0;
        this.ledtest = parseInt(data) ? 1 : 0;
      }
  }
}
</script>