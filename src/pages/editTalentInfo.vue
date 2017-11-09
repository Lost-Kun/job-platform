<template>
  <div class="editTalentInfo">
    <div class="editTalentInfo_item">
      <div class="editTalentInfo_item_title">
        <div class="editTalentInfo_item_title_text">个人信息
          <div class="editTalentInfo_item_title_text_tooltips">（私密信息，不公开展示）</div>
        </div>
      </div>
      <div class="editTalentInfo_item_content">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.editTalentInfo{
	position: relative;
	min-width: 1100px;
	margin: 0 auto;
	width: 80%;
}

.editTalentInfo_item{
  margin: 20px auto;
}

.editTalentInfo_item_title{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editTalentInfo_item_title_text{
  position: relative;
  height: 30px;
  line-height: 30px;
  font-size: 19px;
  font-weight: bold;
  color: #64A1D7;
}

.editTalentInfo_item_title_text_tooltips{
    position: absolute;
    top: 0;
    left: calc(100% + 10px);
    white-space: nowrap;
    font-size: 15px;
    color: red;
}
</style>


