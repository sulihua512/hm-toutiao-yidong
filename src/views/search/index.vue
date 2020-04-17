<template>
  <div>
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      v-model.trim="keyword"
      @input="hSearch"
    >
      <div slot="action" @click="hClickSearchInput">搜索</div>
    </van-search>

    <!-- 联想建议 -->
    <van-cell-group v-if="keyword">
      <van-cell
        icon="search"
        v-for="(item,index) in cSearchSuggestions"
        :key="index"
        @click="hClickSuggestion(index)"
      >
        <div slot="title" v-html="item"></div>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else></van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <van-icon name="delelte"></van-icon>
      </van-cell>
      <van-cell v-for="(item,idx) in searchHistories" :key="idx" :title="item">
        <van-icon name="close" @click="hRemoveHistory(idx)" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { getItem, setItem } from '@/utils/storage.js'
export default {
  name: 'Search',
  data () {
    return {
      timer: null, // 定时器
      keyword: '',
      searchSuggestions: [], // 搜索结果集合
      searchHistories: getItem('searchHistories') || []// 搜索历史记录
    }
  },
  computed: {
    cSearchSuggestions () {
      // 高亮   java  -->  <span style="color:red">java</span>
      const reg = new RegExp(this.keyword, 'gi')
      return this.searchSuggestions.map(str => {
        const str1 = str.replace(reg, function (obj) {
          return `<span style="color:red">${obj}</span>`
        })
        // console.log('关键字高亮结果', str1)
        return str1
      })
    }
  },
  watch: {
    // 历史记录持久化，不会随着刷新二而丢失
    searchHistories (newVal, oldVal) {
      // console.log(newVal,newVal)
      setItem('searchHistories', newVal)
    }
  },
  methods: {
    // 删除指定位置的历史记录
    hRemoveHistory (idx) {
      this.searchHistories.splice(idx, 1)
    },
    // 点击搜索建议
    hClickSuggestion (idx) {
      const str = this.searchSuggestions[idx]
      console.log(str)
      const index = this.searchHistories.indexOf(str)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(str)
    },
    addSearchHistory (str) {
      // 将关键字添加到历史记录中
      const index = this.searchHistories.indexOf(this.keyword)
      if (index !== -1) { //  说明有重复的，已经在历史记录中存在了
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.keyword)
    },
    hClickSearchInput () {
      // alert(this.keyword)
      if (this.keyword) {
        this.addSearchHistory(this.keyword)
      }
    },
    // 节流(比防抖效果好一点)
    hSearch () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.keyword) {
            return
          }
          const result = await getSearchSuggestion(this.keyword)
          this.searchSuggestions = result.data.data.options
        }, 0.3 * 1000)
      }
    }
    // 防抖
    // hSearch () {
    //   if (this.timer) {
    //     // 清除当前定时器
    //     clearTimeout(this.timer)
    //   }
    //   this.timer = setTimeout(async () => {
    //     if (!this.keyword) {
    //       return
    //     }
    //     const result = await getSearchSuggestion(this.keyword)
    //     // console.log('搜索结果', result)
    //     this.searchSuggestions = result.data.data.options
    //   }, 0.3 * 1000)
    // }
  }
}
</script>

<style lang="" scoped>
</style>
