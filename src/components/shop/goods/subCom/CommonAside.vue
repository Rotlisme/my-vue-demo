<template>
    <div class="left-220">
        <ul class="side-img-list">
            <li v-for="(item,index) in list" :key="item.id">
                <div class="img-box">
                    <label>{{index+1}}</label>
                    <img :src="item.img_url">
                </div>
                <div class="txt-box">
                    <router-link :to="{name:'detail',param:{id:item.id}}">{{item.title}}</router-link>
                    <span>{{item.add_time|date}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["list"],
  filters: {
    date(time) {
      let date = new Date(time);
      return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
    }
  }
};
</script>

<style scoped>

</style>