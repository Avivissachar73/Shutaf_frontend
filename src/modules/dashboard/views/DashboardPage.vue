
<template>
  <section class="dashboard-page flex column align-center space-around">
      <div class="flex align-center space-between wrap gap10 width-all">
        <h2>{{$t('dashboard.dashboard')}}</h2>
        <!-- <div class="flex align-center space-between wrap gap5">
          <FormInput type="date" labelholder="from" v-model="filter.from"/>
          <FormInput type="date" labelholder="to" v-model="filter.to"/>
          <FormInput type="select" labelholder="timeGroup" v-model="filter.timeGroup" :itemsMap="{day:'day', week:'week', month:'month'}"/>
        </div> -->
      </div>
      <!-- <pre>{{dashboardData}}</pre> -->
      <div class="charts-container flex flex-1 wrap align-center space-around gap10">
        <div class="chart totalEat-container"/>
        <div class="chart timeEat-container"/>
        <div class="chart healthAvg-container"/>

        <!-- <div class="chart bar2-container"/>
        <div class="chart frame-container"/>
        <div class="chart line-container"/>
        <div class="chart bar3-container"/>
        <div class="chart donat-container"/>
        <div class="chart bar-container"/>
        <div class="chart disc-container"/>
        <div class="chart pi-container"/> -->
        <!-- <div class="chart hitmap-container"></div> -->
      </div>
  </section>
</template>

<script>
import { LineChart, BarChart, PiChart, DonatChart, DiscChart, FrameDiscChart, Heatmap } from '@/modules/common/services/AvivChart.js';
import { setDeepVal, deepIterateWithObj } from '@/modules/common/services/util.service';
import FormInput from '../../common/cmps/FormInput.vue';

export default {
  components: { FormInput },
    name: 'DashboardPage',
    data() {
      return {
        charts: [],
        filter: { 
          from: Date.now() - (1000*60*60*24*7),
          to: Date.now(),
          timeGroup: 'day'
        }
      }
    },
    // created() {
    //   this.init();
    // },
    mounted() {
      this.init();
      // this.mountCharts();
    },
    destroyed() {
      this.charts.forEach(c => c.destroy());
      this.charts = [];
    },
    computed: {
      dashboardData() {
        return this.$store.getters['dashboard/data'];
      }
    },
    methods: {
      mountCharts() {
        const range = (count) => '0'.repeat(count).split('').map((_, i) => i);
        const sumHealthRate = (healthMap = {}, min, max) => {
          let res = 0;
          for (let key = min; key <= max; key++) res += healthMap[key] || 0;
          return res;
        }
        const color = JSON.parse(localStorage.isDarkMode) ? 'white' : 'black';
        const timeLabels = Object.keys(this.dashboardData.stats.timeline.eat).sort();
        this.charts = [
          new BarChart({ 
            data: Object.keys(this.dashboardData.stats.users.eatData).map(key => ({ tag: key, vals: [this.dashboardData.stats.users.eatData[key].healthAvg]})),
            labels: [''],
            legend: {
              tag: this.$t('dashboard.healthAvgPerUser'),
              // align: 'end'
            },
            style: { fillStyle: color }
          }, '.healthAvg-container'),

          new LineChart({
            data: [
              { tag: 'healthy',   vals: timeLabels.map(key => sumHealthRate(this.dashboardData.stats.timeline.eat[key].healthMap, 8, 10)), style: { color: 'green'  } },
              { tag: 'mid',       vals: timeLabels.map(key => sumHealthRate(this.dashboardData.stats.timeline.eat[key].healthMap, 4, 7)) , style: { color: 'orange' } },
              { tag: 'notHealty', vals: timeLabels.map(key => sumHealthRate(this.dashboardData.stats.timeline.eat[key].healthMap, 0, 3)) , style: { color: 'red'    } }
            ],
            labels: timeLabels.map(c => new Date(+c).getDate()),
            // labels: timeLabels.map(c => ''),
            legend: {
              tag: this.$t('dashboard.eatCountInTime'),
              // align: 'end'
            },
            style: { fillStyle: color }
          }, '.timeEat-container'),

          new PiChart({ 
            data: Object.keys(this.dashboardData.stats.users.eatData).map(key => ({ tag: `${key} - ${this.dashboardData.stats.users.eatData[key].total}`, val: this.dashboardData.stats.users.eatData[key].total})),
            legend: {
              tag: this.$t('dashboard.totalEat'),
              // align: 'end'
            },
            style: { fillStyle: color }
          }, '.totalEat-container')
        ];
      },
      getData() {
        return this.$store.dispatch({ type: 'dashboard/loadOrganizationStatsData', organizationId: this.$route.params.organizationId, filter: this.filter });
      },
      async init() {
        this.initFilter();
        this.initData();
      },

      async initData() {
        await this.getData();
        this.mountCharts();
      },


      initFilter() {
        const filterByToSet = JSON.parse(JSON.stringify(this.filter));
        const queryParams = this.$route.query;
        deepIterateWithObj(filterByToSet, (key, val) => {
          let valToSet = +queryParams[key];
          if (isNaN(valToSet)) valToSet = queryParams[key]
          if (queryParams[key]) setDeepVal(filterByToSet, key, valToSet, '_');
        }, '_');
        this.filter = filterByToSet;
      }
    },
    watch: {
      filter: {
        deep: true,
        handler(filterVal) {
          const query = {};
          deepIterateWithObj(filterVal, (key, val) => {
            if (this.$route.query[key] != val) query[key] = val;
          }, '_');
          if (Object.keys(query).length) this.$router.push({ query: { ...this.$route.query, ...query} });
          
          this.initData();
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  h2 {
    margin: 30px 0;
  }
  .charts-container {
    // gap: 10px;
    direction: ltr;
    overflow-y: auto;
    .chart {
      width: 300px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    margin-bottom: 30px;
  }
}
</style>