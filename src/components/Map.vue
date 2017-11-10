<template>
<article class="map">
  <header>
    <div class="text textgroup">
      <hgroup>
        <h2>啊不是很有國際觀</h2>
        <h1>{{ header.title }}</h1>
      </hgroup>
      <div class="authorship">
        <div class="item d-flex flex-row" v-for="item in authorship"><div class="job">{{ item.job }}</div><div v-for="person in item.people" class="person">{{ person }}</div></div>
        <div class="item d-flex flex-row"><div class="job">貢獻者</div><div class="person">{{ contributors }}</div></div>
      </div>
      <div class="date">{{ date }}</div>
    </div>
  </header>
  <section class="question">
    <div class="introduction textgroup" v-html="markdown(question.introduction)"></div>
    <div class="content">
      <blockquote>Taiwan will be the first <em class="blank" v-html="interactionSelectedOption"></em> in Asia to legalize same-sex marriage.</blockquote>
      <p><span>翻譯：台灣會是亞洲第一個同性婚姻合法化的</span><em class="blank" v-html="interactionSelectedOption"></em></p>
      <div class="interaction" :class="interaction.type">
        <ul class="list-unstyled d-flex flex-wrap">
          <li v-for="(option, index) in interaction.options" :id="'interaction-option-' + option.name" :key="option.name" @click="interactionSelectOption($event, index)" class="d-flex flex-row" :class="{selected: interaction.selection == index}"><div class="index">{{ circledDigits[index + 1] }}</div><div class="value">{{ option.name }}</div></li>
        </ul>
        <button class="musou" @click="interactionSubmit">{{ question.go }}</button>
      </div>
    </div>
    <div class="explanation textgroup" :class="interaction.done ? 'visible' : 'hidden'" v-html="markdown(question.conclusion)"></div>
  </section>
  <section class="answers">
    <div class="reminder" :class="interaction.done ? 'd-none' : 'd-block'">{{ reminder.description }}</div>
    <div class="answer graph" :class="interaction.done ? 'visible' : 'hidden'">
      <div class="textgroup">
        <div class="title"><h2>{{ graphs.tally.title }}</h2></div>
        <div class="description" v-html="markdown(graphs.tally.description)"></div>
      </div>
      <div class="atlas atlas-tally d-flex flex-wrap justify-content-around">
        <count v-for="(count, id) of tally" :raw="raw" :count="count" :debug="debug" :key="id"></count>
      </div>
    </div>
    <div class="answer graph" :class="interaction.done ? 'visible' : 'hidden'">
      <div class="textgroup">
        <div class="title"><h2>{{ graphs.regions.title }}</h2></div>
        <div class="description" v-html="markdown(graphs.regions.description)"></div>
      </div>
      <div class="atlas atlas-regions d-flex flex-wrap">
        <region v-for="(region, id) of regions" :raw="raw" :region="region" :debug="debug" :key="id"></region>
      </div>
    </div>
    <div class="answer graph" :class="interaction.done ? 'visible' : 'hidden'">
      <div class="textgroup">
        <div class="title"><h2>{{ graphs.world.title }}</h2></div>
        <div class="description" v-html="markdown(graphs.world.description)"></div>
      </div>
      <world :raw="raw" :debug="debug"></world>
    </div>
    <div class="answer conclusion" :class="interaction.done ? 'visible' : 'hidden'">
      <div class="textgroup">
        <div class="title"><h2>{{ conclusion.title }}</h2></div>
        <div class="description a-text-only" v-html="markdown(conclusion.description)"></div>
      </div>
    </div>
  </section>
  <section class="call">
    <div class="textgroup">
      <div class="title"><h2>{{ call_for_action.title }}</h2></div>
      <div class="description a-text-only" v-html="markdown(call_for_action.description)"></div>
    </div>
  </section>
</article>
</template>

<script>
import $ from 'jquery'
import marked from 'marked'
import Count from '@/components/map/Count'
import Region from '@/components/map/Region'
import World from '@/components/map/World'

