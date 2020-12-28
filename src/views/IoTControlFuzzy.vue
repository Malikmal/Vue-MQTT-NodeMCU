<template>
 <div> 
    <index-navbar />
    
    <section class="mt-48 md:mt-0 pb-20 relative bg-gray-200">
      <div class="container mx-auto overflow-hidden pb-20">
        <div class="flex flex-wrap items-center pt-32">
          
          <div class="w-full lg:w-6/12 px-2 mr-auto ml-auto mt-5">
            <card-line-chart />
          </div>
          
          <div class="w-full lg:w-6/12 px-2 mr-auto ml-auto mt-5">
            <card-line-chart />
          </div>

          
            <!-- <router-link to="/" class="font-bold text-gray-800 mt-8">
              Default Page !
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
        this.isLoading = 1;
      }
  },
  mqtt : {
      '+/led'(data){
        // topic = topic.split('/').pop() ;
        // this.led[parseInt(topic)] = this.led[parseInt(topic)] ? 0 : 1; 
        this.isLoading = 0;
        this.ledtest = parseInt(data) ? 1 : 0;
      }
  }
}
</script>