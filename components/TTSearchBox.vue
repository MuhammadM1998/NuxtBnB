<template>
  <div id="ttSearchBoxContainer" @resultSelected="emitEvent"></div>
</template>

<script>
export default {
  emits: ["resultSelected"],

  methods: {
    emitEvent(event) {
      this.$emit("resultSelected", event);
    },
  },

  mounted() {
    // this.$ttSearchBox.create("ttSearchBoxContainer");
  },
};
</script>

<style scoped>
.dropdown {
  position: absolute;
  z-index: 99999;
  list-style-type: none;
  width: 360px;
  border: rgb(15, 22, 33);
  list-style: none;
  top: 135px;
}
input {
  z-index: 9999;
  font-size: 18px;
  font-family: "Allerta", Helvetica, Arial, sans-serif;
  color: #495057;
  position: absolute;
  top: 100px;
  left: 20px;
  width: 350px;
  height: 35px;
  padding: 5px;
  margin-left: 17px;
  margin-top: 7px;
  border: none;
}
ul {
  list-style: none;
  background-color: white;
  padding: 0px;
  margin-left: 29px;
  width: 360px;
}
li {
  list-style-type: none;
  height: 12px;
  padding: 12px;
  box-shadow: rgb(158, 202, 237) 0px 0px 4px;
  display: list-item;
  text-align: -webkit-match-parent;
  font-family: "Allerta", Helvetica, Arial, sans-serif;
  color: #495057;
}
li:hover {
  background-color: yellowgreen;
}
#list {
  cursor: pointer;
}
.fa-search-custom {
  position: absolute;
  left: 375px;
  top: 123px;
  z-index: 99999;
}
</style>
