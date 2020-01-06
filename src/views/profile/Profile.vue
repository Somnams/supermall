<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的商城</div></nav-bar>
    <UserInfo/>

    <section>
      <div class="account">
        <div class="account-item">
          <span class="balance">0.0</span>元
          <div class="account-info">我的余额</div>
        </div>
        <div class="account-item">
          <span class="balance">0</span>个
          <div class="account-info">我的优惠</div>
        </div>
        <div class="account-item">
          <span class="balance">0.0</span>分
          <div class="account-info">我的积分</div>
        </div>
      </div>
    </section>

    <list-view :list-data="orderList" class="order-list"/>
    <list-view :list-data="serviceList" class="service-list"/>
  </div>
</template>

<script>
    import NavBar from "@/components/common/navbar/NavBar";
    import UserInfo from "@/views/profile/childComps/UserInfo";
    import ListView from "@/views/profile/childComps/ListView";
    export default {
        name: "Profile",
        components: {
          NavBar,
          UserInfo,
          ListView
        },
        data() {
          return {
            orderList: [
              {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
              {icon: '#point', iconColor: '#fc7b53', info: '积分消息'},
              {icon: '#vip', iconColor: '#ffc636', info: '会员卡'}
            ],
            serviceList: [
              {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
              {icon: '#download', iconColor: '#ff8198', info: '下载APP'}
            ]
          }
        }
    }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .account {
    display: flex;
  }
  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }
  .account-item:last-of-type {
    margin-right: 0;
  }
  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }
  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
  .account-info {
    margin-top: 6px;
  }
  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