export default {
  metaInfo() {
    return {
      title: `→沃草←${this.config.title}→國會無雙←`,
      meta: [
        {
          vmid: 'og-image',
          property: 'og:image',
          content: require('_/map.jpg')
        }
      ]
    }
  },
  props: ['channel', 'config'],
  data() {
    return require('@/config/map/' + this.config.id).default
  },
  computed: {
    classes() {
      return [this.interaction.done ? 'interaction-done' : 'interaction-ongoing']
    },
    interactionSelectedOption() {
      return this.interaction.selection > -1 ? this.interaction.options[this.interaction.selection].name : '　　'
    },
    contributors() {
      return [...new Set(this.raw.map(row => row.contributor))] // unique(this.raw.map(row => row.contributor))
    }
  },
  mounted() {
    // load data after mounted to trigger update
    this.raw = require('@/data/map/' + this.dataSource)

    // jQuery hack to update text inside markdown
    $('[val=data-tally-total]').html(this.raw.length)
    $('[val=data-tally-country]').html(this.raw.filter(row =>
      this.$data.tally.country.condition(row.what + row.what_in_english)
    ).length)
    $('[val=data-title]').html(this.header.title)
  },
  methods: {
    interactionSelectOption(event, selectionIndex) {
      if(!this.interaction.done) {
        this.interaction.selection = selectionIndex
      }
    },
    interactionSubmit(event) {
      if(!this.interaction.done && this.interaction.selection > -1) {
        this.interaction.done = true
      }
    },
    markdown(str) {
      return marked(str)
    }
  },
  components: {
    Count,
    Region,
    World
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

.map {
  > section {
    box-sizing: content-box;
    width: auto;
    max-width: 60rem;
    margin: 0 auto;
    padding: 0 1rem;
  }
  > .question {
    > .content {
      margin-bottom: 2rem;
      > blockquote, > p {
        margin: 0 0 1rem;
      }
      > blockquote {
        @include font-serif;
        font-size: 2rem;
        font-weight: normal;
        @include bp-md-up {
          font-size: 3rem;
        }
      }

      .blank {
        border-bottom: 2px black solid;
        @include bp-md-up {
          border-bottom-width: 4px;
        }
      }
    }
    > .explanation {
      padding: 1rem;
      background: rgba(black, 0.12);
    }
  }
  > .answers {
    > .reminder {
      box-sizing: content-box;
      @include sticky;
      top: 50%;
      width: 12rem;
      margin: 0 auto;
      padding: 0.5rem 1rem;
      border: 4px solid black;
      border-radius: 2px;
      background: white;
      z-index: $z-below-nav;
    }
    > .answer {
      width: auto;
      margin-top: 4rem;
      margin-bottom: 4rem;
    }
  }
}


.interaction {
  margin: 1rem 0;
  font-size: 1.75rem;

  &.multiple-choice {
    > ul {
      margin-bottom: 1rem;

      > li {
        margin: 0.25rem 1rem 0.25rem 0;
        padding: 0;
        cursor: pointer;

        > .index {
          display: block;
          font-family: $font-sans-serif;
          line-height: 1.25;
          margin-right: 0.25rem;
        }
        > .value {
          display: block;
          line-height: 1;
        }
        &:hover, &.selected {
          color: $color-musou;
        }
      }
    }
  }
  > button {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    background: rgba($color-musou, 0.65);
    cursor: pointer;
    &:hover, &:active {
      background: rgba($color-musou, 0.85);
      @include shadow;
    }
  }
}
.hidden {
  visibility: hidden;
}

.atlas {
  max-width: 60rem;
  margin: 0 auto;
  > .draw {
    width: 100%;
    > svg {
      width: 100%;
    }
  }
}
.atlas-regions-region, .atlas-world {
  .draw {
    $transitionDuration: 0.25s;
    circle.center {
      fill: none;
      stroke: none;
    }
    g.quote {
      rect {
        fill: $color-musou;
        stroke: none;
        opacity: 0.25;
        transition: opacity $transitionDuration;
      }
      text {
        fill: black;
        opacity: 0.75;
        transition: opacity $transitionDuration;
        &.media {
          font-size: 0.65rem;
          font-weight: bold;
        }
        &.and {
          opacity: 0.5;
          font-size: 0.75rem;
          font-weight: bold;
        }
      }
    }
    g.quote:hover {
      rect {
        opacity: 0.85;
      }
      text {
        opacity: 1;
        &.and {
          opacity: 0.5;
        }
      }
    }
    g.quote.yes {
      rect {
        fill: $color-watchout;
      }
    }
  }

  .draw.debug {
    circle.center {
      fill: $color-musou;
      stroke: none;
    }
    g.quote {
      rect {
        fill: none;
        stroke: $color-musou;
      }
      text {
        opacity: 0.25;
      }
    }
  }
}

span.country,
span.place {
  display: inline-block;
  margin: 1px;
  padding: 1px;
}
span.country {
  background: rgba($color-watchout, 0.25);
}
span.place {
  background: rgba($color-musou, 0.25);
}
</style>
