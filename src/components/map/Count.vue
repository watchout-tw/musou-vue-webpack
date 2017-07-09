<template>
<div class="atlas-tally-count">
  <div class="score"><span class="value">{{ score }}</span><span class="unit">%</span></div>
  <div class="fraction">{{ this.total }}篇裡有{{ this.rows.length }}篇</div>
  <div class="name">稱台灣為{{ count.name }}</div>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      el: {},
      size: {},
      total: 0,
      rows: []
    }
  },
  props: ['raw', 'count', 'debug'],
  computed: {
    score() {
      return Math.round(this.rows.length / this.total * 100)
    }
  },
  watch: {
    raw(now) {
      this.total = now.length
      this.rows = now.filter(row => this.count.condition(row.what + row.what_in_english))
    }
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

.atlas-tally-count {
  margin: 1rem 0;
  width: 50%;
  @include bp-sm-up {
    width: auto;
  }
  > .score {
    line-height: 1;
    > .value {
      font-size: 4rem;
    }
    > .unit {
      margin-left: 0.125rem;
    }
  }
  > .fraction {
    font-size: 0.85rem;
  }
}
</style>
