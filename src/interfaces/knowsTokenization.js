import pangu from 'pangu'

export default {
  methods: {
    isLatin(string) {
      return /[A-Za-z0-9`~$%^&*\-=+\\|/!;:,.?]/.test(string)
    },
    tokenize(sentence, addSpaceBack = true) {
      var segments = pangu.spacing(sentence.toUpperCase()).split(' ')
      if(addSpaceBack) {
        for(let i = segments.length - 2; i >= 0; i--) {
          if(this.isLatin(segments[i]) && this.isLatin(segments[i + 1])) {
            segments.splice(i + 1, 0, ' ')
          }
        }
      }
      return segments.map(segment => {
        if(this.isLatin(segment) === false) {
          return segment.split('')
        } else {
          return [segment]
        }
      }).reduce((a, b) => {
        return a.concat(b)
      }, [])
    }
  }
}
